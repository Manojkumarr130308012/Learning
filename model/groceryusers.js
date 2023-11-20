const mongoose = require('mongoose');

const groceryusersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    }
});

module.exports = new mongoose.model('groceryuser', groceryusersSchema);
