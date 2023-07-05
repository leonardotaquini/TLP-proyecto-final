import express from "express";
import { 
    listarProfesionales,
    obtenerProfesional,
    crearProfesional,
    actualizarProfesional,
    eliminarProfesional,
    restaurarProfesional,
    login  } from "../controllers/profesional.controller.js";
    
import { authMiddleware } from "../middlewares/auth.js";
const router = express.Router();



//Obtener todos los profesionales
router.get("/", listarProfesionales);
//Obtener un profesional por id
router.get("/:id", obtenerProfesional);
//Crear un profesional
router.post("/", crearProfesional);
//Restarurar un profesional
router.post("/restore/:id", authMiddleware, restaurarProfesional);
//Actualizar un profesional
router.put("/:id", authMiddleware, actualizarProfesional);
//Eliminar un profesional
router.delete("/:id", authMiddleware, eliminarProfesional);
//Login
router.post("/login", login);


export default router;