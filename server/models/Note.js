const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  contactId: {
    type: String,
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Notes: {
    type: String,
  },
  BuyerAgent: {
    type: String,
  },
  ListingAgent: {
    type: String,
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
});

module.exports = mongoose.model("Note", NoteSchema);
