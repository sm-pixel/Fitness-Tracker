const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
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
}, { toJSON: { virtuals: true } });

//Define virtual
workoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((total, current) => {
        return total + current.duration
    }, 0)
})
//Creates model from schema
const Workout = mongoose.model("Workout", workoutSchema);

//Exports model
module.exports = Workout;