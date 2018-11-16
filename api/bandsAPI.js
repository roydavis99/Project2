require('dotenv').config();
const Request = require('request');

const Bands = {

    getLatLng: function(bandName, callback){
        const url = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + process.env.BANDS_IN_TOWN;
        Request(url, (error, response, body) => {
            if(error){
                console.log(error);
                return;
            }
            let shows = [];

            body = JSON.parse(body);
            for(show in body){
                console.log(body[show].venue.latitude);
                shows.push({
                    lat: body[show].venue.latitude,
                    lng: body[show].venue.longitude,
                    title: body[show].venue.name
                })
            }

            callback(shows)
        })
    }
}

module.exports = Bands; 