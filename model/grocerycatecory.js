const mongoose = require('mongoose');

const grocerycategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    
    },
    image: {
        type: String,
        required: false,
    },
    position: {
        type: String,
        required: false,
    },
    createdby: {
        type: String,
        required: false,
    },
    createddate: {
        type: String,
        required: false,
    },
    updatedby: {
        type: String,
        required: false,
    },
    updateddate: {
        type: String,
        required: false,
    }
});

module.exports = new mongoose.model('grocerycategory', grocerycategorySchema);
