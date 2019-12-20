const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    name:String,
    phNo:Number,
    date:String,
    no_of_members:Number,
	no_of_rooms:Number
})


const Booking = module.exports = mongoose.model('Booking', BookingSchema);

