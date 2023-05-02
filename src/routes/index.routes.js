import { Router } from "express";
import authRouter from "./auth.routes.js";
import payRouter from "./pay.routes.js";
import productsRouter from "./product.routes.js";

const router = Router();
router.use(authRouter);
router.use(payRouter);
router.use(productsRouter);

export default router;
