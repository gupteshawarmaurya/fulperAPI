const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./lib/db');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
const rapi = require('./routes/api.js');
const userDetailsSchema = require('./models/userDetails');

db.createDBCon();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("origin"));
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);
app.use(cors({ origin: ['*'], credentials: true }));

app.use('/', cors(), rapi);

app.get('/', (req, res) => {
  res.send({message:"API IS RUNNING NOW."});
});


app.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    userDetailsSchema.findOne({ username: req.body.username },
      function (err, suc) {
        if (suc) {
          jwt.verify(suc.password, 'securtykey', function (error, decoded) {
            if (error) {
              res.send({ message: "Password is not correct", error: error.message })
            }
            else {
              if (req.body.password == decoded.password) {
                jwt.sign({ username: suc.username, user_id: suc.user_id, name: suc.name }, 'securtykey', (error, token) => {
                  res.json(
                    {
                      "message": "Login Successfully",
                      "data": {
                        "responseData": { token: token, username: suc.username }
                      },
                      "status": "SUCCESS"
                    })
                });
              } else {
                res.status(300).send({ message: "Password is Incorrect!" });
              }
            }
          });

        } else {
          res.status(300).send({ message: "Username and Password are Incorrect!" });
        }
      });
  } else {
    res.status(300).send({ message: "Username and Password are Incorrect!" });
  }
});

app.post('/signup', (req, res) => {
  // console.log(req.body)
  if (req.body) {
    jwt.sign({ "username": req.body.username, "password": req.body.password }, 'securtykey', (error, token) => {
      if (token) {
        let obj = {
          user_id: Math.floor(1000 + Math.random() * 9000),
          name: req.body.name,
          address: req.body.address,
          password: token,
          phone: req.body.phone,
          email: req.body.email,
          username: req.body.username
        }
        userDetailsSchema.insertMany(obj,
          function (err, suc) {
            if (suc) {
              res.status(200).json({ message: "User Created successfully" });
            } else {
              res.status(300).send({ message: "Unable to Sign User" });
            }
          });
      }
    });
  } else {
    res.json({ message: "Plase Enter you Details" })
  }
});



//error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || "3001";

app.set("port", port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
