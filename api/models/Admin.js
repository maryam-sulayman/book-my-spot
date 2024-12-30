const mongoose = require('mongoose');
const {Schema} = mongoose

const AdminLogSchema = new Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, refPath: 'targetModel' }, // Referenced target
    targetModel: { type: String, required: true }, // e.g., 'User', 'Spot', 'Booking'
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdminLog', AdminLogSchema);
