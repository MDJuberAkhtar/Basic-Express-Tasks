const express = require('express');
const playerRouter = require('./player/player.js');
const paymentRouter = require('./payment/payment.js');
const app = express();

app.use('/api', playerRouter)
app.use('/api', paymentRouter)


//server
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`)
})