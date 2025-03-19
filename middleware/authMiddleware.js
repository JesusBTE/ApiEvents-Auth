const jwt = require("jsonwebtoken");

const SECRET_KEY = "JIBE";

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
