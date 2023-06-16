const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
  body: {
    type: String,
  },
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: String,
  },
  sid: {
    type: String,
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
});
module.exports = mongoose.model("Text", TextSchema);
