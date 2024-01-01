const { model, Schema } = require("mongoose");

let joinToCreateChannels = new Schema({
  Guild: String,
  User: String,
  Channel: String,
});

module.exports = model("jointocreatechannels", joinToCreateChannels);
