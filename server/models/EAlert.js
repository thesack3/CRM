const mongoose = require('mongoose');

const EalertSchema = new mongoose.Schema({
    contactId:{
        type: String,
    },
    FirstName:{
        type: String,
    },
    LastName:{
        type: String,
  
    },
    SearchName:{
        type: String,
       
    },
    QueryString:{
        type: String,
    
    },
    EmailFrequency:{
        type: String,
     
    },
    BuyerAgent:{
        type: String,
     
    },
    ListingAgent:{
        type: String,
     
    },
    leadId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead'
    }
})

module.exports = mongoose.model('Ealert', EalertSchema);