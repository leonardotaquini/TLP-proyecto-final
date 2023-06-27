import { sequelize, DataTypes } from "../config/db.js";
import Oficio from "./Oficio.model.js";
import ProfesionalOficio from "./ProfesionalOficio.model.js";
const Profesional = sequelize.define('Profesional', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provincia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    tableName: 'profesional',
    paranoid: true,
});

Profesional.belongsToMany(Oficio, { through: ProfesionalOficio, onDelete: 'CASCADE', hooks: true });
Oficio.belongsToMany(Profesional, { through: ProfesionalOficio , onDelete: 'CASCADE', hooks: true});

export default Profesional;