var db = require("../models");

module.exports = function (app) {
  // Get all user
  // NOT USED
  app.get("/api/user", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });
 

  app.get("/api/user/:username", function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function (dbUser) {
      console.log(req.params);
      console.log(dbUser);
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/user", function (req, res) {
    console.log(req);
    db.User.create(
      req.body  
    ).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // PUT route for updating user
  app.put("/api/user", function (req, res) {
    db.User.update(req.body,{
      where: {
        id: req.body.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // Delete a user by id
  app.delete("/api/user/:id", function (req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
};
