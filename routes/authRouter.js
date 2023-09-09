import { Router } from "express";
import { signIn, signUp} from '../controllers/authControllers.js'
import { signUpValidator } from '../middlewares/signUpValidator.js'
const authRouter = Router()

authRouter.get( "/", signIn)
authRouter.post( "/", signUpValidator, signUp)

export default authRouter