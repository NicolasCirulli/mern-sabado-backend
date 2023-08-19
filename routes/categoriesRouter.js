import { Router } from "express";
import { getCategories, createCategory } from '../controllers/categoryControllers.js'
const categoriesRouter = Router()

categoriesRouter.get( "/", getCategories)
categoriesRouter.post( "/", createCategory)


export default categoriesRouter