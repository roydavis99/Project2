var bcrypt = require("bcrypt");


module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define("User", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    userName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(40),
      notNull: false
    },
    displayName: {
      type: DataTypes.STRING(50),
      notNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      notNull: false,
      unique: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      notNull: false,
      defaultValue: true
    }
  });

  //instanceMethods for password
  User.prototype.generateHash = function(password){
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
  };
  User.prototype.compareHash = function(password){
    return bcrypt.compare(password, this.password);
  };

  //Link to UserBand
  User.associate = function (models) {
    models.User.hasMany(models.UserBand);
  };

  return User;
};
