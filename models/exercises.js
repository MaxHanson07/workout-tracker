const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: "Exercise name is required!"
    },
    type: String,
    weight: Number,
    duration: Number,
    setsreps: Number,
    miles: Number
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;