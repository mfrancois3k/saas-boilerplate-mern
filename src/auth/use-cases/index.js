import { createCustomer } from '../../stripe/use-cases'

import makeFirebaseVerifyLogin from './firebase-verify-login'
import makeFirebaseVerifyUser from './firebase-verify-user'


const admin = require("firebase-admin");

import usersDb from '../data-access'

const firebaseVerifyLogin = makeFirebaseVerifyLogin({ createCustomer, usersDb })
const firebaseVerifyUser = makeFirebaseVerifyUser({ admin, usersDb })

const authService = Object.freeze({
    firebaseVerifyLogin,
    firebaseVerifyUser
})

export default authService
export { firebaseVerifyLogin, firebaseVerifyUser }