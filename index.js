const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./Config/config')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));

const PORT = 3000

const {db} = config

const URL = `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.dbName}`
mongoose.connect(URL, {useNewUrlParser : true},(err) => {
    if (err) {
    	console.log(err)
        console.log('Error while Connecting!')
    } else {
        console.log('Connected to Mongo DB')
    }
})

const bookingRoute = require('./Routes/bookingRoute');
const configRoute= require('./Routes/configRoute');

app.use('/booking', bookingRoute);
app.use('/config',configRoute);


app.listen(PORT, () => {
    console.log('Server Started on PORT ' + PORT)
})
