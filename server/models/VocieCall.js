// write schema for voice call

const mongoose = require("mongoose");

const VoiceCallSchema = new mongoose.Schema({
  body: {
    type: String,
  },
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  dateCreated: {
    type: String,
  },
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
});

module.exports = mongoose.model("VoiceCall", VoiceCallSchema);
