'use strict';

const sharp = require('sharp');
const aws = require('aws-sdk');
const s3 = new aws.S3({
    apiVersion: process.env.S3_API_VERSION,
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

exports.handler = async (event) => {
    console.log('Received Payload:', JSON.stringify(event, null, 2));

    // Get the object from the event and shot its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    console.log('Params:', bucket, key);
    const getParams = {
        Bucket: bucket,
        Key: key
    };

    try {
        //const { ContentType } = await s3.getObject(params).promise();
        //console.log('CONTENT TYPE:', ContentType);

        const image = await s3.getObject(getParams).promise();
        console.log(image);

        const convertedImg = await sharp(image.Body).webp({ quality: 60 }).toBuffer();
        console.log('Converted image:', convertedImg);

        const putParams = {
            Bucket: `${process.env.S3_BUCKET}/users/${image.Metadata.uid}/inventory`,
            Key: key.replace(/\.(jpeg|jpg|png)/g, '.webp'),
            Body: convertedImg,
            ContentType: 'image/webp'
        };

        const uploadNewImage = await s3.upload(putParams).promise();
        console.log(uploadNewImage);

    } catch(err) {
        console.log(err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda! Image converted')
    }
    return response;
};