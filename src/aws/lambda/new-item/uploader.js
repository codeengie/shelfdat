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
 * @returns {Promise<void>}
 */
const uploader = async (file) => {
    return new Promise((resolve, reject) => {
        let chunks = [];

        // Necessary to properly upload file but not needed for buffer
        let fileEncoding = file.encoded;
        delete file.encoded;

        // Iterate through file keys and make them into Buffer objects
        Object.values(file).forEach(val => {
            if (!Buffer.isBuffer(val)) {
               chunks.push(Buffer.from(val));
            } else {
               chunks.push(val);
            }
        });

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: file.filename,
            Body: Buffer.concat(chunks),
            ContentEncoding: fileEncoding,
            ContentType: file.type
        };

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            console.log(`File ${file.filename} uploaded successfully to:, ${data.Location}`);
            resolve(data.Location);
        });
    });
};

module.exports = uploader;