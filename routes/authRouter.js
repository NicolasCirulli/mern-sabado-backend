import { Router } from "express";
import { signIn, signUp, signInToken } from '../controllers/authControllers.js'
import passport from "../middlewares/passport.js";

const authRouter = Router()

authRouter.post( "/signup", signUp)
authRouter.post( "/signin", signIn)

authRouter.post( '/signin/token', passport.authenticate( 'jwt', {session: false} ), signInToken )

export default authRouter