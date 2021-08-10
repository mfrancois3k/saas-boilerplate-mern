import CustomError from "../../helpers/custom-error";

export default function makeHandlePaymentIntentStatus({ usersDb }) {
  return async function handlePaymentIntentStatus(status, stripeId) {
    if (!status) {
      throw new CustomError("There is no payment intent status.", 400);
    }
    if (!stripeId) {
      throw new CustomError("There is no customer id.", 400);
    }
    if (!invoiceId) {
      throw new CustomError("There is no invoice id.", 400);
    }

    return await usersDb.findByStripeIdAndUpdatePaymentIntent({
      stripeId,
      status,
    });
  };
}
