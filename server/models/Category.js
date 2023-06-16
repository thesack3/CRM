const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  color: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  // link to lead
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
  // link to user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Category", CategorySchema);
