const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    aadhercard: {
        type: String,
        required: false,
    },
    usertype: {
        type: String,
        required: false,
    }
});

module.exports = new mongoose.model('customer', customerSchema);
