'use strict';
module.exports = (sequelize, DataTypes) => {
  var aladinkeyLog = sequelize.define('aladinkeyLog', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    pulsaPriceId: DataTypes.INTEGER,
    priceBefore: DataTypes.INTEGER,
    priceAfter: DataTypes.INTEGER
  });

  aladinkeyLog.associate = (models) => {
    aladinkeyLog.belongsTo(models.pulsaPrice, {
      foreignKey: 'pulsaPriceId',
    }),
    aladinkeyLog.belongsTo(models.user, {
      foreignKey: 'userId',
    })
  };
  return aladinkeyLog;
};