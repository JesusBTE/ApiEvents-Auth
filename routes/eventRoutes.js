// Importamos Express y creamos un router
const express = require("express");
const router = express.Router();

// Importamos el controlador de eventos
const eventController = require("../controllers/eventController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Definimos las rutas para gestionar las eventos

// Obtener todas las eventos
router.get("/", authenticateToken, authenticateToken, eventController.getEvents);

// Obtener una evento por su ID
router.get("/:id", authenticateToken, authenticateToken, eventController.getEventById);

// Crear una nueva evento
router.post("/", authenticateToken, authenticateToken, eventController.createEvent);

// Actualizar una evento por su ID
router.put("/:id", authenticateToken, authenticateToken, eventController.updateEvent);

// Eliminar una evento por su ID
router.delete("/:id", authenticateToken, authenticateToken, eventController.deleteEvent);

router.post(
  "/:id/recordatorio",
  authenticateToken,
  eventController.notification
);

router.patch(
  "/:id/confirmar/:email",
  authenticateToken,
  eventController.confirmAttendance
);

// Exportamos el router para que pueda ser utilizado en la aplicación principal
module.exports = router;
