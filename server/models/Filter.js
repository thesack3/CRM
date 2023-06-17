// write schema for leads table

const mongoose = require("mongoose");

const FilterSchema = mongoose.Schema({
  columns: {
    type: Array,
    // write default columns here
    default: [
      // "__check__",
      // "firstName",
      // "lastName",
      // "email",
      // "description",
      // "phone",
      // "phoneStatus",
      // "emailInvalid",
      // "GloballyOptedOutOfEmail",
      // "GloballyOptedOutOfBuyerAgentEmail",
      // "GloballyOptedOutOfListingAgentEmail",
      // "GloballyOptedOutOfLenderEmail",
      // "GloballyOptedOutOfAlerts",
      // "OptInDate",
      // "BuyerAgentCategory",
      // "ListingAgentCategory",
      // "LenderCategory",
      // "BuyerAgent",
      // "ListingAgent",
      // "Lender",
      // "OriginalSource",
      // "OriginalCampaign",
      // "Last Agent Note",
      // "eAlerts",
      // "VisitTotal",
      // "listingviewcount",
      // "AvgListingPrive",
      // "NextCallDue",
      // "LastAgentCalDate",
      // "LastLenderCallDate",
      // "FirstVisitDate",
      // "LastVisitDate",
      // "RegisterDate",
      // "LeadType",
      // "AgentSelected",
      // "LenderOptIn",
      // "Address",
      // "City",
      // "State",
      // "ZipCode",
      // "Link",
      // "Birthday",
      // "HomeClosingDate",
      // "didLeaveReview",
      // "didClosingGift",
      // "didsocialMediaFriends",
      // "didPostCardDrip",
      // "didAnniversaryDrip",
    ],
  },

  closedColumns: {
    type: Array,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },

  pageSize: {
    type: Number,
  },
  page: {
    type: Number,
  },
  sort: {
    type: String,
  },

  search: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Filter", FilterSchema);
