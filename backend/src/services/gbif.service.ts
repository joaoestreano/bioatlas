
const GBIF_API = 'https://api.gbif.org/v1'

interface GbifSpeciesMatch {
  usageKey?: number
  scientificName?: string
  canonicalName?: string
  rank?: string
  status?: string
  confidence?: number
  matchType?: string
  kingdom?: string
  phylum?: string
  class?: string
  order?: string
  family?: string
  genus?: string
  species?: string
}

export async function searchGbifSpecies(name: string) {
  const params = new URLSearchParams({
    name,
    strict: 'false',
  })

  const response = await fetch(
    `${GBIF_API}/species/match?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error(`GBIF respondeu com HTTP ${response.status}`)
  }

  const data = (await response.json()) as GbifSpeciesMatch

  if (!data.usageKey || data.matchType === 'NONE') {
    return {
      matched: false,
      message: 'Nenhuma espécie correspondente foi encontrada.',
      taxon: null,
    }
  }

  return {
    matched: true,
    taxon: {
      gbifKey: data.usageKey,
      scientificName: data.scientificName ?? null,
      canonicalName: data.canonicalName ?? null,
      rank: data.rank ?? null,
      taxonomicStatus: data.status ?? null,
      confidence: data.confidence ?? null,
      matchType: data.matchType ?? null,
      taxonomy: {
        kingdom: data.kingdom ?? null,
        phylum: data.phylum ?? null,
        class: data.class ?? null,
        order: data.order ?? null,
        family: data.family ?? null,
        genus: data.genus ?? null,
        species: data.species ?? null,
      },
      source: 'GBIF',
    },
  }
}
