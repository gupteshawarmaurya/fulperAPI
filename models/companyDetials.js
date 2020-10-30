var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true }
},
{
    collection: 'Company'
  });

var Company = mongoose.model("Company", CompanySchema);

module.exports = Company;