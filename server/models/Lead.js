
//==


const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    phoneStatus: {
        type: String,
        required: false
    },
    emailInvalid: {
        type: String,
        required: false
    },
    GloballyOptedOutOfEmail: {
        type: String,
        required: false
    },
    GloballyOptedOutOfBuyerAgentEmail: {
        type: String,
        required: false
    },
    GloballyOptedOutOfListingAgentEmail: {
        type: String,
        required: false
    },
    GloballyOptedOutOfLenderEmail: {
        type: String,
        required: false
    },
    GloballyOptedOutOfAlerts: {
        type: String,
        required: false
    },
    OptInDate: {
        type: String,
        required: false
    },
    BuyerAgentCategory: {
        type: String,
        required: false
    },
    ListingAgentCategory: {
        type: String,
        required: false
    },
    LenderCategory: {
        type: String,
        required: false
    },
    BuyerAgent: {
        type: String,
        required: false
    },
    ListingAgent: {
        type: String,
        required: false
    },
    Lender: {
        type: String,
        required: false
    },
    OriginalSource: {
        type: String,
        required: false
    },
    OriginalCampaign: {
        type: String,
        required: false
    },
    LastAgentNote: {
        type: String,
        required: false
    },
    eAlerts: {
        type: String,
        required: false
    },
    VisitTotal: {
        type: String,
        required: false
    },
    listingviewcount: {
        type: String,
        required: false
    },
    AvgListingPrice: {
        type: String,
        required: false
    },
    NextCallDue: {
        type: String,
        required: false
    },
    LastAgentCallDate: {
        type: String,
        required: false
    },
    LastLenderCallDate: {
        type: String,
        required: false
    },
    FirstVisitDate: {
        type: String,
        required: false
    },
    LastVisitDate: {
        type: String,
        required: false
    },
    RegisterDate: {
        type: String,
        required: false
    },
    LeadType: {
        type: String,
        required: false
    },
    AgentSelected: {
        type: String,
        required: false
    },


    LenderOptIn:{
        type: String,
        required: false
    },
    Address:{
        type: String,
        required: false
    },
    City:{
        type: String,
        required: false
    },
    State:{
        type: String,
        required: false
    },
    ZipCode:{
        type: String,
        required: false
    },
    Tags:{
        type: String,
        required: false
    },
    Link:{
        type: String,
        required: false
    },
    Birthday:{
        type: String,
        required: false
    },
    HomeClosingDate:{
        type: String,
        required: false
    },
    
    
 });

 module.exports = mongoose.model('Lead', LeadSchema);

