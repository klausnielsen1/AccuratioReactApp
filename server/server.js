const express = require("express");
const cors = require("cors");
const pool = require("./database");
const app = express();

// Consultas SQL
const getAllUsuariosQuery = 'SELECT * FROM accounts';
const getIframeBySubQuery = 'SELECT iframe FROM accounts WHERE sub = $1';

app.use(express.json());
app.use(cors());

// Ruta para obtener todos los usuarios
app.get("/adduser", async (req, res) => {
    try {
        // Ejecuta la consulta para obtener todos los usuarios
        const usuarios = await pool.query(getAllUsuariosQuery);
        
        // Loguea la respuesta completa
        console.log('Consulta exitosa. Resultados:', usuarios);

        // Loguea específicamente las filas (datos de los usuarios)
        console.log('Usuarios:', usuarios.rows);

        // Envía los datos de los usuarios en la respuesta
        res.json(usuarios.rows);
    } catch (err) {
        // Manejo de errores y logueo del error
        console.error('Error al obtener usuarios:', err);
        res.status(500).send('Error al obtener usuarios');
    }
});

// Nueva ruta para obtener el iframe basado en el sub del usuario
app.get("/iframe/:sub", async (req, res) => {
    const { sub } = req.params;
    try {
        // Ejecuta la consulta para obtener el iframe donde el sub coincide
        const result = await pool.query(getIframeBySubQuery, [sub]);

        if (result.rows.length > 0) {
            // Usuario encontrado, devuelve el iframe
            res.json({ iframe: result.rows[0].iframe });
        } else {
            // No se encontró el usuario
            res.status(404).json({ message: 'No se encontró el usuario para el sub proporcionado' });
        }
    } catch (err) {
        // Manejo de errores y logueo del error
        console.error('Error al obtener iframe:', err);
        res.status(500).send('Error al obtener iframe');
    }
});

app.listen(3002, () => console.log("Servidor funcionando en el puerto: http://localhost:3002"));


