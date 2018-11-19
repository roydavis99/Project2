var db = require("../models");
const bandsInTown = require('../api/bandsAPI');

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function() {
      res.json(dbExample);
    });
  });


  //This route is a throwAway made by Kevin
  app.get("/api/:bandName", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    bandsInTown.getRouteData(req.params.bandName, data => res.jsonp(data));
  })

};
