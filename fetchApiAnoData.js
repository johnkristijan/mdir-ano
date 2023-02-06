import fetch from 'node-fetch'

const fetchApiAnoData = async (fieldsToFetch) => {
    const dataFormat = 'geojson'
    const returnCountOnly = false
    const fields = fieldsToFetch.join('%2C')
    const recordCount = 1000

    let globalDataBody = []
    let lastRecordCount = 1000
    let i = 0
    // for (i of 999999999) {

    // }
    while(lastRecordCount === 1000) {
        const whereClause = i === 0 ? 'OBJECTID>0' : `OBJECTID>${i}000`
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

// only to be used if you want to get < 1000 records per API call (in database it is 8k+ records)
const fetchApiAnoDataMax1000 = async (fieldsToFetch, recordCount) => {
    const dataFormat = 'geojson'
    const returnCountOnly = false
    const fields = fieldsToFetch.join('%2C')
    const whereClause = '1%3D1'
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

    const url =
        'https://arcgis06.miljodirektoratet.no/arcgis/rest/services/naturovervaking/ano/MapServer/0/query?' +
        queryParams

    const response = await fetch(url, {
        method: 'GET',
    })
    if (response.ok) {
        const body = await response.json()
        return body.features
    } else {
        console.warn('response not ok - request failed')
        console.warn(response)
        return {}
    }
}

export default fetchApiAnoData
