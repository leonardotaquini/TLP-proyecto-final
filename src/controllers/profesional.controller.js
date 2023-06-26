const listarProfesionales = async (req, res) => {
    res.json({ message: "Listar profesionales" });
};

const obtenerProfesional = async (req, res) => {
    res.json({ message: "Obtener profesional" });
}

const crearProfesional = async (req, res) => {
    res.json({ message: "Crear profesional" });
}

const actualizarProfesional = async (req, res) => {
    res.json({ message: "Actualizar profesional" });
}

const eliminarProfesional = async (req, res) => {
    res.json({ message: "Eliminar profesional" });
}

export { listarProfesionales, obtenerProfesional, crearProfesional, actualizarProfesional, eliminarProfesional };