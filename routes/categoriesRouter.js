import { Router } from "express";
import passport from "../middlewares/passport.js";
import { getCategories, createCategory, getOneCategory } from '../controllers/categoryControllers.js'
import { createCategoryValidator } from "../middlewares/validator/createCategoryValidator.js";
const categoriesRouter = Router()

categoriesRouter.get( "/", getCategories)
categoriesRouter.get( '/:id', getOneCategory )
categoriesRouter.post( "/", passport.authenticate( 'jwt', {session: false} ), createCategoryValidator, createCategory)


export default categoriesRouter