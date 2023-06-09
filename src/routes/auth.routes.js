import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { logout, signIn, signUp } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signUp", validateSchema(signUpSchema), signUp);
authRouter.post("/login", validateSchema(signInSchema), signIn);
authRouter.post("/logout",  logout);

export default authRouter;
