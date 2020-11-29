const express = require('express');
const db = require('./lib/db');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http');
const rapi = require('./routes/api.js');

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
