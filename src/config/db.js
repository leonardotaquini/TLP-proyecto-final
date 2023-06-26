import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

//Permite leer las variables de entorno
dotenv.config();

//Instancia de Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    });

    //Funcion para conectarme a la base de datos.

    const connectDB = async () => {
        try {
            await sequelize.sync({ force: true });
            console.log("Conexión exitosa");
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    export { connectDB, sequelize, DataTypes };