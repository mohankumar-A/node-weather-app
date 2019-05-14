const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&limit=1`;

    request({url, json: true}, function(error, {body}){

        if(error){
            return callback("Unable to connect to geomap services!");
        }
    
        const data = body.features;
    
        if(data.length === 0) {
            return callback("Unable to find that location. Try another search.");
        }
        
        const resdata = {
            longitude: data[0].center[0],
            latitude: data[0].center[1],
            location: data[0].place_name
        }

        callback(undefined, resdata);
    
    });

}

module.exports = geocode