

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userData = new Schema({
  user_id:{ type: Number, required: true },
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    geo: {
      lat: { type: String, required: true },
      lng: { type: String, required: true }
    }
  },
  password:{ type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  // website: { type: String, required: true },
  // company: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Company"
  // },
  // product:{
  //   type: Schema.Types.ObjectId,
  //   ref: "Product"
  // }
}, {
  collection: 'userDetails'
});

module.exports = mongoose.model("userDetails", userData);







// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const userData = new Schema({
//   name: { type: String, required: true },
//   address: {
//     street: { type: String, required: true },
//     suite: { type: String, required: true },
//     city: { type: String, required: true },
//     zipcode: { type: String, required: true },
//     geo: {
//       lat: { type: String, required: true },
//       lng: { type: String, required: true }
//     }
//   },
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   username: { type: String, required: true },
//   website: { type: String, required: true },
//   company: {
//     type: Schema.Types.ObjectId,
//     ref: "Company"
//   },
//   product:{
//     type: Schema.Types.ObjectId,
//     ref: "Product"
//   }
// }, {
//   collection: 'userDetails'
// });

// module.exports = mongoose.model("userDetails", userData);





