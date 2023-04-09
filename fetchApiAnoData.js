import fetch from 'node-fetch'

const fetchApiAnoData = async (fieldsToFetch) => {
    const dataFormat = 'geojson'
    const returnCountOnly = false
    const fields = fieldsToFetch.join('%2C')
    const recordCount = 1000

    let globalDataBody = []
    let lastRecordCount = 1000
    let i = 0

    let firstObjectId = await findFirstObjectIdInDatabase()
    let lastObjectId = -1

    if (firstObjectId === -1) {
        console.warn('Could not fetch data from arcgis06 server')
        return []
    }
    console.log('FIRST OBJECT ID: ' + firstObjectId)


    while(lastRecordCount === 1000) {
        console.log('LAST OBJECT ID FROM MOST RECENT DATASET: ', lastObjectId)
        const whereClause = lastObjectId === -1 ? `OBJECTID>=${firstObjectId}` : `OBJECTID>${lastObjectId}`
        i++
        const outputSpatialReference = '4326'
        const orderBy = 'OBJECTID'
        const queryParams =
            'where=' +
            whereClause +
            '&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=' +
            fields +
            '&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=' +
            outputSpatialReference +
            '&havingClause=&returnIdsOnly=false&returnCountOnly=' +
            returnCountOnly +
            '&orderByFields=' +
            orderBy +
            '&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=' +
            recordCount +
            '&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=' +
            dataFormat
        // where=1%3D1
        // const fields = '*'
        // =pjson
        const url =
            'https://arcgis06.miljodirektoratet.no/arcgis/rest/services/naturovervaking/ano/MapServer/0/query?' +
            queryParams
    
        const response = await fetch(url, {
            method: 'GET',
        })
        if (response.ok) {
            const body = await response.json()
            lastRecordCount = body.features.length
            lastObjectId = await getLastObjectId(body.features)
            console.warn('last record count: ' + lastRecordCount)
            globalDataBody = [...globalDataBody, ...body.features]
        } else {
            console.warn('response not ok - request failed')
            console.warn(response)
            return {}
        }
    }
    return globalDataBody
}

const findFirstObjectIdInDatabase = async () => {
    const url = 'https://arcgis06.miljodirektoratet.no/arcgis/rest/services/naturovervaking/ano/MapServer/0/query?where=OBJECTID>0&outFields=OBJECTID&orderByFields=OBJECTID&resultRecordCount=1&f=geojson'
    const response = await fetch(url, {
        method: 'GET',
    })
    if (response.ok) {
        const body = await response.json()
        let firstObjectId = -1
        try {
            firstObjectId =  body.features[0].id
        } catch (err) {
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
        lastId = dataset[dataset.length - 1].id
    } catch (err) {
        console.error('could not get last object id due to ', err)
    }
    return lastId
}

export default fetchApiAnoData
