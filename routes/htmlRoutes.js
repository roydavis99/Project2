//var db = require("../models");
var spotifyApi = require("../api/spotifyAPI");

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

  app.post("/results", function(req, res) {
    var bandName = req.body.bandName;
    if(bandName === null || bandName === undefined || bandName.trim() === ""){
      res.render("index", {msg: "Please input a search term"});
      return;
    }

    spotifyApi.searchArtists(bandName, function(artists) {
      res.render("artistResults", {artists: artists});
    });

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
