const serializer = (data) => {
    if (data && data[0] && data[0].hasOwnProperty('geometry')) {
        return data.map(x => {
            const obj = x.attributes
            obj.geometry = x.geometry.rings
            return obj
        })
    }
    try {
        return data.map(x => {
            return x.attributes
        })
    } catch (e) {
        return data
    }
}

export default serializer