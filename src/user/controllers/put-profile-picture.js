export default function makePutProfilePicture({ updateProfilePicture, firebaseVerifyUser }) {
    return async function putProfilePicture(httpRequest) {
        try {
            const { photoURL } = httpRequest.body

            const idToken = httpRequest.headers['Authorization']

            const user = await firebaseVerifyUser(idToken)

            const url = await updateProfilePicture({
                googleId: user.googleId,
                photoURL
            })

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                body: url.photoURL
            }
        } catch (e) {
            // TODO: Error logging
            console.log(e)

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