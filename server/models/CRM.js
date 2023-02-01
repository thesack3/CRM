const mongoose = require('mongoose');


const CRMSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },  
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});