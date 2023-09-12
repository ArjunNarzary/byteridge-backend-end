const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["Login", "Logout"],
        required: true 
    },
    ip: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Session', schema);