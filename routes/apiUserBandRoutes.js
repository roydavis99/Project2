var db = require("../models");

module.exports = function (app) {
  app.get("/api/userband/:bandId", function (req, res) {
    db.UserBand.findAll({
      where: {
        BandId: req.params.bandId
      }
    }).then(function (dbUserBand) {
      res.json(dbUserBand);
    });
  });

  app.get("/api/userband/ids/:ids", function (req, res) {
    
    var ids = req.params.ids.split("|");
    db.UserBand.findOne({
      where: {
        BandId: ids[1],
        UserId: ids[0]
      }
    }).then(function (dbUserBand) {
      res.json(dbUserBand);
    });
  });

  // Create a new user
  app.post("/api/userband", function (req, res) {
    console.log(req);
    db.UserBand.create(
      req.body
    ).then(function (dbUserBand) {
      res.json(dbUserBand);
    });
  });

  // PUT route for updating user
  app.put("/api/userband", function (req, res) {
    db.UserBand.update({rating:req.body.rating}, {
      where: {
        UserId: req.body.UserId,
        BandId: req.body.BandId
      }
    }).then(function (dbUserBand) {
      res.json(dbUserBand);
    });
  });

  // Delete a user by id
  app.delete("/api/userband/:ids", function (req, res) {
    var ids = req.params.ids.split("|");
    db.UserBand.destroy({
      where: {
        UserId: ids[0],
        BandId: ids[1]
      }
    }).then(function (dbUserBand) {
      res.json(dbUserBand);
    });
  });
};