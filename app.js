var express = require("express");
var jsonServer = require("json-server");
var server = express();
var cors = require("cors");
const port = 4000;
// ...
server.use(cors());
// You may want to mount JSON Server on a specific end-point, for example /api
// Optiona,l except if you want to have JSON Server defaults
// server.use('/api', jsonServer.defaults());
server.use("/api", jsonServer.router("db.json"));

server.get("/", (req, res) => {
  res.send(`"Hello World!"`);
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
