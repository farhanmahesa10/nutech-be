const express = require("express");

var express = require("express");
var jsonServer = require("json-server");
var server = express();
var cors = require("cors");
const PORT = 4000;

server.use(cors());
// You may want to mount JSON Server on a specific end-point, for example /api
// Optiona,l except if you want to have JSON Server defaults
// server.use('/api', jsonServer.defaults());
server.use("/api", jsonServer.router("db.json"));

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.get("/about", (req, res) => {
  res.send("This is my about route..... ");
});

// Export the Express API
module.exports = app;
