const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
  disease_name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  symptoms: [{ type: String }],
});

module.exports = mongoose.model("Disease", diseaseSchema);
