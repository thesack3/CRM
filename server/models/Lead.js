const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    description:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    phoneStatus:{
        type: String,
    },
    emailInvalid:{
        type: String,
    },
    GloballyOptedOutOfEmail:{
        type: String,
    },
    GloballyOptedOutOfBuyerAgentEmail:{
        type: String,
    },
    GloballyOptedOutOfListingAgentEmail:{
        type: String,
    },
    GloballyOptedOutOfLenderEmail:{
        type: String,
    },
    GloballyOptedOutOfAlerts:{
        type: String,
    },
    OptInDate:{
        type: String,
    },
    BuyerAgentCategory:{
        type: String,
    },
    ListingAgentCategory:{
        type: String,
    },
    LenderCategory:{
        type: String,
    },
    BuyerAgent:{
        type: String,
    },
    ListingAgent:{
        type: String,
    },
    Lender:{
        type: String,
    },
    OriginalSource:{
        type: String,
    },
    OrignialCampaign:{
        type: String,
    },
    LastAgentNote:{
        type: String,
    },
    eAlerts:{
        type: String,
    },
    VisitTotal:{
        type: String,
    },
    listingviewcount:{
        type: String,
    },
    AvgListingPrice:{
        type: String,
    },
    NextCallDue:{
        type: String,
    },
    LastAgentCallDate:{
        type: String,
    },
    LastLenderCallDate:{
        type: String,
    },
    FirstVisitDate:{
        type: String,
    },
    LastVisitdate:{
        type: String,
    },
    RegisterDate:{
        type: String,
    },
    LeadType:{
        type: String,
    },
    AgentSelected:{
        type: String,
    },
    LenderOptIn:{
        type: String,
    },
    Address:{
        type: String,
    },
    City:{
        type: String,
    },
    State:{
        type: String,
    },
    ZipCode:{
        type: String,
    },
    Tags:{
        type: String,
    },
    Link:{
        type: String,
    },
    Birthday:{
        type: String,
    },
    HomeClosingDate:{
        type: String,
    },
    ZipCode:{
        type: String,
    },
    
});

module.exports = mongoose.model('Lead', LeadSchema);