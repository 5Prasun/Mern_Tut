import {Router} from 'express';
import { RegisterUser } from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.route("/register").post(RegisterUser); 
export default userRouter;