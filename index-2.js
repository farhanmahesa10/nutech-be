// const express = require("express");

// const app = express();
// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log(`API listening on PORT ${PORT} `);
// });

// app.get("/", (req, res) => {
//   res.send("Hey this is my API running 🥳");
// });

// app.get("/about", (req, res) => {
//   res.send("This is my about route..... ");
// });

// // Export the Express API
// module.exports = app;

const express = require("express");
// const jsonServer = require("json-server");

const app = express();
// const jsonRouter = jsonServer.router("db.json");
// const jsonMiddlewares = jsonServer.defaults();

const PORT = process.env.PORT || 4000;

// Middleware JSON Server
// app.use("/api", jsonMiddlewares);

// Rute JSON Server
app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Rute Express.js
app.get("/", (req, res) => {
  res.send("Selamat datang di server Express.js!");
});
// Export the Express API
module.exports = app;
