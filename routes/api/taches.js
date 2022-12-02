const express = require('express')
const { short } = require('webidl-conversions')
const router = express.Router()
const TacheControllers = require("../../controllers/TacheController");
const Tache = require('../../models/tache')


// add  new task
router.post("/addTache", TacheControllers.addTache);

// get all tasks
router.get("/getAlltaches", TacheControllers.getAlltaches);

// get one tasks
router.get("/getOnetaches", TacheControllers.getOnetache);

// get one tasks
router.put("/updateStatusTache", TacheControllers.UpdateStatustache);

// delete  tasks
router.delete("/deletetache", TacheControllers.deletetache);









module.exports=router;