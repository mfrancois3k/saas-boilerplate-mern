export default function makePostCustomerPortal({ createCustomerSession, firebaseVerifyUser }) {
    return async function postCustomerPortal(httpRequest) {
        try {

            // get token from client app
            const idToken = httpRequest.headers['Authorization']

            // verifiy user
            const user = await firebaseVerifyUser(idToken)

            // delete with googleId
            const url = await createCustomerSession(user)


            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: url
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