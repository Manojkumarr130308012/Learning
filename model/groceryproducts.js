const mongoose = require('mongoose');

const groceryproductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.ObjectId,
        required: false
    },
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
    description: {
        type: String,
        required: false,
    }, 
    price: {
        type: String,
        required: false,
    },
    quantity: {
        type: String,
        required: false,
    },
    units: {
        type: String,
        required: false,
    },
    discounts: {
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

module.exports = new mongoose.model('groceryproduct', groceryproductSchema);
