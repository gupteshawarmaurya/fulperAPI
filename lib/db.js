const mongoose = require('mongoose');
module.exports = {
  createDBCon: function (callback) {
  mongoose.connect('mongodb://nlpdb:maurya14062018@ds129831.mlab.com:29831/nlpdb').then(
    () => { console.log('Database is connected') },
    err => {
        console.log('Can not connect to the database' + err);
    });
  }

}