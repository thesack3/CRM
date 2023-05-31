// write schema for Reminder here and export it

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
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
  isEmailSend: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
