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
    Celler_Name: {
        type: String,
        required: false,
    },
    Celler_Email: {
        type: String,
        required: false,
    },
    Celler_Address: {
        type: String,
        required: false,
    },
    Celler_Gender: {
        type: String,
        required: false,
    },
    Celler_Aadhaar_number: {
        type: String,
        required: false,
    }, 
    Celler_cell_no: {
        type: String,
        required: false,
    },
    Celler_Introducer_name: {
        type: String,
        required: false,
    },
    Celler_Introducer_cell_no: {
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
    Celler_Total_amt: {
        type: String,
        required: false,
    },
    Celler_Advanced_amt: {
        type: String,
        required: false,
    },
    Celler_Balance_amt: {
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
    Celler_Signature: {
        type: String,
        required: false,
    },
    Celler_Aadhaar_photo: {
        type: String,
        required: false,
    },
    Vechicle_type: {
        type: String,
        required: false,
    }, 
    Customer_Name: {
        type: String,
        required: false,
    },
    Customer_Email: {
        type: String,
        required: false,
    },
    Customer_Address: {
        type: String,
        required: false,
    },
    Customer_Gender: {
        type: String,
        required: false,
    },
    Customer_Aadhaar_number: {
        type: String,
        required: false,
    }, 
    Customer_cell_no: {
        type: String,
        required: false,
    },
    Customer_Introducer_name: {
        type: String,
        required: false,
    },
    Customer_Introducer_cell_no: {
        type: String,
        required: false,
    },
    Customer_Total_amt: {
        type: String,
        required: false,
    },
    Customer_Advanced_amt: {
        type: String,
        required: false,
    },
    Customer_Balance_amt: {
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
});

module.exports = new mongoose.model('vechiclestock', vechicleSchema);
