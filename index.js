import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import './config/database.js'
import indexRouter from './routes/indexRouter..js'
import {logger} from './middlewares/logger.js'
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.get("/", (_, response) => { response.send('Amazing Events API') })
app.use("/api/", indexRouter)

app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT))