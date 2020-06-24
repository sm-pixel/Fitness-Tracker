const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
// const { Workout } = require("./models");

const PORT = 3000;

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//GET workouts route
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(Workout => {
      res.json(Workout)
    }).catch (err => {
      res.json(err)
    })
})


//Listening on PORT...
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}!`);
  });