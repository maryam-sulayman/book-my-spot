const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Spot = require('./models/Spot');
const cookieParser = require('cookie-parser')
const { requireRole } = require('./middleware/requireRole'); 
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'qwetyuciwdknjqbhdcjnksdwopeW'
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'openstreetmap', 
});

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Directory for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', 
}));
app.use('/uploads', express.static('uploads'));
app.use(express.json()); 
app.use(cookieParser())
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/sign-up', async (req, res) => {
   const { name, email, password, role } = req.body;
   try{
    const userDetails = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
        role: role || 'driver',
    })
    res.json(userDetails)
   }
   catch (e) {
    res.status(422).json(e)
   }
});
mongoose.set('debug', true);


app.post('/sign-in', async (req, res)=> {
    const {email, password} = req.body
    const userDetails = await User.findOne({email})
    if (userDetails) {
       const passOk = bcrypt.compareSync(password, userDetails.password)
       if(passOk){
        jwt.sign({
            email: userDetails.email,
            id: userDetails._id,
            name: userDetails.name,
            role: userDetails.role,
        },
            jwtSecret,
            {},
            (error, token) => {
                if (error) {
                    throw error
                }
                else {
                res.cookie('token', token).json(userDetails)
                }
        })
     
       } else {
        res.status(422).json('password does not match')
       }
    }
    else {
        res.json('not found')
    }
})

app.get('/profile', (req, res)=> {
    const {token} = req.cookies;
    if (!token) {
        return res.json(null);
    }
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user)=> {
            if(err) 
             throw err;
        const {name, email, _id} = await User.findById(user.id)
        res.json({name, email, _id})
        })
    } else {
        res.status(401).json(null);
    }
})

app.post('/sign-out', (req, res) => {
    res.clearCookie('token', { path: '/' }).json(true);
});

app.post('/spots', requireRole('parking space owner'), upload.single('image'), async (req, res) => {
    const { address, pricePerHour, isAvailable } = req.body;

    if (!address || !pricePerHour) {
        return res.status(400).json({ message: 'Address and price are required.' });
    }

    try {
        const geoData = await geocoder.geocode(address);
        if (!geoData.length) {
            return res.status(400).json({ message: 'Invalid address or postcode.' });
        }

        const { latitude, longitude } = geoData[0];
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const spot = new Spot({
            owner: req.user.id,
            location: {
                address,
                coordinates: { lat: latitude, lng: longitude },
            },
            pricePerHour,
            isAvailable: isAvailable !== undefined ? isAvailable : true,
            image: imageUrl, // Save image URL
        });

        const savedSpot = await spot.save();
        res.status(201).json(savedSpot);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create spot.' });
    }
});


app.get('/spots', async (req, res) => {
    try {
      const spots = await Spot.find({});
      res.status(200).json(spots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch spots.' });
    }
  });
  
  app.get('/parking-spots', async (req, res) => {
    const { lat, lng } = req.query;

    const spots = await Spot.find({
        location: {
            $near: {
                $geometry: { type: 'Point', coordinates: [lng, lat] },
                $maxDistance: 5000, 
            },
        },
    });

    res.json(spots);
});


app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});

