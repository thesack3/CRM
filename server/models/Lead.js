
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
    OrignialCampaign: {
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
    LastVisitdate: {
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


// const LeadSchema = new mongoose.Schema({
//     firstName:{
//         type: String,
        
//     },
//     lastName:{
//         type: String,
        
//     },
//     description:{
//         type: String,
//     },
//     email:{
//         type: String,
//     },
//     phone:{
//         type: String,
//     },
//     phoneStatus:{
//         type: String,
//     },
//     emailInvalid:{
//         type: String,
//     },
//     GloballyOptedOutOfEmail:{
//         type: String,
//     },
//     GloballyOptedOutOfBuyerAgentEmail:{
//         type: String,
//     },
//     GloballyOptedOutOfListingAgentEmail:{
//         type: String,
//     },
//     GloballyOptedOutOfLenderEmail:{
//         type: String,
//     },
//     GloballyOptedOutOfAlerts:{
//         type: String,
//     },
//     OptInDate:{
//         type: String,
//     },
//     BuyerAgentCategory:{
//         type: String,
//     },
//     ListingAgentCategory:{
//         type: String,
//     },
//     LenderCategory:{
//         type: String,
//     },
//     BuyerAgent:{
//         type: String,
//     },
//     ListingAgent:{
//         type: String,
//     },
//     Lender:{
//         type: String,
//     },
//     OriginalSource:{
//         type: String,
//     },
//     OrignialCampaign:{
//         type: String,
//     },
//     LastAgentNote:{
//         type: String,
//     },
//     eAlerts:{
//         type: String,
//     },
//     VisitTotal:{
//         type: String,
//     },
//     listingviewcount:{
//         type: String,
//     },
//     AvgListingPrice:{
//         type: String,
//     },
//     NextCallDue:{
//         type: String,
//     },
//     LastAgentCallDate:{
//         type: String,
//     },
//     LastLenderCallDate:{
//         type: String,
//     },
//     FirstVisitDate:{
//         type: String,
//     },
//     LastVisitdate:{
//         type: String,
//     },
//     RegisterDate:{
//         type: String,
//     },
//     LeadType:{
//         type: String,
//     },
//     AgentSelected:{
//         type: String,
//     },
//     LenderOptIn:{
//         type: String,
//     },
//     Address:{
//         type: String,
//     },
//     City:{
//         type: String,
//     },
//     State:{
//         type: String,
//     },
//     ZipCode:{
//         type: String,
//     },
//     Tags:{
//         type: String,
//     },
//     Link:{
//         type: String,
//     },
//     Birthday:{
//         type: String,
//     },
//     HomeClosingDate:{
//         type: String,
//     },
    
    
 });

 module.exports = mongoose.model('Lead', LeadSchema);

