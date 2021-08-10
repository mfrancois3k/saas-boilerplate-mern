export default function makePostFreeTrial({ createFreeTrial, firebaseVerifyUser }) {
    return async function postFreeTrial(httpRequest) {
        try {

            // get token from client app
            const idToken = httpRequest.headers['Authorization']

            // verifiy user
            const user = await firebaseVerifyUser(idToken)

            // delete with googleId
            const subscription = await createFreeTrial(user)


            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: subscription
            }

        } catch (e) {
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: e.status || 401,
                body: e.message || "Something went wrong"
            }
        }
    }
}