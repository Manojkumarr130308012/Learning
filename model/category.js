const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    image: {
        type: String,
        required: false,
    }
});

module.exports = new mongoose.model('category', categorySchema);
