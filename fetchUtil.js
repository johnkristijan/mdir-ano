import fetch from 'node-fetch'
import serializer from './serializer.js'

// fetch utility that fetches many times until all data is retrieved
// tailored to fit the arcgis server for ANO-data at miljødirektoratet

const fetchUtil = async (baseUrl, queryParamsAfterWhereClause) => {
    let data = []
    let lastRecordCount = 1000
    let i = 0

    let firstObjectId = await findFirstObjectIdInDatabase(baseUrl, queryParamsAfterWhereClause)
    let lastObjectId = -1

    if (firstObjectId === -1) {
        console.warn('Could not fetch data from arcgis06 server')
        return []
    }

    console.log('FIRST OBJECT ID: ' + firstObjectId)

    while (lastRecordCount === 1000) {
        console.log('LAST OBJECT ID FROM MOST RECENT DATASET: ', lastObjectId)
        const whereClause = lastObjectId === -1 ? `OBJECTID>=${firstObjectId}` : `OBJECTID>${lastObjectId}`
        i++
        const queryParams = 'where=' + whereClause + queryParamsAfterWhereClause
        const url = baseUrl + queryParams
        const response = await fetch(url, { method: 'GET' })
        if (response.ok) {
            const body = await response.json()
            lastRecordCount = body.features.length
            lastObjectId = await getLastObjectId(body.features)
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

const findFirstObjectIdInDatabase = async (baseUrl, queryParamsAfterWhereClause) => {
    const url = baseUrl + 'where=OBJECTID>0' + '&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=OBJECTID&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=1&featureEncoding=esriDefault&f=pjson'
    const response = await fetch(url, {
        method: 'GET',
    })
    if (response.ok) {
        const body = await response.json()
        let firstObjectId = -1
        try {
            firstObjectId =  body.features[0].attributes.OBJECTID
        } catch (err) {
            console.warn('findFirstObjectIdInDatabase error')
            console.error(err)
        }
        return firstObjectId
    } else {
        return -1
    }
}

const getLastObjectId = async (dataset) => {
    let lastId = -1
    try {
        lastId = dataset[dataset.length - 1].attributes.OBJECTID
    } catch (err) {
        console.error('could not get last object id due to ', err)
    }
    return lastId
}

export default fetchUtil
