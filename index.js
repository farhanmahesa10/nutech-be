var express = require("express");
var app = express();
const jwt = require("jsonwebtoken");
var cors = require("cors");
const db = require("./data/db.json");
const port = 4000;
// ...
app.use(cors());
app.use(express.json());
// You may want to mount JSON Server on a specific end-point, for example /api/products
// Optiona,l except if you want to have JSON Server defaults
// app.use('/api/products', jsonapp.defaults());
function generateId() {
  const currentIds = db.map((data) => data.id);
  const maxId = Math.max(...currentIds);
  return maxId + 1;
}
app.get("/", (req, res) => {
  res.send(`"Hello World!"`);
});

// Menambahkan data
app.get("/api/products", (req, res) => {
  const { name, page, limit } = req.query;
  let results = db;

  // Pencarian berdasarkan nama
  if (name) {
    results = results.filter((data) =>
      data.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Urutan menurun berdasarkan ID
  results.sort((a, b) => b.id - a.id);

  // Paginasi
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedResults = results.slice(startIndex, endIndex);

  res.json({
    total: results.length,
    page: Number(page),
    limit: Number(limit),
    data: paginatedResults,
  });
});
app.post("/api/products", (req, res) => {
  const newData = req.body;
  const newId = generateId(); // Menghasilkan ID baru

  const dataWithId = {
    id: newId,
    ...newData,
  };

  db.push(dataWithId);
  res.status(201).json(dataWithId);
});
// Memperbarui data
app.put("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const dataIndex = db.findIndex((data) => data.id.toString() === id);
  if (dataIndex !== -1) {
    db[dataIndex] = { ...db[dataIndex], ...updatedData };
    res.json(db[dataIndex]);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

// Menghapus data
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;

  const dataIndex = db.findIndex((data) => data.id.toString() === id);
  if (dataIndex !== -1) {
    const deletedData = db[dataIndex];
    db.splice(dataIndex, 1);
    res.json(deletedData);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
