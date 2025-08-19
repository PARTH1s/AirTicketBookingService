const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');

// Service instance to handle booking-related business logic
const bookingService = new BookingService();

// Create a new booking
const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);

    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: 'Successfully completed booking.',
      err: {},
    });
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        data: {},
        success: false,
        message: error.message,
        err: error.explanation || {},
      });
  }
};

module.exports = { create };
