import { Router } from "express";
import { getEvents, getEvent, createEvent, createEvents } from '../controllers/eventsControllers.js'
import { createEventValidator } from "../middlewares/createEventValidator.js";
import passport from "../middlewares/passport.js";
const eventRouter = Router()

eventRouter.get( "/", getEvents)
eventRouter.post( "/",passport.authenticate( 'jwt', {session: false} ), createEventValidator, createEvent)


eventRouter.get( "/:id", getEvent)
/* eventRouter.post( "/all", createEvents) */

export default eventRouter