var express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Shanawaz:S9224173244@cluster0.yzwt80v.mongodb.net/"
);

const userSchema = mongoose.Schema({
  userName: String,
  nickName: String,
  description: String,
  categories: {
    type: Array,
    default: [],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("userCollection", userSchema);
