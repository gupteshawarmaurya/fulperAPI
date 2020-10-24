
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userData = new Schema({
  name:String,
  address:String,
  phone_no:Number,
  email:String,
  pan_no:String
  }, {
      collection: 'userDetails'
    });

module.exports = mongoose.model("userDetails", userData);