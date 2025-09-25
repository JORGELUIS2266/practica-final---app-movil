const express = require("express");
const router = express.Router();
const db = require("./db");

// Obtener todos los alumnos
router.get("/alumnos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM alumnos"); // aquí está bien
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear alumno
router.post("/alumnos", async (req, res) => {
  try {
    const { nombre, email, numControl, telefono, semestre, carrera } = req.body;
    const [result] = await db.query(
      "INSERT INTO alumnos (nombre,email,numControl,telefono,semestre,carrera) VALUES (?,?,?,?,?,?)",
      [nombre, email, numControl, telefono, semestre, carrera]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar alumno
router.put("/alumnos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, numControl, telefono, semestre, carrera } = req.body;
    await db.query(
      "UPDATE alumnos SET nombre=?, email=?, numControl=?, telefono=?, semestre=?, carrera=? WHERE id=?",
      [nombre, email, numControl, telefono, semestre, carrera, id]
    );
    res.json({ message: "Alumno actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar alumno
router.delete("/alumnos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM alumnos WHERE id=?", [id]);
    res.json({ message: "Alumno eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
