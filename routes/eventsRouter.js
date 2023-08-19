import { Router } from "express";
import { getEvents, getEvent, createEvent, createEvents } from '../controllers/eventsControllers.js'
const eventRouter = Router()

eventRouter.get( "/", getEvents)
eventRouter.post( "/", createEvent)

eventRouter.get( "/:id", getEvent)
eventRouter.post( "/all", createEvents)



export default eventRouter