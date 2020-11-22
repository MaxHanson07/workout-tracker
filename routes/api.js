const mongoose = require("mongoose");
const db = require("../models")
const router = require("express").Router();



  router.get("/api/workouts/populated", function (req, res) {
    db.Workout.find({}).populate("exercises").then(data => {
      res.json(data)
    })
  });

  router.get("/api/workouts", function (req, res) {
    db.Workout.find({}).then(data => {
      res.json(data)
    })
  });

  router.post("/api/workouts", async function (req, res) {
    try {
      let workout = await db.Workout.create({ name: req.body.name })
      res.json(workout)
    } catch (err) {
      console.error(err);
      res.json(err)
    }
  })

  router.post("/api/exercises", async function (req, res) {
    try {
      let exercise = req.body.exercise
      let inserted = await db.Exercise.create(exercise)
      let workout = await db.Workout.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.workoutId) }, {
        $push: { exercises: inserted._id }
      },
        { new: true }
      )
      res.json(workout)
    } catch (err) {
      console.error(err);
      res.json(err)
    }
  })



  router.delete("/api/workouts/:id", async function (req, res) {
    try {
      let workout = await db.Workout.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
      let exerciseIds = workout.exercises
      for (let eId of exerciseIds) {
        let eDeleted = await db.Exercise.remove({ _id: mongoose.Types.ObjectId(eId) })
        console.log(eDeleted)
      }
      let wDeleted = await db.Workout.remove({ _id: mongoose.Types.ObjectId(req.params.id) })
      res.send(wDeleted)
    } catch (err) {
      console.error(err);
      res.json(err)
    }

  });

  router.delete("/api/exercises/:id", async function (req, res) {
    try {
      let deleted = await db.Exercise.remove({ _id: mongoose.Types.ObjectId(req.params.id) })
      res.json(deleted)
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  })

  router.put("/api/exercises/:id", function (req, res) {
    console.log(req.body)
    db.Exercise.update({_id: mongoose.Types.ObjectId(req.params.id)}, 
    req.body,
    {overwrite: true}
    ).then(result => {
      res.json(result)
    }).catch(err => {
      console.error(err);
      res.json(err)
    })
  })

  router.put("/api/workouts/:id", function (req, res) {
    db.Workout.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $set: req.body
      }).then(data => {
        res.json(data)
      }).catch(err => {
        console.error(err);
        res.json(err)
      })
  })

  module.exports = router;