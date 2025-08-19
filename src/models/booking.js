'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    // Define associations with other models here
    static associate(models) {
      // e.g., Booking.belongsTo(models.User, { foreignKey: 'userId' });
      // e.g., Booking.belongsTo(models.Flight, { foreignKey: 'flightId' });
    }
  }

  // Initialize the Booking model
  Booking.init(
    {
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,  
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,  
      },
      status: {
        type: DataTypes.ENUM('InProcess', 'Booked', 'Cancelled'),
        allowNull: false,
        defaultValue: 'InProcess',  
      },
      noOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,  
      },
      totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,  
      },
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'Bookings', 
    }
  );

  return Booking;
};
