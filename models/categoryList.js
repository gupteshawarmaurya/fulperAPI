const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const skillsSchema = new Schema({
  technology:{ type: String, required: true }
});
const categoryData = new Schema({
  firstName: { type: String, required: true },
  lastName:{ type: String, required: true },
  phoneNo: { type: Number, required: true },
  address:{ type: String, required: true },
  panNo: { type: String, required: true },
 // skills:[skillsSchema],
  skills:[Schema.Types.Mixed],
  age: { type: Number, required: true }

}, {
  collection: 'categoryList'
});



module.exports = mongoose.model("categoryList", categoryData);




