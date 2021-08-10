export default function MakeUsersDb({ makeDb }) {
  return Object.freeze({
    findByGoogleId,
    saveCustomer,
    findByStripeId,
    updateStatusAndPlan,
    findByStripeIdAndUpdatePaymentIntent,
  });

  async function findByGoogleId(googleId) {
    const db = await makeDb();
    const result = await db.collection("users").find({ googleId: googleId });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const settings = found[0];
    return settings;
  }

  async function saveCustomer(googleId, stripeId, subscriptionId) {
    console.log(googleId, stripeId, subscriptionId);
    const db = await makeDb();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { googleId },
        { $set: { stripeId, subscriptionId } },
        { returnOriginal: false }
      );
    return { stripeId: result.value.stripeId };
  }

  async function findByStripeId({ stripeId }) {
    const db = await makeDb();
    const result = await db.collection("users").find({ stripeId });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const user = found[0];
    return user;
  }

  async function updateStatusAndPlan({ _id, subscriptionStatus, plan }) {
    const db = await makeDb();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id },
        { $set: { subscriptionStatus, plan } },
        { returnOriginal: false }
      );

    return result.value;
  }

  async function findByStripeIdAndUpdatePaymentIntent({ stripeId, status }) {
    const db = await makeDb();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { stripeId },
        { $set: { paymentIntentStatus: status } },
        { returnOriginal: false }
      );

    return result.value;
  }
}
