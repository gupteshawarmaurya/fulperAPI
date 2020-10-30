var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  departments: {
    type: String,
    required: true
  },
  review: {
    type:String
  },
  // user:{
  //   type: Schema.Types.ObjectId,
  //   ref: "Product"
  // }
},
{
  collection: 'Product'
});

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;