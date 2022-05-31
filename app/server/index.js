const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const home = require("../server/Routes/Home");
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/", home);

mongoose
  .connect("mongodb://localhost/ToDoTasks", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connecting to MongoDb..."))
  .catch((err) => {
    console.error("Could not connect to MongoDb");
  });

//Server port
const port = 5500;
app.listen(process.env.PORT || port, () =>
  console.log(`App listening on port ${port}`)
);
