import { Router } from "express";
import eventsRouter from './eventsRouter.js'
import categoriesRouter from './categoriesRouter.js'
import authRouter from './authRouter.js'

const indexRouter = Router()

indexRouter.use("/events", eventsRouter)
indexRouter.use("/categories", categoriesRouter)
indexRouter.use("/auth", authRouter)


export default indexRouter