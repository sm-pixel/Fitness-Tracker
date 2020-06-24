const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
const path = require("path")

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

//HTML Routes
app.get("/exercise",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","exercise.html"));
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"))
})

app.get("/", (req,res) => {
  res.sendFile(paht.join(__dirname, "../public/index.html"))
})

//Listening on PORT...
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}!`);
  });