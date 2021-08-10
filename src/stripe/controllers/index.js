// INTERFACE ADAPTER LAYER (Nr. 3)
import {
  createCustomerSession,
  handleWebhook,
  listSubscription,
} from "../use-cases";
import { firebaseVerifyUser } from "../../auth/use-cases";

import makePostCustomerPortal from "./post-customer-portal";
import makePostWebhook from "./post-webhook";
import makeGetSubscriptionSettings from "./get-subscription-settings";

const postCustomerPortal = makePostCustomerPortal({
  createCustomerSession,
  firebaseVerifyUser,
});
const postWebhook = makePostWebhook({ handleWebhook });
const getSubscription = makeGetSubscriptionSettings({
  listSubscription,
  firebaseVerifyUser,
});

const stipeController = Object.freeze({
  postCustomerPortal,
  postWebhook,
  getSubscription,
});

export default stipeController;
export { postCustomerPortal, postWebhook, getSubscription };
