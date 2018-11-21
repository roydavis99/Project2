var db = require("../models");
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {
  // Get all examples
  app.get("/api/band", function(req, res) {
    db.Band.findAll({}).then(function(dbBand) {
      res.json(dbBand);
    });
  });

  app.get("/api/band/:name", function(req, res) {
    db.Band.findAll({
      where:{
        name:{ 
          [Op.like]: "%" + req.params.name + "%"
        }
      }
    }).then(function(dbBand) {
      res.json(dbBand);
    });
  });

  app.get("/api/band/:id", function(req, res) {
    db.Band.findOne({
      where:{
        id:req.params.id
      }
    }).then(function(dbBand) {
      res.json(dbBand);
    });
  });

  app.post("/api/band", function(req, res){
    db.Band.create(req.body).then(function(dbBand){
      res.json(dbBand);
    });
  });

  // Delete an example by id
  app.delete("/api/band/:id", function(req, res) {
    db.Band.destroy({ where: { id: req.params.id } }).then(function(dbBand) {
      res.json(dbBand);
    });
  });
};
