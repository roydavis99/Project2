var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function (app) {
  // Get all examples
  app.get("/api/band", function (req, res) {
    db.Band.findAll({}).then(function (dbBand) {
      res.json(dbBand);
    });
  });

  app.get("/api/band/byname/:name", function (req, res) {
    db.Band.findOne({
      where: {
        name: req.params.name
      }
    }).then(function (dbBand) {
      res.json(dbBand);
    });
  });

  app.get("/api/band/byid/:id", function (req, res) {
    db.Band.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbBand) {
      res.json(dbBand);
    });
  });

  app.post("/api/band", function (req, res) {
    db.Band.create(req.body).then(function (dbBand) {
      res.json(dbBand);
    });
  });

  // Delete an example by id
  app.delete("/api/band/:id", function (req, res) {
    db.Band.destroy({ where: { id: req.params.id } }).then(function (dbBand) {
      res.json(dbBand);
    });
  });
};
