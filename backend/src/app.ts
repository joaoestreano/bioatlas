import { prisma } from './config/database.js'
import express from 'express'
import cors from 'cors'
import speciesRoutes from './routes/species.routes.js'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(express.json())

app.use('/api/species', speciesRoutes)

app.get('/api/health', (_req, res) => {
  return res.status(200).json({
    success: true,
    message: 'BioAtlas API funcionando!',
    timestamp: new Date().toISOString()
  })
})

app.get('/', (_req, res) => {
  return res.json({
    name: 'BioAtlas API',
    version: '1.0.0',
    message: 'API do BioAtlas funcionando!',
  })
})

app.get('/api/database/health', async (_req, res) => {
  try {
    const speciesCount = await prisma.species.count()

    return res.status(200).json({
      success: true,
      message: 'Banco de dados conectado!',
      database: 'PostgreSQL',
      speciesCount,
    })
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)

    return res.status(500).json({
      success: false,
      message: 'Não foi possível conectar ao banco de dados.',
    })
  }
})

export default app
