import Oficio from "../models/Oficio.model.js";
import Profesional from "../models/Profesional.model.js";

const listarProfesionales = async (req, res) => {
    try {
        const profesionales = await Profesional.findAll({
            include: Oficio,
        });
        
           

        res.status(200).json(profesionales);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener los profesionales" });
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
        res.status(200).json(profesional);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al obtener el profesional" });
    }
}

const crearProfesional = async (req, res) => {
    try {
        const profesional = req.body;
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
    }
}

const actualizarProfesional = async (req, res) => {
    try {
        const { id } = req.params;
        const profesional = req.body;
        const profesionalActualizado = await Profesional.update(profesional, {
            where: {
                id: id,
            },
        });
        res.status(200).json(profesionalActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error al actualizar el profesional" });
    }
}

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

export { listarProfesionales, obtenerProfesional, crearProfesional, actualizarProfesional, eliminarProfesional };