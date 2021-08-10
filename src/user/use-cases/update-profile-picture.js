import CustomError from "../../helpers/custom-error"


export default function makeUpdateProfilePicture({ usersDb }) {
    return async function updateProfilePicture({googleId, photoURL}) {

        if(!photoURL) {
            throw new CustomError("No photo url.")
        }       

        return await usersDb.findByGoogleIdAndUpdateProfilePic({ googleId, photoURL })
    }
}
