import fetchUtil from './fetchUtil.js'

// API proxy and serializer for ANO_Fremmedart layer
// ref.: https://arcgis06.miljodirektoratet.no/arcgis/rest/services/naturovervaking/ano/MapServer/12
// Name: ANO_Fremmedart
// MaxRecordCount: 1000
// Fields:
/*
    OBJECTID ( type: esriFieldTypeOID, alias: OBJECTID )
    art_navn ( type: esriFieldTypeString, alias: art_navn, length: 100 )
    art_norsk_navn ( type: esriFieldTypeString, alias: art_norsk_navn, length: 100 )
    Creator ( type: esriFieldTypeString, alias: Creator, length: 25 )
    CreationDate ( type: esriFieldTypeDate, alias: CreationDate, length: 8 )
    Editor ( type: esriFieldTypeString, alias: Editor, length: 25 )
    EditDate ( type: esriFieldTypeDate, alias: EditDate, length: 8 )
    GlobalID ( type: esriFieldTypeGlobalID, alias: GlobalID, length: 38 )
    ParentGlobalID ( type: esriFieldTypeGUID, alias: ParentGlobalID, length: 38 )
*/

const fetchFremmedart = async () => {
    const baseUrl =
        'https://arcgis06.miljodirektoratet.no/arcgis/rest/services/naturovervaking/ano/MapServer/12/query?'
    const queryParamsAfterWhereClause =
        '&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=OBJECTID&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson'
    return fetchUtil(baseUrl, queryParamsAfterWhereClause)
}

export default fetchFremmedart
