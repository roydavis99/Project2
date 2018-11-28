module.exports = function (sequelize, DataTypes) {
  var UserBand = sequelize.define("UserBand", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    BandId: {
      type: DataTypes.STRING,
      notNull: true
      
    },
    UserId: {
      type: DataTypes.STRING,
      notNull: true
    },
    rating: {
      type: DataTypes.SMALLINT
    }
  });

  UserBand.associate = function (models) {
    models.User.belongsToMany(models.Band, { through: UserBand });
    models.Band.belongsToMany(models.User, { through: UserBand });
  }; 
 
  return UserBand;
};