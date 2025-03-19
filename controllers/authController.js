const { users } = require("../models/user"); // Importamos el arreglo de usuarios desde el modelo

const bcrypt = require("bcryptjs"); // Importamos bcrypt para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Importamos jsonwebtoken para manejar tokens JWT

const SECRET_KEY = "JIBE"; // Clave secreta para firmar los tokens

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  const { username, password } = req.body; // Extraemos los datos del cuerpo de la petición

  // Verificamos si el usuario ya existe en la lista de usuarios
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({
      message: "El usuario ya existe", // Retornamos un error si el usuario ya está registrado
    });
  }

  // Hasheamos la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creamos el nuevo usuario
  const newUser = {
    id: users.length + 1, // Generamos un ID incrementando el tamaño del array
    username: username,
    password: hashedPassword, // Guardamos la contraseña encriptada
  };

  users.push(newUser); // Agregamos el usuario a la lista

  res.status(201).json({
    message: "Usuario registrado correctamente", // Confirmamos el registro exitoso
  });
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  const { username, password } = req.body; // Extraemos los datos de la petición

  // Validamos que ambos campos sean proporcionados
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Se requieren usuario y contraseña" });
  }

  // Buscamos al usuario en la lista
  const user = users.find((u) => u.username === username);

  // Verificamos si el usuario existe y la contraseña es correcta
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  // Generamos un token JWT con el ID y nombre de usuario
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "72hrs" } // Establecemos la expiración del token
  );

  // Respondemos con el token generado
  res.status(200).json({ message: "Inicio de sesión exitoso", token });
};
