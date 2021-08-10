export default function makeGetPresignedUrlAwsImage({ addPresignedUrlAwsImage, firebaseVerifyUser }) {
    return async function getPresignedUrlAwsImage(httpRequest) {
        try {
            const { source = {}, ...mediaInfo } = httpRequest.body

            // get token from client app
            const idToken = httpRequest.headers['Authorization']

            // verifiy user
            await firebaseVerifyUser(idToken)

            const { photoPresignedUrl, photoTargetUrl } = await addPresignedUrlAwsImage({ ...mediaInfo })

            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date().toUTCString()
                },
                statusCode: 201,
                body: { photoPresignedUrl, photoTargetUrl }
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