// INTERFACE ADAPTER LAYER (Nr. 3)
import {
    addPresignedUrlAwsImage
} from '../use-cases'

import {
    firebaseVerifyUser
} from '../../auth/use-cases'

import makeGetPresignedUrlAwsImage from './get-presignedurl-aws-image'

const getPresignedUrlAwsImage = makeGetPresignedUrlAwsImage({ addPresignedUrlAwsImage, firebaseVerifyUser })

const mediaController = Object.freeze({
    getPresignedUrlAwsImage
})

export default mediaController
export { getPresignedUrlAwsImage }