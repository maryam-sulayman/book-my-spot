const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
        address: { type: String, required: true },
        coordinates: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    image: { type: String }, 
});

const Spot = mongoose.model('Spot', SpotSchema);
module.exports = Spot;
