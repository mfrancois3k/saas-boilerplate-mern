import { makeMedia } from '../entities' // import from entity layer (Nr. 1)
import AWS from 'aws-sdk'

export default function makeAddPresignedUrlAwsImage() {
    return async function addPresignedUrlAwsImage(mediaInfo) {
        const media = makeMedia(mediaInfo)

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            endpoint: 's3-eu-west-1.amazonaws.com',
            signatureVersion: 'v4',
            region: 'eu-west-1'
        });

        const key = `${media.getFileName()}.${media.getFileType()}`
        const contentType = `image/${media.getFileType()}`

        const getSignedUrlPromise = (operation, params) =>
            new Promise((resolve, reject) => {
                s3.getSignedUrl(operation, params, (err, url) => {
                    err ? reject(err) : resolve(url);
                });
            });

        const photoPresignedUrl = await getSignedUrlPromise(
            'putObject',
            {
                Bucket: process.env.BUCKET_AWS,
                Key: key,
                Expires: 60 * 5,
                ContentType: contentType,
            }).catch((err) => console.error(err));

        const photoTargetUrl = `https://${process.env.BUCKET_AWS}.s3.eu-west-1.amazonaws.com/${key}`;

        return { photoPresignedUrl, photoTargetUrl }
    }
} 