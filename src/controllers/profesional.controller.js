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

const restaurarProfesional = async () =>{
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

export { listarProfesionales, obtenerProfesional, crearProfesional, actualizarProfesional, eliminarProfesional, restaurarProfesional };