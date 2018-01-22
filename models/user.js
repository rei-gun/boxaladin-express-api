'use strict';

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sex: {
      type: DataTypes.ENUM,
      values: ['M','F'],
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    typedEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    usernameChanged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    accountProvider: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aladinKeys: {
      type: DataTypes.INTEGER
    },
    emailToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coin: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  user.associate = (models) => {
    user.hasMany(models.phonenumber, {
      foreignKey: 'userId',
      as: 'phonenumbers',
    });
    user.hasMany(models.transaction, {
      foreignKey: 'userId',
      as: 'transactions',
    });
  };

  return user;
};
