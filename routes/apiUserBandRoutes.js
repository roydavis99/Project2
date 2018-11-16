var db = require("../models");

module.exports = function (app) {
  app.get("/api/userband/:bandId", function (req, res) {
    db.UserBand.findAll({
      where:{
        bandId: req.params.bandId
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

    // PUT route for updating user
    app.put("/api/userband", function (req, res) {
      db.UserBand.update(req.body, {
        where: {
          userId: req.body.userId,
          bandId: req.body.bandId
        }
      }).then(function (dbUserBand) {
        res.json(dbUserBand);
      });
    });

    // Delete a user by id
    app.delete("/api/userband/:userid:bandid", function (req, res) {
      db.UserBand.destroy({ where: { 
        userId: req.params.userid,
        bandId: req.params.bandid
      } }).then(function (dbUserBand) {
        res.json(dbUserBand);
      });
    });
  });
};