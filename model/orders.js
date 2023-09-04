const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    email: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
    }
});

module.exports = new mongoose.model('orders', ordersSchema);
