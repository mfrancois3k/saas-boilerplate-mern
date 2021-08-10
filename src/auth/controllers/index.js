// INTERFACE ADAPTER LAYER (Nr. 3)
import makePostFirebaseLogin from './post-firebase-login'

import {
    firebaseVerifyLogin
} from '../use-cases'

//const getRefreshAccessToken = makeRefreshAccessToken({ refreshAccessToken })
const postFirebaseVerifyLogin = makePostFirebaseLogin({ firebaseVerifyLogin })


const authController = Object.freeze({
    postFirebaseVerifyLogin
})

export default authController
export { postFirebaseVerifyLogin }