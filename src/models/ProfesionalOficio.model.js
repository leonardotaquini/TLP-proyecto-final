import { sequelize, DataTypes } from "../config/db.js";

const ProfesionalOficio = sequelize.define( "ProfesionalOficio",
  {},
  { paranoid: true, tableName: "profesional_oficio" }
);

export default ProfesionalOficio;
