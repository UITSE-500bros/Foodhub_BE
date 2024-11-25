import express, { Express, Request, Response, json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { mongoService } from './services'
import router from './routes'
const app: Express = express()
const PORT = process.env.PORT || 8000;

const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

dotenv.config()
app.use(json())
app.use(cors())

mongoService.connectToDatabase();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
