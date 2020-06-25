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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useFindAndModify: false });

//GET workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout)
    }).catch(err => {
      res.json(err)
    })
})

//POST workouts
app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(newWorkout => {
      res.json(newWorkout)
    }).catch(err => {
      res.json(err)
    })
})

//PUT workouts
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne({ _id: req.params.id }, {
    $push: {
      exercises: [
        {
          "type": req.body.type,
          "name": req.body.name,
          "duration": req.body.duration,
          "distance": req.body.distance,
          "weight": req.body.weight,
          "reps": req.body.reps,
          "sets": req.body.sets
        }
      ]
    }
  }).then(dbUpdate => {
    res.json(dbUpdate);
  }).catch(err => {
    res.json(err)
  })
})

//GET workouts/range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout)
      console.log(dbWorkout)
    }).catch(err => {
      res.json(err)
    })
})


//HTML Routes
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"))
})

app.get("/", (req, res) => {
  res.sendFile(paht.join(__dirname, "../public/index.html"))
})

//Listening on PORT...
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
});