module.exports = function (sequelize, DataTypes) {
  var Band = sequelize.define("Band", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      notNull: true,

    },
    viewCount: {
      type: DataTypes.INTEGER
    }
  });

  //add connections to userBand here
  Band.associate = function (models) {
    models.Band.hasMany(models.UserBand);
  };

  return Band;
};