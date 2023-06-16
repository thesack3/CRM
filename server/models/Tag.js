const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  dateCreated: {
    type: String,
  },

  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Tag", TagSchema);
