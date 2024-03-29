'use strict';
module.exports = (sequelize, DataTypes) => {
  var payment = sequelize.define('payment', {
    invoiceId: DataTypes.STRING,
    xenditId: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    availableBanks: DataTypes.TEXT,
    availableretail: DataTypes.TEXT,
    expiredAt: DataTypes.DATE
  });

  payment.associate = (models) => {
    payment.hasMany(models.transaction, {
      foreignKey: 'paymentId',
      as: 'transactions',
    });    
    payment.hasMany(models.topup, {
      foreignKey: 'paymentId',
      as: 'topups',
    });    
    payment.hasMany(models.walletLog, {
      foreignKey: 'paymentId',
      as: 'walletLogs',
    });
  };

  return payment;
};