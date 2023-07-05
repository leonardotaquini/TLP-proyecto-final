import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ message: "No se ha enviado el token" });
        return;
    }
    // const token = authorization.split(" ")[1];
    const token = authorization;
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({ message: "El token no es válido" });
            return;
        }
        req.userId = decoded.id;
        next();
    });
}