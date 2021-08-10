// INTERFACE ADAPTER LAYER (Nr. 3)
import {
    fetchUser,
    removeAccount,
    updateProfilePicture
} from '../use-cases'
import {
    firebaseVerifyUser
} from '../../auth/use-cases'

import makeGetUser from './get-user'
import makeDeleteAccount from './delete-account'
import makePutProfilePicture from './put-profile-picture'



const getUser = makeGetUser({ fetchUser, firebaseVerifyUser })
const deleteAccount = makeDeleteAccount({ removeAccount, firebaseVerifyUser })
const putProfilePicture = makePutProfilePicture({ updateProfilePicture, firebaseVerifyUser })



const userController = Object.freeze({
    getUser,
    deleteAccount,
    putProfilePicture
})

export default userController
export { getUser, deleteAccount, putProfilePicture }