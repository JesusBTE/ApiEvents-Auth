const jwt = require("jsonwebtoken"); // Importamos jsonwebtoken para manejar autenticación con tokens

const SECRET_KEY = "JIBE"; // Clave secreta para verificar los tokens

// Middleware para autenticar tokens JWT en las solicitudes
exports.authenticateToken = (req, res, next) => {
  // Obtenemos el token del encabezado de la solicitud
  const token = req.header("Authorization");

  // Verificamos si el token no está presente
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" }); // Denegamos el acceso si no hay token
  }

  try {
    // Eliminamos el prefijo "Bearer " si está presente y verificamos el token con la clave secreta
    const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);

    // Agregamos la información del usuario al objeto de la solicitud para su uso en rutas protegidas
    req.user = verified;

    // Pasamos al siguiente middleware o controlador
    next();
  } catch (error) {
    // Si el token es inválido o ha expirado, retornamos un error
    res.status(401).json({ message: "Token inválido" });
  }
};
