const express = require("express");
const app = express();
const db = require("./data/db.json"); // diasumsikan db.json berada dalam direktori 'data'

app.use(express.json());

// Mendapatkan data
app.get("/api", (req, res) => {
  res.json(db);
});

// Menambahkan data
app.post("/api", (req, res) => {
  const newData = req.body;
  db.push(newData);
  res.status(201).json(newData);
});

// Memperbarui data
app.put("/api/:id", (req, res) => {
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
app.delete("/api/:id", (req, res) => {
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

module.exports = app;
