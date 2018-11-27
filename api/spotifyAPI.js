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
            callback(JSON.parse(body).access_token);
        });

    },

    searchArtists: function (bandName, callback) {
        this.getAccessToken(process.env.SPOTIFY_ID, process.env.SPOTIFY_SECRET, token => {
            const spotify = new Spotify();
            spotify.setAccessToken(token);

            spotify.searchArtists(bandName)
                .then(data => {
                    let artists = [];
                    data = data.body.artists.items;
                    data.forEach(artist => {
                        let images = [];
                        artist.images.forEach(image => {
                            images.push(image.url);
                        })

                        artists.push({
                            id: artist.id,
                            name: artist.name,
                            image: images[0],
                            genres: artist.genres,
                            page: artist.external_urls.spotify,
                            hasImage: images[0] === undefined ? false : true,
                            totalFollowers: artist.followers.total
                        });
                    })
                    callback(artists);
                })
        })
    },

    getTopTracks: function (id, callback) {
        this.getAccessToken(process.env.SPOTIFY_ID, process.env.SPOTIFY_SECRET, token => {
            const spotify = new Spotify();
            spotify.setAccessToken(token);

            spotify.getArtistTopTracks(id, 'US')
                .then(data => {
                    let tracks = [];

                    data.body.tracks.forEach(track => {
                        tracks.push({
                            name: track.name,
                            popularity: track.popularity,
                            preview: track.preview_url

                        })
                    })
                    callback(tracks);
                })
        })
    }

}

module.exports = spotify;

