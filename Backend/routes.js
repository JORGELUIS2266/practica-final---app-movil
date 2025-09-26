const express = require("express");
const router = express.Router();
const db = require("./db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configuración de multer para guardar las imágenes en uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, unique);
  },
});
const upload = multer({ storage });

// --------------------- Rutas ---------------------

// Obtener todos los alumnos
router.get("/alumnos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM alumnos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear alumno con imagen opcional
router.post("/alumnos", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, email, numControl, telefono, semestre, carrera } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.query(
      "INSERT INTO alumnos (nombre, email, numControl, telefono, semestre, carrera, imagen) VALUES (?,?,?,?,?,?,?)",
      [nombre, email, numControl, telefono, semestre, carrera, imagen]
    );

    res.json({ id: result.insertId, imagen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar alumno (posible nueva imagen)
router.put("/alumnos/:id", upload.single("imagen"), async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, numControl, telefono, semestre, carrera } = req.body;

    // Obtener alumno actual para borrar imagen anterior si se sube nueva
    const [rows] = await db.query("SELECT imagen FROM alumnos WHERE id = ?", [id]);
    const current = rows[0];

    let imagen = current ? current.imagen : null;
    if (req.file) {
      // borrar imagen vieja si existe
      if (imagen) {
        const oldPath = path.join(__dirname, imagen);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      imagen = `/uploads/${req.file.filename}`;
    }

    await db.query(
      "UPDATE alumnos SET nombre=?, email=?, numControl=?, telefono=?, semestre=?, carrera=?, imagen=? WHERE id=?",
      [nombre, email, numControl, telefono, semestre, carrera, imagen, id]
    );

    res.json({ message: "Alumno actualizado", imagen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar alumno y su imagen si existe
router.delete("/alumnos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT imagen FROM alumnos WHERE id = ?", [id]);
    const current = rows[0];

    if (current && current.imagen) {
      const imgPath = path.join(__dirname, current.imagen);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await db.query("DELETE FROM alumnos WHERE id=?", [id]);
    res.json({ message: "Alumno eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
