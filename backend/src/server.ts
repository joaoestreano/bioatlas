
import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, () => {
  console.log(`BioAtlas API executando na porta ${PORT}`)
  console.log(`http://localhost:${PORT}/api/health`)
})
