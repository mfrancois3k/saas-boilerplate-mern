import CustomError from "../../helpers/custom-error"

export default function makeVerifySubscriptionStatus() {
    return async function verifySubscriptionStatus(status, roles) {

        // check if user type matches with types that are granted
        let granted = false;

        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === status) {
                granted = true
                break;
            }
        }

        if (!granted) throw new CustomError(`You are not permitted with ${status} subscription status.`, 400)

        return
    }
} 