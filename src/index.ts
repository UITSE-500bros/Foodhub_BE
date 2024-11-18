import express, { Express, Request, Response, json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoService from './services/mongo.service'
import router from './routes'
const app: Express = express()
const PORT = process.env.PORT || 8000;

dotenv.config()
app.use(json())
app.use(cors())

mongoService.connectToDatabase();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
