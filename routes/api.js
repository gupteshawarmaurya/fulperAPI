var express=require('express');
var router=express.Router();
var appfunction=require('./app');


router.get('/getapi/user',appfunction.getUserdata);

router.post('/postapi/user',appfunction.veryfyToken,appfunction.postUserdata);

module.exports = router;