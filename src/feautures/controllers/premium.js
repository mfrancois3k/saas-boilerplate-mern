export default function makePremium({
  firebaseVerifyUser,
  verifySubscriptionStatus,
  verifySubscriptionPlan,
}) {
  return async function premium(httpRequest) {
    try {
      // get token from client app
      const idToken = httpRequest.headers["Authorization"];

      // verifiy user
      const user = await firebaseVerifyUser(idToken);

      // verify plan
      await verifySubscriptionStatus(user.subscription_status, ["active"]);

      // verify plan
      await verifySubscriptionPlan(user.plan, ["premium"]);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { content: "This content is just for premium users." },
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
