import { Router } from "express";
import { NewsController } from "../controllers/news.controller";
import {isAuthenticate} from "../middlewares/auth.middleware";

const router = Router()

router.get('/list', isAuthenticate, NewsController.getAll )
router.post('/create', NewsController.createNew )

export default router