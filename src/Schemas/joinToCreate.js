const { model, Schema } = require("mongoose");

let joinToCreate = new Schema({
  Guild: String,
  Channel: String,
  Category: String,
  VoiceLimit: Number,
});

module.exports = model("jointocreate", joinToCreate);
