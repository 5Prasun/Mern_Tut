import {Router} from 'express';
import { RegisterUser } from '../controllers/user.controllers.js';
import {upload} from '../middlewares/upload.middleware.js';
import { verify } from 'jsonwebtoken';


const userRouter = Router();

userRouter.route("/register").post(RegisterUser); 

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)


export default userRouter;