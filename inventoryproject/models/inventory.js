const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

module.exports = mongoose.model("inventory", inventorySchema);
