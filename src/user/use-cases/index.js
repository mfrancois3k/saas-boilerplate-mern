import makeFetchUser from './fetch-user'
import makeRemoveAccount from './remove-account'
import makeUpdateProfilePicture from './update-profile-picture'


import usersDb from '../data-access'

const fetchUser = makeFetchUser({ usersDb })
const removeAccount = makeRemoveAccount({ usersDb })
const updateProfilePicture = makeUpdateProfilePicture({ usersDb })

const userservice = Object.freeze({
    fetchUser,
    removeAccount,
    updateProfilePicture
})

export default userservice
export { fetchUser, removeAccount, updateProfilePicture }