import CustomError from "../../helpers/custom-error"

export default function makeVerifySubscriptionPlan() {
    return async function verifySubscriptionPlan(plan, roles) {

        // check if user type matches with types that are granted
        let granted = false;

        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === plan) {
                granted = true
                break;
            }
        }

        if (!granted) throw new CustomError("You are not permitted with this subscription plan.", 400)

        return
    }
} 