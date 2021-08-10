export default function makeGetSubscriptionSettings({
  listSubscription,
  firebaseVerifyUser,
}) {
  return async function getSubscription(httpRequest) {
    try {
      // get token from client app
      const idToken = httpRequest.headers["Authorization"];

      // verifiy user
      const { subscriptionId } = await firebaseVerifyUser(idToken);

      // delete with googleId
      const subscription = await listSubscription(subscriptionId);

      console.log(subscription);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: subscription,
      };
    } catch (e) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: e.status || 401,
        body: e.message || "Something went wrong",
      };
    }
  };
}
