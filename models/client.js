//  population and ref
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  _id: Schema.Types.ObjectId,
  clientname: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    //match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
    unique: true,
  },
  admin: Boolean,
  
  password: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    index: true,
  },
  avatar: String,
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = { Client };