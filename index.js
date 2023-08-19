import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import './config/database.js'
import indexRouter from './routes/indexRouter..js'
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())


app.get("/", (_, response) => { response.send('Workshops sabados') })
app.use("/api/", indexRouter)

app.listen(process.env.PORT, () => console.log('Servidor escuchando en el puerto ' + process.env.PORT))