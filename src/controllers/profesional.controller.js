import { comparePassword, hashPassword } from "../helpers/bcrypt.js";
import Oficio from "../models/Oficio.model.js";
import Profesional from "../models/Profesional.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//Funciones de administrador

const listarProfesionales = async (req, res) => {
    try {
        const profesionales = await Profesional.findAll({
            include: Oficio,
        });
        res.status(200).json(profesionales);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener los profesionales" });
        console.log(error);
    }
};

const obtenerProfesional = async (req, res) => {
    try {
        const { id } = req.params;
        const profesional = await Profesional.findOne({
            where: {
                id: id,
            },
            include: Oficio,
        });
        if(!profesional){
            res.status(404).json({ message: "El profesional no existe" });
            return;
        }
        res.status(200).json(profesional);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener el profesional" });
    }
}

const crearProfesional = async (req, res) => {
    try {
        const profesional = req.body;
        const { password } = profesional;
        const passwordHashed = await hashPassword(password);
        profesional.password = passwordHashed;       
        const profesionalCreado = await Profesional.create(profesional);
        const oficioProfesional = await Oficio.findAll({
            where: {
                id: profesional.oficioId,
            },
        });
        profesionalCreado.addOficio(oficioProfesional);
        res.status(201).json(profesionalCreado);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al crear el profesional" });
        console.log(error)
    }
}

const actualizarProfesional = async (req, res) => {
    try {
      const { id } = req.params;
      const profesional = req.body;
  
      const [numFilasActualizadas] = await Profesional.update(profesional, {
        where: {
          id: id,
        },
      });
  
      if (numFilasActualizadas === 0) {
        // No se encontró el profesional con el ID especificado
        return res.status(404).json({ message: "Profesional no encontrado" });
      }
  
      const profesionalActualizado = await Profesional.findByPk(id);
      if (!profesionalActualizado) {
        // No se encontró el profesional actualizado
        return res.status(404).json({ message: "No se pudo obtener el profesional actualizado" });
      }
        
      res.status(200).json(profesionalActualizado);
    } catch (error) {
      res.status(500).json({ message: error.message || "Error al actualizar el profesional" });
    }
  };
  

const eliminarProfesional = async (req, res) => {
    try {
        const { id } = req.params;
        const profesionalEliminado = await Profesional.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json(profesionalEliminado);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al eliminar el profesional" });
    }
}

const restaurarProfesional = async (req, res) =>{
    try {
        await Profesional.restore({
            where: {
                id: req.params.id,
            },
        });
        res.json({ message: 'Profesional restaurado' });
    } catch (error) {
        res.status(500).json({error: error.message || 'Error en el servidor'});
        console.log(error);
    }
} 

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const profesional = await Profesional.findOne({
            where: {
                email: email,
            },
        });
        if (!profesional) {
            return res.status(404).json({ message: "El profesional no existe" });
        }
        
        const passwordValido = await comparePassword(password, profesional.dataValues.password);
        if (!passwordValido) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const payload = {
            id: profesional.id,
            email: profesional.email,
            nombre: profesional.nombre,
            apellido: profesional.apellido,
            telefono: profesional.telefono,
            direccion: profesional.direccion,
            oficioId: profesional.oficioId,
        }
        const token = jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 horas
        });
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al iniciar sesión" });
    }
}




export { listarProfesionales, obtenerProfesional, crearProfesional, actualizarProfesional, eliminarProfesional, restaurarProfesional, login };