const express = require("express"); // Importamos Express

const router = express.Router(); // Creamos un enrutador de Express
const authController = require("../controllers/authController"); // Importamos el controlador de autenticación

// Ruta para registrar un nuevo usuario
router.post("/register", authController.register);

// Ruta para iniciar sesión y obtener un token
router.post("/login", authController.login);

module.exports = router; // Exportamos el enrutador para su uso en la aplicación
