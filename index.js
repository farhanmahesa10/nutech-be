var express = require("express");
var server = express();
var cors = require("cors");
const db = require("./data/db.json");
const port = 4000;
// ...
server.use(cors());
// You may want to mount JSON Server on a specific end-point, for example /api
// Optiona,l except if you want to have JSON Server defaults
// server.use('/api', jsonServer.defaults());

server.get("/", (req, res) => {
  res.send(`"Hello World!"`);
});
server.get("/api", (req, res) => {
  res.json(db);
});
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = server;
