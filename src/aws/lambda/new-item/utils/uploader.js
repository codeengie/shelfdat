'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    apiVersion: process.env.S3_API_VERSION,
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

/**
 * Upload a single image to S3 bucket
 * @param {Object} file - File object
 * @param {String} uid - User's UUID
 * @returns {Promise<void>}
 */
const uploader = async (file, uid) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: file.filename,
            Body: file.content,
            ContentType: file.type,
            Metadata: { uid: uid },
        };

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            console.log(`File ${file.filename} uploaded successfully to: ${data.Location}`);
            resolve(data);
        });
    });
};

module.exports = uploader;