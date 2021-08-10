export default function makePostFirebaseLogin({ firebaseVerifyLogin }) {
  return async function postFirebaseLogin(httpRequest) {
    try {
      // get user from firebase
      const { user } = httpRequest.body;

      // login user or create new user in db
      const loggedInUser = await firebaseVerifyLogin(user);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: loggedInUser,
      };
    } catch (e) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e,
        },
      };
    }
  };
}
