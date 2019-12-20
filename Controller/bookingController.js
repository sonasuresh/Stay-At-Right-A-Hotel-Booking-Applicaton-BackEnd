const Booking = require('../Models/Booking');
const Config = require('../Models/Config')
async function booking(req, res) {
    try {
        // either check for previous date here or disable previous dates in the frontend
        const [{value: bookingThreshold}] = await Config.find({key: 'numberOfRooms'})
        const totalBookingsOnDate = await Booking.aggregate(
            [
                { $match: {date: req.body.date} },
                { $group: { _id: "$date", totalBookingsOnDate: { $sum: "$no_of_rooms" } } }
            ]
        )
        //console.log(`${totalBookingsOnDate} ${req.body.no_of_rooms} ${bookingThreshold}`)
        //console.log(req.body)
        console.log(totalBookingsOnDate)
        if(req.body.no_of_rooms>bookingThreshold )
        {
            res.status(409).send({
                success: false,
                message: 'No rooms available'
                })
        }
        else if(totalBookingsOnDate.length === 0 || Number(totalBookingsOnDate[0].totalBookingsOnDate) + Number(req.body.no_of_rooms) <= Number(bookingThreshold)){
            let newBooking = new Booking({
            name:req.body.name,
            phNo:req.body.phno,
            date:req.body.date,
            no_of_members:req.body.no_of_members,
            no_of_rooms:req.body.no_of_rooms
            }) 
            await newBooking.save()
            res.status(200).send({
                success: true,
                message: 'Booked Successfully'
            })
        }
            else {
                res.status(409).send({
                success: false,
                message: 'No rooms available'
                })
            }
        }

    catch(error) {
        res.status(500).send(error)
    }
}
async function getAvailability(req,res) {
    try{
        const [{value: bookingThreshold}] = await Config.find({key: 'numberOfRooms'})
        const totalBookingsOnDate = await Booking.aggregate(
            [
                { $match: {date: req.params.date} },
                { $group: { _id: "$date", totalBookingsOnDate: { $sum: "$no_of_rooms" } } }
            ]
        )



        if(totalBookingsOnDate.length === 0)
        {
            //console.log("bookingThreshold-totalBookingsOnDate")
            //console.log(Number(bookingThreshold))
            res.status(200).json({
                    success: true,
                    message: Number(bookingThreshold)
                })

        }
        
        else{

                const availableRooms = bookingThreshold-Number(totalBookingsOnDate[0].totalBookingsOnDate);
                 res.status(200).json({
                    success: true,
                    message: availableRooms
                })
        }  
        
    }
    catch(error){
         res.status(500).send(error)
    }
}

async function cancelBooking(req, res) {
    try {

        Booking.remove({ _id: req.body._id }, (removeError, removeDocs) => {
        if (removeError) {
            res.json({
                success: false,
                message: 'Error in Cancellation'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Room Cancelled'
            })
        }
    })

    } catch (error) {
        res.status(500).send(error)
    }
}
async function getAllBookings(req, res) {
    try {
         Booking.find({}, (findError, findDocuments) => {
            if (findError) {
                res.json({
                    success: false,
                    message: 'Unable to retrive bookings'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: findDocuments
                })
            }
        })
    }

     catch (error) {
        res.status(500).send(error)
    }
}
async function editBooking(req, res) {
    try {
        Booking.update({ 
            _id: req.body._id 
        }, { 
            $set: { 
                no_of_members: req.body.no_of_members,
                fromDate:req.body.from,
                toDate:req.body.to
            } 
        }, (updateError, updateMessage) => {
        if (updateError) {
            res.json({
                success: false,
                message: 'Error in Updating'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Booking Updated!'
            })
        }
    })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
   getAllBookings,
   editBooking,
   booking,
   cancelBooking,
   getAvailability
}

