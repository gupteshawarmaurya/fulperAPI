const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fullAddressSchema = new Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }

});
const emailSchema = new Schema({
    email: { type: String, required: true },
});

const fluperUserFormData = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    userName: { type: String, required: true },
    // skills:[Schema.Types.Mixed],
    gender: { type: String, required: true },
    fullAddress: fullAddressSchema,
    multipleEmail: [emailSchema],
    dob: { type: Date, required: true },


}, {
    collection: 'fluperUserForm'
});



module.exports = mongoose.model("fluperUserForm", fluperUserFormData);


