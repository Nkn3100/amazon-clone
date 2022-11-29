const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")("sk_test_51KvaL7SCrWx8JsIGvqDtKatNKT2k63OvOumVwclWwsK6msjRFxVVYF8gFyuxR5EwJckzglCu14ZoCwKEqjodx4hv00ZBbzuS2h")

// API 

// App config
const app = express();

// Middlewares
app.use(cors({ origin:true }));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.send('hello world'))
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved BOOM!!! for this amount >>>', total)
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "inr"
        
    });
    
    //OK - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// Listen command
exports.api = functions.https.onRequest(app)

//Example endpoint
//http://localhost:5001/challenge-afe06/us-central1/api
