import CustomError from "../../helpers/custom-error";
import { makeCustomer } from "../entities"; // import from entity layer (Nr. 1)

export default function makeCreateCustomer({ stripe }) {
  return async function createCustomer(email) {
    const subscriber = makeCustomer({ email });

    // create customer
    const customer = await stripe.customers.create({
      email: subscriber.getEmail(),
    });

    if (!customer.id) {
      throw new CustomError("Couldn't create stripe customer.", 400);
    }

    // create free subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: "price_1Is97UI6P7vY1IqQKydSupY1", // default free plan
          quantity: 1,
        },
      ],
      // expand: ["latest_invoice.payment_intent"],
      // collection_method: "charge_automatically" default
    });

    if (!subscription.id) {
      throw new CustomError("Couldn't create stripe subscription.", 400);
    }

    return {
      stripeId: customer.id,
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      plan: subscription.items.data[0].price.nickname,
    };
  };
}
