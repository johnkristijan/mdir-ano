import fetch from 'node-fetch'
import serializer from './serializer.js'

// fetch utility that fetches many times until all data is retrieved
// tailored to fit the arcgis server for ANO-data at miljødirektoratet

const fetchUtil = async (baseUrl, queryParamsAfterWhereClause) => {
    let data = []
    let lastRecordCount = 1000
    let i = 0
    while (lastRecordCount === 1000) {
        const whereClause = i === 0 ? 'OBJECTID>0' : `OBJECTID>${i}000`
        i++
        const queryParams = 'where=' + whereClause + queryParamsAfterWhereClause
        const url = baseUrl + queryParams
        const response = await fetch(url, { method: 'GET' })
        if (response.ok) {
            const body = await response.json()
            lastRecordCount = body.features.length
            console.warn('last record count: ' + lastRecordCount)
            data = [...data, ...body.features]
        } else {
            console.warn('response not ok - request failed')
            console.warn(response)
            return {}
        }
    }
    return serializer(data)
}

export default fetchUtil
