import { Router } from "express";
import { signIn, signUp, signInToken } from '../controllers/authControllers.js'
import passport from "../middlewares/passport.js";
import { signUpValidator } from "../middlewares/validator/signUpValidator.js";
const authRouter = Router()

authRouter.post( "/signup", signUpValidator, signUp)
authRouter.post( "/signin", signIn)

authRouter.post( '/signin/token', passport.authenticate( 'jwt', {session: false} ), signInToken )

export default authRouter