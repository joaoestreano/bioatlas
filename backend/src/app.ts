
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(express.json())

app.get('/api/health', (_req, res) => {
  return res.status(200).json({
    success: true,
    message: 'BioAtlas API funcionando!',
    timestamp: new Date().toISOString()
  })
})

export default app
