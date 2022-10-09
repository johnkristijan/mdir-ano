import fetchUtil from './fetchUtil.js'

// API proxy and serializer for ANO_Flate layer
// ref.: https://arcgis06.miljodirektoratet.no/arcgis/rest/services/naturovervaking/ano/MapServer/1
// Name: ANO_Flate
// MaxRecordCount: 1000
// Fields:
/*
    ano_flate_id ( type: esriFieldTypeString, alias: ano_flate_id, length: 7 )
    ssb_id ( type: esriFieldTypeString, alias: ssb_id, length: 14 )
    OBJECTID ( type: esriFieldTypeOID, alias: OBJECTID )
    SHAPE ( type: esriFieldTypeGeometry, alias: SHAPE )
    SHAPE.STArea() ( type: esriFieldTypeDouble, alias: SHAPE.STArea() )
    SHAPE.STLength() ( type: esriFieldTypeDouble, alias: SHAPE.STLength() )
*/

const fetchFlater = async () => {
    const baseUrl =
        'https://arcgis06.miljodirektoratet.no/arcgis/rest/services/naturovervaking/ano/MapServer/1/query?'
    const queryParamsAfterWhereClause =
        '&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=OBJECTID&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson'
    return fetchUtil(baseUrl, queryParamsAfterWhereClause)
}

export default fetchFlater
