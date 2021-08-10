import CustomError from "../../helpers/custom-error";

export default function makeListSubscription({ stripe }) {
  return async function listSubscription(subscriptionId) {
    if (!subscriptionId) {
      throw new CustomError("Subscription Id not found.", 400);
    }

    try {
      const sub = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ["default_payment_method"],
      });

      const {
        status,
        current_period_end,
        current_period_start,
        plan: { amount, currency, interval, nickname },
        default_payment_method,
        cancel_at,
        cancel_at_period_end,
        canceled_at,
        collection_method,
      } = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ["default_payment_method"],
      });

      return {
        status,
        current_period_end,
        current_period_start,
        amount,
        currency,
        interval,
        plan: nickname,
        default_payment_method,
        cancel_at,
        cancel_at_period_end,
        canceled_at,
        collection_method,
      };
    } catch (error) {
      console.log(error);
    }
  };
}
