const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlAddress: { type: String}
});

module.exports = mongoose.model("Url", urlSchema);
