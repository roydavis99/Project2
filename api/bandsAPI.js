require('dotenv').config();
let Request = require('request');

let Bands = {

    getRouteData: function (bandName, callback) {
        let url = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + process.env.BANDS_IN_TOWN;
        Request(url, (error, response, body) => {
            if (error) {
                console.log(error);
                return;
            }
            let shows = [];
            body = JSON.parse(body);
            for (show in body) {
                const data = body[show].venue;
                if (data.name !== undefined && data.latitude !== undefined && data.longitude !== undefined && data.country === 'United States') {

                    shows.push({
                        lat: parseFloat(data.latitude),
                        lng: parseFloat(data.longitude),
                        title: data.name,
                        cityState: `${data.city}, ${data.region}`,
                        location: `${data.name} ${data.city}, ${data.region}`
                    })
                }
            }


            if (shows.length > 0) {
                callback({
                    origin: shows.splice(0, 1)[0],
                    destination: shows.splice(shows.length - 1, 1)[0],
                    shows: shows
                })
            }

            else{
                callback(false);
            }
        })
    }
}

module.exports = Bands; 