// Controller functions come here
const { Client } = require("../models/client");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../JWT-check");

const ClientControllers = {};

// Add new Client
ClientControllers.addClient = async (req, res) => {
  // //avatar: req.file.path,
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const client = await new Cleint({
      _id: mongoose.Types.ObjectId(),
      username: req.body.clientname,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      admin: req.body.admin,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
     
    });

    await client.save();
    res.status(201).json({ message: "New user being added ✅", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// GET all users
ClientControllers.getAllClient = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(err.message).json({ message: err.message });
  }
};

// Login
ClientControllers.login = async (req, res) => {
  let clientname = req.body.clientname;
  let password = req.body.password;
  const client = await Client.findOne({ clientname });
  console.log(client)
  if (client == null) {
    return res.status(404).json({ message: "Cannot find user" });
  }
  try {
    console.log(await bcrypt.compare(password, client.password))
    if (await bcrypt.compare(password, client.password)) {
      console.log('problem createToken')
      const token = createToken(client);
      console.log('testt2')
      req.session.client = client;
      await res
        .header("auth", token)
        .json({
          auth: true,
          token,
          client: {
            password: client.password,
            clientname: client.clientname,
          },
        });
    } else {
      res.json({
        message: "Not Allowed, please check your clientname or password",
      });
    }
  } catch (err) {
    
    res.status(400).json({ message: err.message });
  }
};
// logout
ClientControllers.logout = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("");
};
// deleteUser
ClientControllers.deleteClient = async (req, res) => {
  //console.log(req.query.id);
  try {
    const client = await Client.findByIdAndDelete(req.query.id);
    res.status(200).json({ message: "this client been deleted", client });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
//getOneByID
ClientControllers.getOneClient = async (req, res) => {
  console.log(req.query.id);
  try {
    const client = await Client.findById(req.query.id);
    res.status(200).json({ message: "client", client });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

ClientControllers.getDate = async (req, res) => {
  res.status(200).json("welcome to leader");
};
module.exports = ClientControllers;
