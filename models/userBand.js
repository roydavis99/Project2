module.exports = function (sequelize, DataTypes) {
  var UserBand = sequelize.define("UserBand", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    BandId: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.SMALLINT
    }
  });

  /* UserBand.associate = function (models) {
    models.UserBand.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        notNull: false
      }
    });

    models.UserBand.belongsTo(models.Band, {
      onDelete: "CASCADE",
      foreignKey: {
        notNull: false
      }
    });
  }; 
  */
  return UserBand;
};