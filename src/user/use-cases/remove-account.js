import CustomError from "../../helpers/custom-error"

export default function makeRemoveAccount({ usersDb }) {
    return async function removeAccount(googleId) {
        if (!googleId) {
            throw new CustomError('You must supply a id.', 400)
        }

        const accountToDelete = await usersDb.findByGoogleId(googleId)

        if (!accountToDelete) {
            return deleteNothing()
        }

        return hardDelete(accountToDelete)
    }

    function deleteNothing() {
        return {
            deletedCount: 0,
            message: 'User not found or not permitted, nothing to delete.'
        }
    }

    async function hardDelete(accountToDelete) {
        await usersDb.remove(accountToDelete._id)
        return {
            deletedCount: 1,
            message: 'Account deleted.'
        }
    }
}