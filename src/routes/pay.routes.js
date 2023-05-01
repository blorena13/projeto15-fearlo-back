import { Router } from "express";
import { payment } from "../controllers/pay.controllers.js";

const payRouter = Router();

payRouter.post("/payment", payment);

export default payRouter;