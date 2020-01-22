var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  origin: {
    type: String,
    default: ""
  }
})

var Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient