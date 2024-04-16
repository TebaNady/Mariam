import express from 'express';
const payment_route = express.Router();

import bodyParser from 'body-parser';
import { payment } from './payment.controller.js';
payment_route.use(bodyParser.json());
payment_route.use(bodyParser.urlencoded({ extended: false }));




// payment_route.post('/payment', payment);
// payment_route.get('/success', success);
// payment_route.get('/failure', failure);
payment_route.post('/initiatePayment', payment);
// payment_route.post('/callback', callback);
// payment_route.post('/proccess', processPayment);


export { payment_route };