import express from 'express'

import fetchSurveyPoint from './fetchSurveyPoint.js'
import fetchFlater from './fetchFlater.js'
import fetchArt from './fetchArt.js'
import fetchFremmedart from './fetchFremmedart.js'
import fetchProblemart from './fetchProblemart.js'
import fetchTreslag from './fetchTreslag.js'

const app = express()
const port = 1337

// Root - Server health check API
app.get('/', (req, res) => {
    res.send('Server is running - v1.0.0')
})

// API Layer - ANO_SurveyPoint
app.get('/v1/ano', async (req, res) => {
    const anoData = await fetchSurveyPoint()
    res.send(anoData) // 8974 rows
})
app.get('/v2/ano', async (req, res) => {
    // v2 har også med fylkenavn
    const anoData = await fetchSurveyPoint(true)
    res.send(anoData) // 8974 rows
})

// API Layer - ANO_Flate
app.get('/v1/flater', async (req, res) => {
    const data = await fetchFlater()
    res.send(data) // 1248 rows
})

// API Layer - ANO_Art
app.get('/v1/art', async (req, res) => {
    const data = await fetchArt()
    res.send(data) // 46315 rows
})

// API Layer - ANO_Fremmedart
app.get('/v1/fremmedart', async (req, res) => {
    const data = await fetchFremmedart()
    res.send(data) // 152 rows
})

// API Layer - ANO_Problemart
app.get('/v1/problemart', async (req, res) => {
    const data = await fetchProblemart()
    res.send(data) // 282 rows
})

// API Layer - ANO_Treslag
app.get('/v1/treslag', async (req, res) => {
    const data = await fetchTreslag()
    res.send(data) // 8836 rows
})

// server startup method
app.listen(port, () => {
    console.info(`ANO transport proxy started - now listening on port ${port}`)
})
