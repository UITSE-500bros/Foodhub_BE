import express, { Express, Request, Response, json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectToDatabase } from './utils/mongodb'
const app: Express = express()
const PORT: number = 8000

dotenv.config()
app.use(json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  connectToDatabase();
  res.send('Hello World!')
})



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
