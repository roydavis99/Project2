
var db = require("../models");
var spotifyApi = require("../api/spotifyAPI");
var bandApi = require('../api/bandsAPI');

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
      res.render("artistResults", { artists: artists });
    });

  });

  app.post("/mapResult", function (req, res) {
    let bandName = req.body.bandName;
    if (bandName === null || bandName === undefined || bandName.trim() === '') {
      res.render("index", { msg: "Please input a search term" })
      return;
    }

    bandApi.getRouteData(bandName, function(route) {
      res.render("mapResult", {route: JSON.stringify(route)});
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
