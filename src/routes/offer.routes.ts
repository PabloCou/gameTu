import { Router } from "express";
import { offerValidation, rateValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { OfferController } from "../controllers/offer.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/isAdmin.middleware";

const router = Router();

// API REST FULL

// Ruta para crear una oferta
router.post('/game-offers/new', isAuthenticate, isAdmin, offerValidation, ValidationMiddleware, OfferController.create);

// Ruta para obtener todas las ofertas
router.get('/', isAuthenticate, OfferController.getAll);

// Ruta para obtener una oferta por ID
router.get('/:id', isAuthenticate, OfferController.getById);

// Ruta para eliminar una oferta
router.delete('/:id', isAuthenticate, isAdmin, OfferController.delete);

// Ruta para actualizar una oferta
router.put('/:id', isAuthenticate, isAdmin, offerValidation, ValidationMiddleware, OfferController.update);

// Ruta para calificar una oferta
router.post('/:id/rate/', isAuthenticate, rateValidation, OfferController.rate);

// Ruta para obtener la calificación total de una oferta
router.get('/:id/rate/', isAuthenticate, OfferController.getRate);

// Ruta para obtener la calificación específica de un usuario para una oferta
router.get('/:id/myRate/', isAuthenticate, OfferController.getMyRate);

export default router;
