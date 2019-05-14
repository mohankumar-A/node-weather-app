const request = require("request");

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/a0e5a8ee46e7500a82b176086a219013/${latitude},${longitude}`;

    request({ url, json: true}, (error, {body}) => {

        if(error) {
            return callback("Unable to connect to wheather service!");
        }

        if (body.error){
            return callback("Unable to find forecast for that location. Try another search!")
        }

        const {temperature, precipProbability, summary} = body.currently;
        callback(undefined, {temperature, precipProbability, summary });

    });
}

module.exports = forecast;