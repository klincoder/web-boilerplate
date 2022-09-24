// Import resources
import axios from "axios";
import Stripe from "stripe";

// Import custom files
import { baseUrl, mailjetEmail } from "../../src/config/data";

// Initialize stripe
const stripeInit = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SKEY_TEST);

// EXPORT HANDLER
export default async function handler(req, res) {
  if (req.method === "POST") {
    // HANDLE POST REQUEST
    // Get request data from body
    const reqData = req.body;
    const reqAmt = reqData?.amount;
    const isValidAmt = reqAmt && typeof reqAmt === "number";

    // Debug
    //console.log("Debug apiStripeIntent 1: ", reqData);

    // If isValidAmt
    if (isValidAmt) {
      // Try catch
      try {
        // Create payment intent
        await stripeInit.paymentIntents
          .create({
            amount: reqAmt,
            currency: "gbp",
          })
          .then((apiRes) => {
            // Define resData
            const resData = apiRes?.client_secret;
            //console.log("Debug apiStripeIntent 2: ", resData);
            res.status(200).send(resData);
          })
          .catch((err) => {
            //console.log("Debug apiStripeintent 3: ", err.message);
            res.send(err.message);
          });
      } catch (err) {
        //console.log("Debug apiStripePayment 4: ", err.message);
        res.send(err.message);
      } // close try
    } else {
      // Send result
      const errMsg = "Invalid amount";
      //console.log("Debug apiStripePayment 5: ", errMsg);
      res.send(errMsg);
    } // close if isValidAmt
  } else if (req.method === "GET") {
    // HANDLE GET REQUEST
    // Send result
    res.send("GET request works!");
  } // close if reqMethod
} // close handler
