const serializer = (data) => {
    try {
        return data.map(x => {
            return x.attributes
        })
    } catch (e) {
        return data
    }
}

export default serializer