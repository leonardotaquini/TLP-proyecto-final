import express from "express";
import { listarProfesionales, obtenerProfesional, crearProfesional, actualizarProfesional, eliminarProfesional, restaurarProfesional  } from "../controllers/profesional.controller.js";
const router = express.Router();



//Obtener todos los profesionales
router.get("/", listarProfesionales);
//Obtener un profesional por id
router.get("/:id", obtenerProfesional);
//Crear un profesional
router.post("/", crearProfesional);
//Restarurar un profesional
router.post("/restore/:id", restaurarProfesional);
//Actualizar un profesional
router.put("/:id", actualizarProfesional);
//Eliminar un profesional
router.delete("/:id", eliminarProfesional);

export default router;