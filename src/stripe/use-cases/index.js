import makeCreateCustomer from "./create-customer";
import makeCreateCustomerSession from "./create-customer-portal-session";
import makeHandleWebhook from "./handle-webhooks";
import makeVerifySubscriptionStatus from "./verify-subscription-status";
import makeVerifySubscriptionPlan from "./verify-subscription-plan";
import makeListSubscription from "./list-subscription";
import makeHandlePaymentIntentStatus from "./handle-payment-intent-status";

import usersDb from "../data-access";
const stripe = require("stripe")(
  "sk_test_51IRIgJI6P7vY1IqQS2tx5veZ5V0DM3rUjGzFc3svrWPpg7rf2zyMFDDZBGhkflN60OOQwqwykb4542JokLVliDpE00pfRbBYOJ"
);

const createCustomerSession = makeCreateCustomerSession({ stripe });
const createCustomer = makeCreateCustomer({ stripe });
const handlePaymentIntentStatus = makeHandlePaymentIntentStatus({ usersDb });
const handleWebhook = makeHandleWebhook({ handlePaymentIntentStatus, usersDb });
const verifySubscriptionStatus = makeVerifySubscriptionStatus();
const verifySubscriptionPlan = makeVerifySubscriptionPlan();
const listSubscription = makeListSubscription({ stripe });

const stripeService = Object.freeze({
  createCustomerSession,
  createCustomer,
  handleWebhook,
  verifySubscriptionStatus,
  verifySubscriptionPlan,
  listSubscription,
});

export default stripeService;
export {
  createCustomerSession,
  createCustomer,
  handleWebhook,
  verifySubscriptionStatus,
  verifySubscriptionPlan,
  listSubscription,
};
