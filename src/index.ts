import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, json } from 'express'
import router from './routes'
import { supabaseClient } from './services'
import path from 'path'
dotenv.config()
const app: Express = express()
const PORT = process.env.PORT || 8000

const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')

const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use(json())
app.use(cors())
supabaseClient.getInstance();
app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.static(__dirname));
app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})