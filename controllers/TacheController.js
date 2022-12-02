// Controller functions come here
const Tache = require('../models/tache')
const mongoose = require("mongoose");

const TacheControllers = {};

// Add new tache
TacheControllers.addTache = async (req, res) => {
  try {
    const tache = await new Tache({
        _id: mongoose.Types.ObjectId(),
        description : req.body.description,
        remarque : req.body.remarque,
        status : req.body.status,
        date_creation : req.body.date_creation,
    });

    await tache.save();
    res.status(201).json({ message: "New tache being added ✅", tache });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// GET all taches
TacheControllers.getAlltaches = async (req, res) => {
  try {
    const taches = await Tache.find();
    res.status(200).json(taches);
  } catch (err) {
    res.status(err.message).json({ message: err.message });
  }
};

// deletetache
TacheControllers.deletetache = async (req, res) => {
  //console.log(req.query.id);
  try {
    const tache = await Tache.findByIdAndDelete(req.query.id);
    res.status(200).json({ message: "this tache been deleted", tache });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
//update status task
TacheControllers.UpdateStatustache= async (req, res) => {
    try {
        await Tache.findByIdAndUpdate(req.params.id, {
            $set: {
                status : req.body.status
            },
          });
        const tache = await Tache.findById(req.query.id);
        res.status(201).json({ message: "New tache being updated ✅", tache });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

//getOneByID
TacheControllers.getOnetache = async (req, res) => {
  console.log(req.query.id);
  try {
    const tache = await Tache.findById(req.query.id);
    res.status(200).json({ message: "tache", tache });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports = TacheControllers;
