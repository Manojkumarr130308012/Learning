const mongoose = require('mongoose');

const vechicleSchema = new mongoose.Schema({
    Date: {
        type: Date,
        required: false,
    
    },
    Time:{
        type:String,
        required: false,
    },
    Name: {
        type: String,
        required: false,
    },
    Address: {
        type: String,
        required: false,
    },
    Aadhaar_number: {
        type: String,
        required: false,
    }, 
    Customer_cell_no: {
        type: String,
        required: false,
    },
    Introducer_name: {
        type: String,
        required: false,
    },
    Introducer_cell_no: {
        type: String,
        required: false,
    },
    Vechicle_no: {
        type: String,
        required: false,
    },
    Vechicle_color: {
        type: String,
        required: false,
    },
    Vechicle_make: {
        type: String,
        required: false,
    },
    Vechicle_model: {
        type: String,
        required: false,
    },
    Vechicle_chassis_number: {
        type: String,
        required: false,
    },
    Vechicle_engine_number: {
        type: String,
        required: false,
    },
    Total_amt: {
        type: String,
        required: false,
    },
    Advanced_amt: {
        type: String,
        required: false,
    },
    Balance_amt: {
        type: String,
        required: false,
    },
    Rc_document: {
        type: String,
        required: false,
    },
    Noc_document: {
        type: String,
        required: false,
    },
    To_document: {
        type: String,
        required: false,
    },
    Insurance: {
        type: String,
        required: false,
    },
    Customer_Signature: {
        type: String,
        required: false,
    },
    Customer_Aadhaar_photo: {
        type: String,
        required: false,
    },
    Vechicle_type: {
        type: String,
        required: false,
    }
});

module.exports = new mongoose.model('vechiclestock', vechicleSchema);
