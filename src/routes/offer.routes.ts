import { Router } from "express";
import { offerValidation, rateValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { OfferController } from "../controllers/offer.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/isAdmin.middleware";

const router = Router();

// API REST FULL

router.post('/game-offers/new', isAuthenticate, isAdmin, offerValidation, ValidationMiddleware, OfferController.create);

router.get('/', isAuthenticate, OfferController.getAll);

router.get('/:id', isAuthenticate, OfferController.getById);

router.delete('/:id', isAuthenticate, isAdmin, OfferController.delete);

router.put('/:id', isAuthenticate, isAdmin, offerValidation, ValidationMiddleware, OfferController.update);

router.post('/:id/rate/', isAuthenticate, rateValidation, OfferController.rate);

router.get('/:id/rate/', isAuthenticate, OfferController.getRate);

router.get('/:id/myRate/', isAuthenticate, OfferController.getMyRate);

export default router;
