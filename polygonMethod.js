import * as fylkeDataset from './fylker.json' assert { type: 'json' }

/**
 * Verify if point of coordinates (longitude, latitude) is polygon of coordinates
 * https://github.com/substack/point-in-polygon/blob/master/index.js
 * @param {number} latitude Latitude
 * @param {number} longitude Longitude
 * @param {array<[number,number]>} polygon Polygon contains arrays of points. One array have the following format: [latitude,longitude]
 */

function isPointInPolygon(latitude, longitude, polygon) {
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        throw new TypeError(
            'Invalid latitude or longitude. Numbers are expected'
        )
    } else if (!polygon || !Array.isArray(polygon)) {
        throw new TypeError('Invalid polygon. Array with locations expected')
    } else if (polygon.length === 0) {
        throw new TypeError('Invalid polygon. Non-empty Array expected')
    }

    const x = latitude
    const y = longitude

    let inside = false
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0]
        const yi = polygon[i][1]
        const xj = polygon[j][0]
        const yj = polygon[j][1]

        const intersect =
            yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
    }

    return inside
}

const findFylkeNavn = (fylke) => {
    try {
        const navneListe = fylke.properties.navn
        return navneListe.find((x) => x.sprak == 'nor').navn
    } catch (e) {
        return '-'
    }
}

const findFylkePolygon = (fylke) => {
    try {
        const geometry = fylke.geometry
        const firstPolygon = geometry.coordinates[0]
        const latLngChangePlace = firstPolygon.map((x) => {
            return [x[1], x[0]]
        })
        return latLngChangePlace
    } catch (e) {
        console.warn('WARN: fylkePolygon not found')
        return []
    }
}

const hentFylkeFraLatLng = (lat, lng) => {
    let match
    for (const fylke of fylkeDataset.default.features) {
        const polygon = findFylkePolygon(fylke)
        match = isPointInPolygon(lat, lng, polygon)
        if (match) {
            return findFylkeNavn(fylke)
        }
    }
    if (!match) return '-'
}

export default hentFylkeFraLatLng
