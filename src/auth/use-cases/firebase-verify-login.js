import Id from "../Id";

export default function makeFirebaseVerifyLogin({ createCustomer, usersDb }) {
  return async function firebaseVerifyLogin(user) {
    if (!user) {
      throw new Error("Access Denied.");
    }

    // search user with google id in db
    const foundUser = await usersDb.findByGoogleId(user.uid);

    // if not found create new user and return (sign up)
    if (!foundUser) {
      const { stripeId, subscriptionId, subscriptionStatus, plan } =
        await createCustomer(user.email);

      const newCreatedUser = await usersDb.registerUser({
        id: Id.makeId(),
        googleId: user.uid,
        stripeId,
        subscriptionId,
        subscriptionStatus,
        plan,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        providerId: user.providerData[0].providerId,
      });

      return newCreatedUser;
    }

    // if found return the loged in user from db
    return foundUser;
  };
}
