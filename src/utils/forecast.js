const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c0c32c8a78406dd4da12f9e6a62fd68f&query=' + lat +',' + lon;

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is curenntly ' + body.current.temperature + ' degress now. And it feels like ' + body.current.feelslike + ' degress out! The humidity is ' + body.current.humidity + '%');
        }
    })
}

module.exports = forecast;