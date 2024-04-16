// import Stripe from 'stripe';
// import studentModel from '../../db/model/student.model.js';

// const { STRIPE_SECRET_KEY } = process.env;
// const stripe = new Stripe(STRIPE_SECRET_KEY);

// const payment = async (req, res) => {
//     try {
//         console.log(req.body.stripeToken);
//         if (!req.body.stripeToken) {
//             throw new Error("Missing stripeToken");
//         }

//         const customer = await stripe.customers.create({
//             email: req.body.stripeEmail,
//             source: req.body.stripeToken,
//             name: 'Sandeep Sharma',
//             address: {
//                 line1: '115, Vikas Nagar',
//                 postal_code: '281001',
//                 city: 'Mathura',
//                 state: 'Uttar Pradesh',
//                 country: 'India',
//             }
//         });

//         const charge = await stripe.charges.create({
//             amount: req.body.amount * 100, // amount in cents
//             description: req.body.productName,
//             currency: 'INR',
//             customer: customer.id
//         });

//         let foundStudent = await studentModel.findOne({ email: req.body.stripeEmail });
//         if (foundStudent) {
//             foundStudent.isPay = true;
//             await foundStudent.save(); // Save the changes to the document
//         }
//         res.status(200).json("done");
//     } catch (error) {
//         console.error(error);
//         res.redirect("/failure");
//     }
// };

// const success = async (req, res) => {
//     try {
//         res.status(200).json("payment done");
//         console.log("done");
//     } catch (error) {
//         console.error(error);
//         res.status(500).json("Internal Server Error");
//     }
// };

// const failure = async (req, res) => {
//     try {
//         res.json('failure');
//     } catch (error) {
//         console.error(error);
//         res.status(500).json("Internal Server Error");
//     }
// };

// export {
//     payment,
//     success,
//     failure
// };
import axios from 'axios';
const PAYMOB_URL = "https://accept.paymob.com/api";

const payment = async (req, res) => {
    try {
        const token = await getToken();
        // console.log(token)
        const orderId = await createOrder(token);
        console.log(orderId)
        const paymentToken = await generatePaymentToken(token, orderId);
        console.log(paymentToken)
        const iframeURL = await getIframeURL(paymentToken);
        res.status(200).json({ iframeURL });;
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
};

// Function to get authentication token
async function getToken() {
    const data = { "api_key": process.env.API_KEY, "username": process.env.USERNAME, "password": process.env.PASSWORD };
    // console.log(data)
    const response = await fetch('https://accept.paymob.com/api/auth/tokens', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log(responseData)
    return responseData.token;

}

// Function to create an order
async function createOrder(token) {
    const data = {
        "auth_token": token,
        "delivery_needed": "false",
        "amount_cents": "100",
        "currency": "EGP",
        "items": []
    };
    const response = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData.id;
}

// Function to generate payment token
async function generatePaymentToken(token, orderId) {
    const data = {
        "auth_token": token,
        "amount_cents": "100",
        "expiration": 3600,
        "order_id": orderId,
        "billing_data": {
            "apartment": "803",
            "email": "claudette09@exa.com",
            "floor": "42",
            "first_name": "Clifford",
            "street": "Ethan Land",
            "building": "8028",
            "phone_number": "+86(8)9135210487",
            "shipping_method": "PKG",
            "postal_code": "01898",
            "city": "Jaskolskiburgh",
            "country": "CR",
            "last_name": "Nicolas",
            "state": "Utah"
        },
        "currency": "EGP",
        "integration_id": 4485926
    };
    const response = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData.token;
}

// Function to get the URL for the payment iframe
async function getIframeURL(token) {
    // return `https://accept.paymob.com/api/acceptance/iframes/4485926?payment_token=${token}`;
    return `https://accept.paymob.com/api/acceptance/iframes/824785?payment_token=${token}`;
}
export {
    payment
}