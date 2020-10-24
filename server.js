const express =require('express');
const jwt = require('jsonwebtoken');
const db=require('./lib/db');
const app =express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http=require('http');
const rapi=require('./routes/api.js');

db.createDBCon();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("origin"));
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);
app.use(cors({origin: ['*'],credentials: true}));

app.use('/',cors(),rapi);



// app.get('/getapi',veryfyToken,(req,res)=>{
//     res.json({message:"Data is getting"});
// });
// app.post('/postapi',veryfyToken,(req,res)=>{
//     jwt.verify(req.token, 'securtykey', function(err, decoded) {
//        if(err)
//        {res.sendStatus(403)}
//        else{
//         res.json({message:"Data is posting",decoded});
//        }
//       });
// });
// function veryfyToken(req,res,next){ 
//     const bearHeader=req.headers['authorization'];   
//     if(typeof bearHeader != 'undefined'){
//   //      const bear =bearHeader.split(' ');
//    //     const bearToken =bear[1];
//         req.token=bearHeader;
//         next();
//     }else{
//         res.json({token:"Token is not Correct Now"});
//     }
// }
app.post('/postapi/login',(req,res)=>{
    let user={
        id:1,
        name:"gupteshwar maurya",
        address:"home"
    }
    jwt.sign({ user }, 'securtykey',(error ,token)=>{
        res.json({token})
    });
  //  res.json({message:"Data is posting"});
});

app.listen(2000,()=>console.log("Server is running On:2000"));