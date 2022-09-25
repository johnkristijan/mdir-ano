import fetch from 'node-fetch'

const fetchApiAnoData = async (fieldsToFetch, recordCount) => {
    const dataFormat = 'geojson'
    const returnCountOnly = false
    const fields = fieldsToFetch.join('%2C')
    const queryParams =
        'where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=' +
        fields +
        '&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=' +
        returnCountOnly +
        '&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=' +
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
