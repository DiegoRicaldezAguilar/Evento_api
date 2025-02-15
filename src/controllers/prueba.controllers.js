import {pool} from "../db.js"

export const getPrueba = async (req, res) => {

    try {
        const rows = await pool.request().query('SELECT * FROM Empresa');
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).send("Error al obtener datos");
    }
    
}