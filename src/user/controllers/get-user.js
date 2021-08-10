export default function makeGetUser({ fetchUser, firebaseVerifyUser }) {
  return async function getUser(httpRequest) {
    try {
      // get token from client app
      const idToken = httpRequest.headers["Authorization"];

      // verifiy user
      const { name, email, photoURL } = await firebaseVerifyUser(idToken);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { name, email, photoURL },
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
