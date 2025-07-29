const axios = require('axios');
const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/server-config");
const { ServiceError } = require("../utils/errors");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBoooking(data) {
        try {
            const flightId = data.flightId;

            // Fetch flight details
            const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestUrl);
            const flightData = response.data.data;

            if (!flightData) {
                throw new ServiceError('Flight not found', `No flight found with id ${flightId}`, 404);
            }

            // Check seat availability
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Insufficient seats', `Requested ${data.noOfSeats}, available ${flightData.totalSeats}`, 400);
            }

            // Calculate cost
            const totalCost = flightData.price * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };

            // Save booking in DB
            const booking = await this.bookingRepository.create(bookingPayload);

            // Update remaining seats in flight service
            const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestUrl, {
                totalSeats: flightData.totalSeats - booking.noOfSeats
            });

            const finalBooking = await this.bookingRepository.update(booking.id, { status: "Booked" });

            return finalBooking;

        } catch (error) {
            console.error(error);

            if (error.name === 'RepositoryError' || error.name === 'ValidationError') {
                throw error;
            }

            throw new ServiceError(
                'Booking creation failed',
                error.response?.data || error.message
            );
        }
    }

}

module.exports = BookingService;
