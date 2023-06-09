var express = require("express");
var app = express();
const jwt = require("jsonwebtoken");
var cors = require("cors");
const db = require("./data/db.json");
const port = 4000;
const secretKey = "secret-key-asjkdfbnjassdjkfhnsdjhfsdjf";
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
app.post("/api/login", (req, res) => {
  // Di sini, Anda dapat melakukan otentikasi pengguna, seperti memeriksa kredensial yang diberikan

  // Contoh pemeriksaan sederhana
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    // Jika otentikasi berhasil, buat token JWT
    const token = generateAccessToken({ username });
    const refreshToken = jwt.sign({ username }, secretKey, {
      expiresIn: "50m",
    });

    res.json({ token, refreshToken });
  } else {
    // Jika otentikasi gagal
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Endpoint Refresh Token
app.post("/api/refresh-token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  jwt.verify(refreshToken, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const token = generateAccessToken({ username: user.username });
    res.json({ token });
  });
});

// Middleware untuk memeriksa keberadaan dan validitas token
function authenticateToken(req, res, next) {
  const token = req.headers;
  // if (token == null) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }

  // jwt.verify(token, secretKey, (err, decoded) => {
  //   if (err) {
  //     if (err.name === "TokenExpiredError") {
  //       return res.status(401).json({ error: "Token expired" });
  //     } else {
  //       return res.status(401).json({ error: "Invalid token" });
  //     }
  //   }

  //   // Token valid, lanjutkan eksekusi
  //   req.user = decoded;
  //   next();
  // });
}

function generateAccessToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: "10s" }); // Token berlaku selama 15 menit
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
