var express = require('express');
var router = express.Router();
var appfunction = require('./app');

router.get('/getapi/category', appfunction.getCategorty);

router.post('/postapi/category', appfunction.postCategorty);



module.exports = router;
