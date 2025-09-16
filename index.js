import express from 'express'
import connectDB from './config/db.js'
import { PORT } from './config/config.js'
import router from './routes/index.js'
import cors from 'cors'

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',  // your Vite dev server, adjust port if needed
  methods: ['GET', 'POST','PUT', 'DELETE', 'PATCH'], 
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
// rest of your route setup

app.use(express.urlencoded({ extended: true }))


connectDB()

app.use('/', router)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
