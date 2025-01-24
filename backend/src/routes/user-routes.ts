import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignUp,
} from "../controllers/user-controllers.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignUp);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/auth-status",verifyToken, userLogin)

export default userRouter;
