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
  type: {
    type: String,
    enum: ["incoming", "outgoing"],
  },
  isRead: {
    type: Boolean,
    default: false,
  },

  sid: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isSent: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  sentDate: {
    type: Date,
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
});

module.exports = mongoose.model("Text", TextSchema);
