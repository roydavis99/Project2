require('dotenv').config();


const Request = require('request');
const Spotify = require('spotify-web-api-node');

const spotify = {

    getAccessToken: function (id, secret, callback) {

        const key = new Buffer(`${id}:${secret}`).toString('base64');

        Request({
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            form: {
                grant_type: 'client_credentials'
            },
            headers: {
                Authorization: 'Basic ' + key
            }
        }, function (err, res, body) {
            console.log(body);
            callback(JSON.parse(body).access_token);
        });

    },

    getInfo: function(){}
}

module.exports = spotify;

