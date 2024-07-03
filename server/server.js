const express = require("express");
const cors = require("cors");
const pool = require("./database");
const app = express();

// Consultas SQL
// const getAllUsuariosQuery = 'SELECT * FROM accounts';
const getIframeBySubQuery = 'SELECT iframe FROM accounts WHERE sub = $1';
const insertUserQuery = 'INSERT INTO accounts (username, sub) VALUES ($1, $2) RETURNING user_id';
const getUserBySubQuery = 'SELECT * FROM accounts WHERE sub = $1'; // Definir la consulta para obtener un usuario por 'sub'

// Middleware
app.use(express.json());
app.use(cors());

// Ruta para obtener todos los usuarios
// app.get("/adduser", async (req, res) => {
//     try {
//         const usuarios = await pool.query(getAllUsuariosQuery);
//         console.log('Consulta exitosa. Resultados:', usuarios);
//         console.log('Usuarios:', usuarios.rows);
//         res.json(usuarios.rows);
//     } catch (err) {
//         console.error('Error al obtener usuarios:', err);
//         res.status(500).send('Error al obtener usuarios');
//     }
// });

// Ruta para obtener el iframe basado en el sub del usuario
app.get("/iframe/:sub", async (req, res) => {
    const { sub } = req.params;
    try {
        const result = await pool.query(getIframeBySubQuery, [sub]);

        if (result.rows.length > 0) {
            res.json({ iframe: result.rows[0].iframe });
        } else {
            res.status(404).json({ message: 'No se encontró el usuario para el sub proporcionado' });
        }
    } catch (err) {
        console.error('Error al obtener iframe:', err);
        res.status(500).send('Error al obtener iframe');
    }
});

// Ruta para insertar un nuevo usuario
app.post("/adduser", async (req, res) => {
    const { username, sub } = req.body; // El cliente envía 'name' y 'sub'

    try {
        // 1. Verificar si el 'sub' ya existe
        const existingUserResult = await pool.query(getUserBySubQuery, [sub]);

        if (existingUserResult.rows.length > 0) {
            // Si el 'sub' ya existe, no hacemos nada.
            res.status(409).json({ message: 'El sub ya existe. No se puede insertar el usuario.' });
        } else {
            // 2. Si no existe, insertar el nuevo usuario
            const result = await pool.query(insertUserQuery, [username, sub]); // Mapeamos 'name' a 'username'

            const newUserId = result.rows[0].user_id; // Obtener el 'user_id' del nuevo usuario

            res.status(201).json({ message: 'Usuario creado exitosamente', user_id: newUserId });
        }
    } catch (err) {
        console.error('Error al manejar el usuario:', err);
        res.status(500).send('Error al manejar el usuario');
    }
});

app.listen(3002, () => console.log("Servidor funcionando en el puerto: http://localhost:3002"));

