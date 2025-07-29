const { StatusCodes } = require('http-status-codes');
const { ValidationError, AppError } = require('../utils/errors/index');
const { Booking } = require('../models/index');


class BookingRepository {

    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error.errors.map(e => e.message));
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create booking.',
                'There was some issue creating booking. Try again later!',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);

            if (!booking) {
                throw new AppError(
                    'NotFoundError',
                    `Booking with id ${bookingId} not found`,
                    'No booking record found to update.',
                    StatusCodes.NOT_FOUND
                );
            }

            if (data.status) {
                booking.status = data.status;
            }

            await booking.save();
            return booking;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error.errors.map(e => e.message));
            }
            if (error.name === 'NotFoundError') {
                throw error;
            }
            throw new AppError(
                'RepositoryError',
                'Cannot update booking.',
                'There was some issue updating booking. Try again later!',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

}

module.exports = BookingRepository;
