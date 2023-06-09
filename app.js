// var express = require("express");
// var jsonServer = require("json-server");
// var server = express();
// var cors = require("cors");
// const port = 4000;
// // ...
// server.use(cors());
// // You may want to mount JSON Server on a specific end-point, for example /api
// // Optiona,l except if you want to have JSON Server defaults
// // server.use('/api', jsonServer.defaults());
// server.use("/api", jsonServer.router("db.json"));

// server.get("/", (req, res) => {
//   res.send(`"Hello World!"`);
// });

// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
const app = require("express")();
const { v4 } = require("uuid");

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;
