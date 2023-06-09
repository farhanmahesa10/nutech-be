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

// Menambahkan data
server.post("/api", (req, res) => {
  const newData = req.body;
  db.push(newData);
  res.status(201).json(newData);
});

// Memperbarui data
server.put("/api/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const dataIndex = db.findIndex((data) => data.id === id);
  if (dataIndex !== -1) {
    db[dataIndex] = { ...db[dataIndex], ...updatedData };
    res.json(db[dataIndex]);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

// Menghapus data
server.delete("/api/:id", (req, res) => {
  const id = req.params.id;

  const dataIndex = db.findIndex((data) => data.id === id);
  if (dataIndex !== -1) {
    const deletedData = db[dataIndex];
    db.splice(dataIndex, 1);
    res.json(deletedData);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = server;
