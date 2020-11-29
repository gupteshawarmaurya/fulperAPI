const mongoose = require('mongoose');
module.exports = {
  createDBCon: function (callback) {
    mongoose.connect('mongodb+srv://gourmetAdmin:gourmetAdmin@gourmet-catering.dpsld.mongodb.net/fluperUserForm?retryWrites=true&w=majority').then( 
 // mongoose.connect('mongodb://GourmetCatering:maurya14062018@ds113626.mlab.com:13626/gourmet_catering').then(
  //  mongoose.connect('mongodb://nlpdb:maurya14062018@ds129831.mlab.com:29831/nlpdb').then(
    () => { console.log('Database is connected') },
    err => {
        console.log('Can not connect to the database' + err);
    });
  }

}