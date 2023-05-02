import { showCards } from "../controllers/product.controllers.js";
import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/", showCards);

export default productsRouter;