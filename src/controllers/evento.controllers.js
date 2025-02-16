import {pool} from "../db.js"

export const getEventos = async (req, res) => {

    try {
        const rows = await pool.request()
                                .query(`SELECT Ev.eventoId, Em.nombre AS Empresa, Ev.nombre AS Evento, Ev.descripcion, Ev.precioEntrada, Ev.tipo, Ev.fechaInicio, 
                                        Ev.fechaFin, Ev.aforo, Ev.promoInicio, Ev.promoFin, Ev.descuento, Img.link AS Imagen FROM Evento Ev 
                                        INNER JOIN Empresa Em ON Ev.empresaId = Em.empresaId
                                        LEFT JOIN Imagen Img ON Ev.eventoId = Img.eventoId`);

        if (rows.rowsAffected == 0) {
            return res.status(404).json({ message: "No se encontraron eventos" });
        }

        // Agrupar las imágenes por evento
        const eventos = {};
        rows.recordset.forEach((row) => {
            const eventoId = row.eventoId;

            // Si el evento no está en el objeto, lo agregamos
            if (!eventos[eventoId]) {
                eventos[eventoId] = {
                    eventoId: row.eventoId,
                    empresa: row.Empresa,
                    evento: row.Evento,
                    descripcion: row.descripcion,
                    precioEntrada: row.precioEntrada,
                    tipo: row.tipo,
                    fechaInicio: row.fechaInicio,
                    fechaFin: row.fechaFin,
                    aforo: row.aforo,
                    promoInicio: row.promoInicio,
                    promoFin: row.promoFin,
                    descuento: row.descuento,
                    imagenes: [], // Arreglo para almacenar las imágenes
                };
            }

            // Si hay una imagen, la agregamos al arreglo de imágenes del evento
            if (row.Imagen) {
                eventos[eventoId].imagenes.push(row.Imagen);
            }
        });

        // Convertir el objeto de eventos a un arreglo
        const eventosArray = Object.values(eventos);

        res.json(eventosArray);

    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).send("Error al obtener datos");
    }
    
}