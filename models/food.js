var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var foodSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  }]
});

var Food = mongoose.model("Food", foodSchema);

module.exports = Food