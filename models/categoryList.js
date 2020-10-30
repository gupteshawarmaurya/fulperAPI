const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categoryData = new Schema({
  name: { type: String, required: true },
  title:{ type: String, required: true },
  username: { type: String, required: true },
  user_id:{ type: Number, required: true },
}, {
  collection: 'categoryList'
});

module.exports = mongoose.model("categoryList", categoryData);




