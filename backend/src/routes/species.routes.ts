
import { Router } from 'express'
import { searchGbifSpecies } from '../services/gbif.service.js'

const router = Router()

router.get('/search', async (req, res) => {
  const name = req.query.name

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Informe o nome científico ou popular da espécie.',
    })
  }

  try {
    const result = await searchGbifSpecies(name.trim())

    return res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Erro ao consultar GBIF:', error)

    return res.status(502).json({
      success: false,
      message: 'Não foi possível consultar a base de dados do GBIF.',
    })
  }
})

export default router
