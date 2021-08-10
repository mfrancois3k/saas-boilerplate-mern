import CustomError from "../../helpers/custom-error"

export default function makeFetchUser({ usersDb }) {
    return async function fetchUser(googleId) {
        const user = await usersDb.findByGoogleId(googleId)
        if (!user) { throw new CustomError("User not found.", 400) }
        return user
    }
}