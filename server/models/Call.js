const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    contactId:{
        type: String,
    },
    FirstName:{
        type: String,
    },
    LastName:{
        type: String,
  
    },
    DateCreated:{
        type: String,
       
    },
    BuyerAgent:{
        type: String,
    
    },
    ListingAgent:{
        type: String,
     
    },
    UserID:{
        type: String,
     
    },
    AssociatedopportunityID:{
        type: String,
     
    },
    CallDetails:{
        type: String,
     
    },
    ContactPhoneID:{
        type: String,
     
    },
    LogType:{
        type: String,
     
    },
    MediaURL:{
        type: String,
     
    },
    CallStartTime:{
        type: String,
     
    },
    CallEndTime:{
        type: String,
     
    },
    leadId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead'
    }
})

module.exports = mongoose.model('Call', CallSchema);