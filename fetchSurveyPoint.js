import fetchApiAnoData from './fetchApiAnoData.js'
import hentFylkeFraLatLng from './polygonMethod.js'

// API proxy and serializer for ANO_SurveyPoint  layer
// ref.: https://arcgis06.miljodirektoratet.no/arcgis/rest/services/naturovervaking/ano/MapServer/0
// Name: ANO_SurveyPoint
// MaxRecordCount: 1000
// Fields:
/*
    GlobalID ( type: esriFieldTypeGlobalID, alias: GlobalID, length: 38 )
    registeringsdato ( type: esriFieldTypeDate, alias: registeringsdato, length: 8 )
    klokkeslett_start ( type: esriFieldTypeString, alias: klokkeslett_start, length: 5 )
    ano_flate_id ( type: esriFieldTypeString, alias: ano_flate_id, length: 7 )
    ano_punkt_id ( type: esriFieldTypeString, alias: ano_punkt_id, length: 10 )
    ssb_id ( type: esriFieldTypeString, alias: ssb_id, length: 14 )
    program ( type: esriFieldTypeString, alias: program, length: 30 )
    instruks ( type: esriFieldTypeString, alias: instruks, length: 100 )
    aar ( type: esriFieldTypeSmallInteger, alias: aar )
    dataansvarlig_mdir ( type: esriFieldTypeString, alias: dataansvarlig_mdir, length: 50 )
    dataeier ( type: esriFieldTypeString, alias: dataeier, length: 50 )
    vaer ( type: esriFieldTypeString, alias: vaer, length: 60 )
    hovedoekosystem_punkt ( type: esriFieldTypeString, alias: hovedoekosystem_punkt, length: 50 )
    andel_hovedoekosystem_punkt ( type: esriFieldTypeDouble, alias: andel_hovedoekosystem_punkt )
    utilgjengelig_punkt ( type: esriFieldTypeString, alias: utilgjengelig_punkt, length: 4 )
    utilgjengelig_begrunnelse ( type: esriFieldTypeString, alias: utilgjengelig_begrunnelse, length: 200 )
    gps ( type: esriFieldTypeString, alias: gps, length: 100 )
    noeyaktighet ( type: esriFieldTypeString, alias: noeyaktighet, length: 20 )
    kommentar_posisjon ( type: esriFieldTypeString, alias: kommentar_posisjon, length: 300 )
    klokkeslett_karplanter_start ( type: esriFieldTypeString, alias: klokkeslett_karplanter_start, length: 5 )
    art_alle_registrert ( type: esriFieldTypeString, alias: art_alle_registrert, length: 2000 )
    karplanter_dekning ( type: esriFieldTypeDouble, alias: karplanter_dekning )
    klokkeslett_karplanter_slutt ( type: esriFieldTypeString, alias: klokkeslett_karplanter_slutt, length: 5 )
    karplanter_feltsjikt ( type: esriFieldTypeDouble, alias: karplanter_feltsjikt )
    moser_dekning ( type: esriFieldTypeDouble, alias: moser_dekning )
    torvmoser_dekning ( type: esriFieldTypeDouble, alias: torvmoser_dekning )
    lav_dekning ( type: esriFieldTypeDouble, alias: lav_dekning )
    stroe_dekning ( type: esriFieldTypeDouble, alias: stroe_dekning )
    jord_grus_stein_berg_dekning ( type: esriFieldTypeDouble, alias: jord_grus_stein_berg_dekning )
    stubber_kvister_dekning ( type: esriFieldTypeDouble, alias: stubber_kvister_dekning )
    alger_fjell_dekning ( type: esriFieldTypeDouble, alias: alger_fjell_dekning )
    kommentar_ruteanalyse ( type: esriFieldTypeString, alias: kommentar_ruteanalyse, length: 1000 )
    fastmerker ( type: esriFieldTypeString, alias: fastmerker, length: 4 )
    kommentar_fastmerker ( type: esriFieldTypeString, alias: kommentar_fastmerker, length: 300 )
    kartleggingsenhet_1m2 ( type: esriFieldTypeString, alias: kartleggingsenhet_1m2, length: 15 )
    hovedtype_1m2 ( type: esriFieldTypeString, alias: hovedtype_1m2, length: 100 )
    ke_beskrivelse_1m2 ( type: esriFieldTypeString, alias: ke_beskrivelse_1m2, length: 200 )
    kartleggingsenhet_250m2 ( type: esriFieldTypeString, alias: kartleggingsenhet_250m2, length: 15 )
    hovedtype_250m2 ( type: esriFieldTypeString, alias: hovedtype_250m2, length: 200 )
    ke_beskrivelse_250m2 ( type: esriFieldTypeString, alias: ke_beskrivelse_250m2, length: 200 )
    andel_kartleggingsenhet_250m2 ( type: esriFieldTypeDouble, alias: andel_kartleggingsenhet_250m2 )
    bv_7gr_gi ( type: esriFieldTypeString, alias: bv_7gr_gi, length: 15 )
    bv_7jb_ba ( type: esriFieldTypeString, alias: bv_7jb_ba, length: 15 )
    bv_7jb_bt ( type: esriFieldTypeString, alias: bv_7jb_bt, length: 15 )
    bv_7jb_si ( type: esriFieldTypeString, alias: bv_7jb_si, length: 15 )
    bv_7tk ( type: esriFieldTypeString, alias: bv_7tk, length: 15 )
    bv_7se ( type: esriFieldTypeString, alias: bv_7se, length: 15 )
    forekomst_ntyp ( type: esriFieldTypeString, alias: forekomst_ntyp, length: 4 )
    ntyp ( type: esriFieldTypeString, alias: ntyp, length: 30 )
    kommentar_naturtyperegistering ( type: esriFieldTypeString, alias: kommentar_naturtyperegistering, length: 375 )
    side_5_note ( type: esriFieldTypeString, alias: side_5_note, length: 255 )
    krypende_vier_dekning ( type: esriFieldTypeDouble, alias: krypende_vier_dekning )
    ikke_krypende_vier_dekning ( type: esriFieldTypeDouble, alias: ikke_krypende_vier_dekning )
    vedplanter_total_dekning ( type: esriFieldTypeDouble, alias: vedplanter_total_dekning )
    busker_dekning ( type: esriFieldTypeDouble, alias: busker_dekning )
    tresjikt_dekning ( type: esriFieldTypeDouble, alias: tresjikt_dekning )
    treslag_registrert ( type: esriFieldTypeString, alias: treslag_registrert, length: 500 )
    roesslyng_dekning ( type: esriFieldTypeDouble, alias: roesslyng_dekning )
    roesslyngblad ( type: esriFieldTypeString, alias: roesslyngblad, length: 255 )
    pa_dekning ( type: esriFieldTypeDouble, alias: pa_dekning )
    pa_note ( type: esriFieldTypeString, alias: pa_note, length: 200 )
    pa_registrert ( type: esriFieldTypeString, alias: pa_registrert, length: 500 )
    fa_total_dekning ( type: esriFieldTypeDouble, alias: fa_total_dekning )
    fa_registrert ( type: esriFieldTypeString, alias: fa_registrert, length: 500 )
    kommentar_250m2_flate ( type: esriFieldTypeString, alias: kommentar_250m2_flate, length: 500 )
    klokkeslett_slutt ( type: esriFieldTypeString, alias: klokkeslett_slutt, length: 6 )
    vedlegg_url ( type: esriFieldTypeString, alias: vedlegg_url, length: 200 )
    creator ( type: esriFieldTypeString, alias: creator, length: 25 )
    creationdate ( type: esriFieldTypeDate, alias: creationdate, length: 8 )
    editor ( type: esriFieldTypeString, alias: editor, length: 25 )
    editdate ( type: esriFieldTypeDate, alias: editdate, length: 8 )
    OBJECTID ( type: esriFieldTypeOID, alias: OBJECTID )
    SHAPE ( type: esriFieldTypeGeometry, alias: SHAPE )
*/

const fetchSurveyPoint = async (addFylke = false) => {
    const fieldsToFetch = [
        'OBJECTID',
        'GlobalID',
        'aar',
        'ano_flate_id',
        'ano_punkt_id',
        'busker_dekning',
        'bv_7gr_gi',
        'bv_7jb_ba',
        'bv_7jb_bt',
        'bv_7jb_si',
        'bv_7se',
        'bv_7tk',
        'creationdate',
        'fa_total_dekning',
        'forekomst_ntyp',
        'forekomst_ntyp',
        'hovedoekosystem_punkt',
        'hovedtype_1m2',
        'ikke_krypende_vier_dekning',
        'karplanter_dekning',
        'kartleggingsenhet_1m2',
        'ke_beskrivelse_1m2',
        'kommentar_250m2_flate',
        'kommentar_naturtyperegistering',
        'krypende_vier_dekning',
        'lav_dekning',
        'moser_dekning',
        'ntyp',
        'registeringsdato',
        'ssb_id',
        'stroe_dekning',
        'torvmoser_dekning',
        'tresjikt_dekning',
        'vaer',
        'vedplanter_total_dekning',
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

export default fetchSurveyPoint
