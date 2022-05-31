const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  taskName: { type: String },
  taskDate: { type: String },
  taskDetails: { type: String },
});
const MyTasks = mongoose.model("MyTasks", tasksSchema);

module.exports = MyTasks;
module.exports.MyTasks = tasksSchema;
