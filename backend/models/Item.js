const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateReceived: { type: Date, required: true },
    component: { type: String, enum: ['c1', 'c2', 'c3', 'c4', 'c5'], required: true },
    qrCode: { type: String, required: true }
});

module.exports = mongoose.model('Item', ItemSchema);
