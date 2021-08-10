import CustomError from "../../helpers/custom-error";

export default function makeFirebaseVerifyUser({ admin, usersDb }) {
  return async function firebaseVerifyUser(idToken) {
    // verify if firebase token is valid
    const oAuthUser = await admin.auth().verifyIdToken(idToken);

    // else throw error
    if (!oAuthUser) {
      throw new CustomError("Invalid Token.", 401);
    }

    // check if user in db
    const user = await usersDb.findByGoogleId(oAuthUser.user_id);

    if (!user) {
      throw new CustomError("User not found.", 400);
    }

    return user;
  };
}
