import express from "express";
import { listarProfesionales, obtenerProfesional, crearProfesional, actualizarProfesional, eliminarProfesional  } from "../controllers/profesional.controller.js";
const router = express.Router();



//Obtener todos los profesionales
router.get("/", listarProfesionales);
//Obtener un profesional por id
router.get("/", obtenerProfesional);
//Crear un profesional
router.post("/", crearProfesional);
//Actualizar un profesional
router.put("/", actualizarProfesional);
//Eliminar un profesional
router.delete("/", eliminarProfesional);

export default router;