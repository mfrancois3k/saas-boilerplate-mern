import {
  verifySubscriptionPlan,
  verifySubscriptionStatus,
} from "../../stripe/use-cases";
import { firebaseVerifyUser } from "../../auth/use-cases";

import makeBasic from "./basic";
import makePremium from "./premium";

const basic = makeBasic({
  firebaseVerifyUser,
  verifySubscriptionStatus,
  verifySubscriptionPlan,
});
const premium = makePremium({
  firebaseVerifyUser,
  verifySubscriptionStatus,
  verifySubscriptionPlan,
});

const stipeController = Object.freeze({
  basic,
  premium,
});

export default stipeController;
export { basic, premium };
