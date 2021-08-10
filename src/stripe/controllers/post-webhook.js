export default function makePostWebhook({ handleWebhook }) {
    return async function makeWebhook(httpRequest) {
        try {

            const event = httpRequest.body; // grab event object from body

            // delete with googleId
            await handleWebhook(event)

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200, // Return a 200 response to acknowledge receipt of the event
                body: {}
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