'use strict';
module.exports = (sequelize, DataTypes) => {
  var payment = sequelize.define('payment', {
    invoiceId: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    availableBanks: DataTypes.TEXT
  });

  payment.associate = (models) => {
    payment.hasMany(models.transaction, {
      foreignKey: 'paymentId',
      as: 'transactions',
    });    
  };

  return payment;
};