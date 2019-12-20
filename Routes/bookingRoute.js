const router = require('express').Router()
const bookingController = require('../Controller/bookingController');

router.post('/book', bookingController.booking);
router.get('/getAllBookings', bookingController.getAllBookings);
router.put('/editBooking', bookingController.editBooking);
router.delete('/reset', async (req, res)=>{
	const Booking = require('../Models/Booking')
	await Booking.deleteMany({})
	res.status(200).send('RESET')
})

router.delete('/cancelBooking', bookingController.cancelBooking);
router.get('/getAvailability/:date',bookingController.getAvailability);


module.exports = router;

