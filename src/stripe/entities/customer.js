import CustomError from "../../helpers/custom-error"

export default function buildMakeCustomer() {
    return function makeCustomer({
        email
    } = {}) {
        if (!email) {
            throw new CustomError('Stripe Customer must havean  email.', 400)
        }

        return Object.freeze({
            getEmail: () => email
        })
    }
}
