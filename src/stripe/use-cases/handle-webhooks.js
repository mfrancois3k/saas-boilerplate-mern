import CustomError from "../../helpers/custom-error";

/*
PAYMENT OUTCOME	              PAYMENTINTENT STATUS	    INVOICE STATUS	SUBSCRIPTION STATUS
Success	                      succeeded	                paid	          active
Fails due to card error	      requires_payment_method	  open	          incomplete
Fails due to authentication	  requires_action	          open	          incomplete

PAYMENTINTENT: https://stripe.com/docs/payments/intents#intent-statuses
Status: succeeded, processing, requires_payment_method, requires_action, cancelled

SUBSCRIPTION STATUS: https://stripe.com/docs/api/subscriptions/object#subscription_object-status
Status: active, past_due, unpaid, canceled, incomplete, incomplete_expired, trialing

*/

export default function makeHandleWebhook({
  handlePaymentIntentStatus,
  usersDb,
}) {
  return async function handleWebhook(event) {
    if (!event) {
      throw new CustomError("No event object from stripe.", 400);
    }

    console.log("TYPE: ", event.type);

    // Handle the event
    switch (event.type) {
      case "customer.subscription.updated" || "customer.subscription.deleted":
        const subscription = event.data.object;

        console.log(subscription);

        // find user by stripeId
        const user = await usersDb.findByStripeId({
          stripeId: subscription.customer,
        });

        // change status and plan
        if (!user) {
          throw new CustomError("No user found with that stripeId.", 400);
        }

        await usersDb.updateStatusAndPlan({
          _id: user._id,
          subscriptionStatus: subscription.status, // SUBSCRIPTION STATUS
          plan: subscription.items.data[0].price.nickname,
        });

        return;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  };
}
