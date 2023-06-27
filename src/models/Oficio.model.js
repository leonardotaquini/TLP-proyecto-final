import { sequelize, DataTypes } from "../config/db.js";

const Oficio = sequelize.define('Oficio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        
    },
},
{
    tableName: 'oficio',
    paranoid: true,

});



export default Oficio;