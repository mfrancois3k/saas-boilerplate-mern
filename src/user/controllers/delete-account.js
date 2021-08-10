export default function makeDeleteAccount({ removeAccount, firebaseVerifyUser }) {
    return async function deleteAccount(httpRequest) {
        try {

            // get token from client app
            const idToken = httpRequest.headers['Authorization']

            // verifiy user
            const user = await firebaseVerifyUser(idToken)

            // delete with googleId
            const deleted = await removeAccount(user.googleId)

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: deleted.deletedCount === 0 ? 404 : 200,
                body: deleted
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