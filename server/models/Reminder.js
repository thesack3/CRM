// write schema for Reminder here and export it

const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  note: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Reminder", ReminderSchema);
