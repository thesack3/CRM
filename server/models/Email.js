const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  subject: {
    type: String,
  },
  body: {
    type: String,
  },
  date: {
    type: Date,
  },
  isSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
});

module.exports = mongoose.model("Email", EmailSchema);
