const express = require('express');
const db = require('../database');
const Stripe = require('stripe');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new payment
router.post('/process', (req, res) => {
  const { bookingId, amount, paymentMethod, transactionId, status } = req.body;

  const query = `
    INSERT INTO Payments (booking_id, amount, payment_method, transaction_id, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [bookingId, amount, paymentMethod, transactionId, status];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error processing payment:', err);
      return res.status(500).json({ message: 'Failed to process payment', error: err });
    }
    res.status(201).json({ message: 'Payment processed successfully', paymentId: result.insertId });
  });
});
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  console.log("Received request to create payment intent:", { amount, currency });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("Payment Intent created successfully:", paymentIntent);

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ message: 'Failed to create payment intent', error: error.message });
  }
});


// Get payment details by booking ID
router.get('/:bookingId', (req, res) => {
  const query = `
    SELECT * FROM Payments WHERE booking_id = ?
  `;

  db.query(query, [req.params.bookingId], (err, result) => {
    if (err) {
      console.error('Error fetching payment details:', err);
      return res.status(500).json({ message: 'Failed to retrieve payment details', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No payment found for this booking ID' });
    }

    res.status(200).json(result[0]);
  });
});

// Get all payments (optional, admin feature)
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM Payments
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(500).json({ message: 'Failed to retrieve payments', error: err });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
