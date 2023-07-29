'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

// UUID
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: DataTypes.UUID,
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      afterCreate: (user, opts) => {
        delete user.dataValues.id;
        delete user.dataValues.password;
        delete user.dataValues.deleted_at;
        delete user.dataValues.status;
        delete user.dataValues.created_at;
        delete user.dataValues.updated_at;
      }
    },
    sequelize,
    modelName: 'User',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'users',
    freezeTableName: true,
    defaultScope: {
      attributes: [['uuid', 'userId'],['first_name', 'firstName'],['last_name', 'lastName'], 'email', ['is_admin', 'isAdmin'],['profile_picture', 'profilePicture'], 'status'],
    },
    scopes: {
      raw: {
        attributes: {
          exclude: ['deleted_at']
        }
      }
    }
  });

  User.prototype.validPassword = function (password) {
		return bcrypt.compare(password, this.password);
	};

  
  return User;
};