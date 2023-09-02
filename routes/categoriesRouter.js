import { Router } from "express";
import { getCategories, createCategory, getOneCategory } from '../controllers/categoryControllers.js'
const categoriesRouter = Router()

categoriesRouter.get( "/", getCategories)
categoriesRouter.post( "/", createCategory)
categoriesRouter.get( '/:id', getOneCategory )


export default categoriesRouter