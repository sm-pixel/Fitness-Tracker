const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const workoutSchema = new Schema({
    day: {
        type: Date
    },
    exercies: [
        {
            type: {
                type: String,
                trim: true,
                required: "Exercise type is required"
            },
            name: {
                type: String,
                trimg: true,
                required: "Exercise name is required"
            },
            duration: {
                type: Number,
                required: "Exercise duration is required"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
}, opts);

//Creates model from schema
const Workout = mongoose.model("Workout", workoutSchema);

//Exports model
module.exports = Workout;