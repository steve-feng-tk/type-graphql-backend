import AWS from 'aws-sdk';

const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export function getSignedUrl(
    objectPath: string,
    expirationMilliseconds: number = 60 * 200,
): string {
    return s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_BUCKET ?? "snobswap2",
        Expires: expirationMilliseconds,
        Key: objectPath,
    });
}

export default s3;