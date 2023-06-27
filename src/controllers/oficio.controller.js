import Oficio from "../models/Oficio.model.js";

const listarOficios = async (req, res) => {
    try {
        const oficios = await Oficio.findAll();
        res.status(200).json(oficios);
    } catch (error) {
        res.status(500).json({error: error.message || 'Error en el servidor'});
        console.log(error);
    }
}

const obtenerOficio = async (req, res) => {
    try {
        const oficio = await Oficio.findByPk(req.params.id);
        res.status(200).json(oficio);
    } catch (error) {
        res.status(500).json({error: error.message || 'Error en el servidor'});
        console.log(error);
    }
}

const crearOficio = async (req, res) => {

    try {
        const oficio = await Oficio.create(req.body);
        res.json(oficio);
    } catch (error) {
        res.status(500).json({error: error.message || 'Error en el servidor'});
        console.log(error);
    }
}

const actualizarOficio = async (req, res) => {
    try {
        await Oficio.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ message: 'Oficio actualizado' });
    } catch (error) {
        res.status(500).json({error: error.message || 'Error en el servidor'});
        console.log(error);
    }
}

const eliminarOficio = async (req, res) => {
    try {
        await Oficio.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: 'Oficio eliminado' });
    } catch (error) {
        res.status(500).json({error: error.message || 'Error en el servidor'});
        console.log(error);
    }
}

export {
    listarOficios,
    obtenerOficio,
    crearOficio,
    actualizarOficio,
    eliminarOficio
}