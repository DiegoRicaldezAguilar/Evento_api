import {pool} from "../db.js"
import sql from "mssql";
import QRCode from "qrcode";
import path from "path";
import fs from "fs";

export const getQR = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const rows = await pool.request()
                                .input("ticketId", sql.Int, ticketId)
                                .query('SELECT * FROM Ticket WHERE ticketId = @ticketId');

        // si existe el ticket
        if (rows.rowsAffected == 0) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }   

        const ticket = rows.recordset[0];

        // Si el ticket no está activo
        if (ticket.estado != 'A') {
            return res.status(400).json({ message: "El ticket no está activo" });
        }

        // Generar el QR con el ID del ticket
        const qrData = `http://localhost:4000/ticket/${ticketId}/use`;

        // Ruta temporal para guardar el archivo QR
        const qrFilePath = path.join(process.cwd(), `ticket_${ticketId}.png`);

        // Generar el QR y guardarlo como un archivo PNG
        await QRCode.toFile(qrFilePath, qrData);

        // Enviar el archivo como respuesta para descargar
        res.download(qrFilePath, `ticket_${ticketId}.png`, (err) => {
            if (err) {
                console.error("Error al enviar el archivo:", err);
                res.status(500).send("Error al descargar el QR");
            }

            // Eliminar el archivo temporal después de enviarlo
            fs.unlinkSync(qrFilePath);
        });
        
    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).send("Error al obtener datos");
    }
    
}

export const useQR = async (req, res) => {
    const { ticketId } = req.params;

    try {
        const rows = await pool.request()
                                .input("ticketId", sql.Int, ticketId)
                                .query("SELECT estado FROM Ticket WHERE ticketId = @ticketId");

        // Si existe el ticket
        if (rows.rowsAffected == 0) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }

        const ticket = rows.recordset[0];

        // Si el ticket no está activo
        if (ticket.estado != 'A') {
            return res.status(400).json({ message: "El ticket no está activo" });
        }

        // Desactivar el ticket (actualizar su estado)
        await pool.request()
                    .input("ticketId", sql.Int, ticketId)
                    .query("UPDATE Ticket SET estado = 'U' WHERE ticketId = @ticketId");

        // Devolver una respuesta de éxito
        res.json({ message: "Ticket usado correctamente" });
    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).send("Error al obtener datos");
    }
    
}