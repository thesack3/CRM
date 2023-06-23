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
  type: {
    // define enum for type incoming or outgoing
    type: String,
    enum: ["incoming", "outgoing"],
  },
  dateCreated: {
    type: String,
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

module.exports = mongoose.model("VoiceCall", VoiceCallSchema);
