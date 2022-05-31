const express = require("express");
const TodoTask = require("../Schema/TodoTask");
const router = express.Router();

router.get("/", async (req, res) => {
  const MyTasks = await TodoTask.find();

  res.send(MyTasks);
});

router.post("/", async (req, res) => {
  try {
    let todoTask = new TodoTask({
      taskName: req.body.taskName,
      taskDate: req.body.taskDate,
      taskDetails: req.body.taskDetails,
    });
    todoTask = await todoTask.save();

    res.send("todoTask");
  } catch (error) {
    console.log("Post task not working : " + error);
  }
});

router.put("/", async (req, res) => {
  const task = await TodoTask.findByIdAndDelete(req.body._id);
  if (!task)
    return res.status(404).send("no comment has this id: " + req.body._id);
  res.send(task);
});

module.exports = router;
