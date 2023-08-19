import { Router } from "express";
import eventsRouter from './eventsRouter.js'
import categoriesRouter from './categoriesRouter.js'

const indexRouter = Router()

indexRouter.use("/events", eventsRouter)
indexRouter.use("/categories", categoriesRouter)


export default indexRouter