import CustomError from "../../helpers/custom-error"

export default function makeCreateCustomerSession({ stripe }) {
    return async function createCustomerSession(user) {

        if (!user) { throw new CustomError("User not found.", 400) }

        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripeId,
            return_url: 'http://localhost:3000/settings',
        });

        return session.url // send client secret & status back to FE
    }
}