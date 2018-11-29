
var db = require("../models");
var spotifyApi = require("../api/spotifyAPI");
var bandApi = require('../api/bandsAPI');
var Request = require('request');


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });


  app.post("/results", function (req, res) {
    let bandName = req.body.bandName;
    if (bandName === null || bandName === undefined || bandName.trim() === '') {
      res.render("index", { msg: "Please input a search term" });
      return;
    }

    spotifyApi.searchArtists(bandName, function (artists) {
      artists = BandSetup(artists, 0, res);
      console.log("here");
    });

  });

  function FixName(name) {
    name = name.replace('&', "");
    name = name.replace("/", "");
    name = name.replace("@", "");
    name = name.replace("#", "");
    name = name.replace("$", "");
    name = name.replace("%", "");
    name = name.replace("^", "");
    name = name.replace("*", "");
    name = name.replace("(", "");
    name = name.replace(")", "");
    name = name.replace("[", "");
    name = name.replace("{", "");
    name = name.replace("}", "");
    name = name.replace("]", "");
    name = name.replace("|", "");
    name = name.replace("\\", "");
    name = name.replace(":", "");
    name = name.replace(";", "");
    name = name.replace("?", "");
    name = name.replace("<", "");
    name = name.replace(">", "");
    name = name.replace("`", "");
    name = name.replace("~", "");
    return name;
  }

  function BandSetup(artists, count, resu) {
    console.log(count + " " + artists.length);
    if (count === artists.length) {
      console.log(artists);

      resu.render("artistResults", { artists: artists });
      return;
    }
    artists[count].rating = { one: 0, two: 0, three: 0, four: 0, five: 0 };
    artists[count].dbBandId = null;
    try {
      Request({
        method: 'GET',
        url: 'http://localhost:3000/api/band/byname/' + FixName(artists[count].name)
      }, function (err, res, body) {
        if (body !== 'null') {
          body = JSON.parse(body);
          artists.find(o => FixName(o.name) === body.name).dbBandId = body.id;

          Request({
            method: "GET",
            url: "http://localhost:3000/api/userband/" + body.id
          }, function (ubError, ubRes, ubBody) {
            ubBody = JSON.parse(ubBody);

            //artists.find(o => o.name === body.name).rating = { one: 0, two: 0, three: 0, four: 0, five: 0 }
            if (ubBody !== null) {
              for (let i = 0; i < ubBody.length; i++) {
                switch (ubBody[i].rating) {
                  case 1:
                    artists.find(o => FixName(o.name) === body.name).rating.one++;
                    break;
                  case 2:
                    artists.find(o => FixName(o.name) === body.name).rating.two++;
                    break;
                  case 3:
                    artists.find(o => FixName(o.name) === body.name).rating.three++;
                    break;
                  case 4:
                    artists.find(o => FixName(o.name) === body.name).rating.four++;
                    break;
                  case 5:
                    artists.find(o => FixName(o.name) === body.name).rating.five++;
                    break;
                }
              }
            }

            BandSetup(artists, ++count, resu);
          });
        } else {
          BandSetup(artists, ++count, resu);
        }

      });
    } catch (error) {
      BandSetup(artists, ++count, resu);
    }
  }


  app.post("/mapResult", function (req, res) {
    let bandName = req.body.bandName;
    if (bandName === null || bandName === undefined || bandName.trim() === '') {
      res.render("index", { msg: "Please input a search term" })
      return;
    }

    bandApi.getRouteData(bandName, function (route) {
      if (route)
        res.render("mapResult", { route: JSON.stringify(route), bandName: bandName, });
      else
        res.render("mapResult", {
          bandName: bandName,
          message: "This band has no scheduled tour dates."
        })
    })
  })

  app.get("/songs", function (req, res) {
    const id = req.query.id;
    spotifyApi.getTopTracks(id, function (tracks) {
      res.json(tracks);
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
