<<<<<<< HEAD
//var db = require("../models");
var spotifyApi = require("../api/spotifyAPI");
=======
var db = require("../models");
const spotifyApi = require("../api/spotifyAPI");
const bandApi = require('../api/bandsAPI');
>>>>>>> 56814606cf941f4a132c61a2ebf0623715115e1f

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

<<<<<<< HEAD
  app.post("/results", function(req, res) {
    var bandName = req.body.bandName;
    if(bandName === null || bandName === undefined || bandName.trim() === ""){
      res.render("index", {msg: "Please input a search term"});
      return;
    }

    spotifyApi.searchArtists(bandName, function(artists) {
      res.render("artistResults", {artists: artists});
    });
=======
  app.post("/results", function (req, res) {
    let bandName = req.body.bandName;
    if (bandName === null || bandName === undefined || bandName.trim() === '') {
      res.render("index", { msg: "Please input a search term" })
      return;
    }

    spotifyApi.searchArtists(bandName, function (artists) {
      res.render("artistResults", { artists: artists });
    })
>>>>>>> 56814606cf941f4a132c61a2ebf0623715115e1f

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
