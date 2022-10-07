import fetchApiAnoData from './fetchApiAnoData.js'
import hentFylkeFraLatLng from './polygonMethod.js'
import express from 'express'
const app = express()
const port = 1337

const fetchAnoData = async (addFylke = false) => {
    const fieldsToFetch = [
        //   "GlobalID",
        'registeringsdato',
        'ano_flate_id',
        'ano_punkt_id',
        // 'ssb_id',
        'aar',
        'vaer',
        'hovedoekosystem_punkt',
        'karplanter_dekning',
        'moser_dekning',
        'torvmoser_dekning',
        'lav_dekning',
        'stroe_dekning',
        'kartleggingsenhet_1m2',
        'hovedtype_1m2',
        'ke_beskrivelse_1m2',
        'bv_7gr_gi',
        'bv_7jb_ba',
        'bv_7jb_bt',
        'bv_7jb_si',
        'bv_7tk',
        'bv_7se',
        'forekomst_ntyp',
        'kommentar_naturtyperegistering',
        'krypende_vier_dekning',
        'ikke_krypende_vier_dekning',
        'vedplanter_total_dekning',
        'busker_dekning',
        'tresjikt_dekning',
        'fa_total_dekning',
        'kommentar_250m2_flate',
        'creationdate',
        'OBJECTID',
        '',
    ]

    // deeply nested json data - not suitable for PowerBI
    const rawAnoData = await fetchApiAnoData(fieldsToFetch)

    // need data on this format - suitable for PowerBI
    const data = []
    for (const x of rawAnoData) {
        const longitude = x.geometry.coordinates[0]
        const latitude = x.geometry.coordinates[1]
        let obj
        if (addFylke) {
            obj = {
                lat: latitude,
                lng: longitude,
                geometryType: x.geometry.type,
                fylke: hentFylkeFraLatLng(latitude, longitude),
                ...x.properties,
            }
        } else {
            obj = {
                lat: latitude,
                lng: longitude,
                geometryType: x.geometry.type,
                ...x.properties,
            }
        }

        data.push(obj)
    }
    return data
}

app.get('/', (req, res) => {
    res.send('Server is running - v1.0.0')
})

app.get('/v1/ano', async (req, res) => {
    const anoData = await fetchAnoData()
    res.send(anoData)
})

app.get('/v2/ano', async (req, res) => {
    // v2 har også med fylkenavn
    const anoData = await fetchAnoData(true)
    res.send(anoData)
})

app.listen(port, () => {
    console.info(`ANO transport proxy started - now listening on port ${port}`)
})
