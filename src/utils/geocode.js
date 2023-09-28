const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.geoapify.com/v1/geocode/search?text='+ encodeURIComponent(address) + '&apiKey=2b36d4738bf74f139ce6817440b84cd7';
    request({ url, json: true }, ( error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to geocode service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].properties.city + ', ' + body.features[0].properties.state + ', ' + body.features[0].properties.country,
                lat: body.features[0].properties.lat, 
                lon: body.features[0].properties.lon 
            })
        }
    })

}

module.exports = geocode;