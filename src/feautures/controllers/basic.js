export default function makeFree({
  firebaseVerifyUser,
  verifySubscriptionStatus,
  verifySubscriptionPlan,
}) {
  return async function free(httpRequest) {
    try {
      // get token from client app
      const idToken = httpRequest.headers["Authorization"];

      // verifiy user
      const user = await firebaseVerifyUser(idToken);

      // verify plan
      await verifySubscriptionStatus(user.subscriptionStatus, [
        "active",
        "trialing",
      ]);

      // verify plan
      await verifySubscriptionPlan(user.plan, ["basic", "premium"]);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { content: "This content is for basic and premium pro users." },
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
