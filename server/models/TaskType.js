// task type model

const mongoose = require("mongoose");

const TaskTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  // relation with user model (one to many) (one user can have many task types)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("TaskType", TaskTypeSchema);
