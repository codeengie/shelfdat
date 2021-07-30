'use strict';

const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js
AWS.config.update({region: process.env.DB_AWS_REGION}); // Set the region

/**
 *
 * @param event
 * @returns {Promise<{body: string, statusCode: number}>}
 */
exports.handler = async (event) => {
    let response = '';

    console.log(`Request: ${JSON.stringify(event)}`);

    try {
        // Send media data to DynamoDB
        const db = await deleteMedia(event);
        console.log(`Return from deleteMedia: ${JSON.stringify(db)}`);

        response = {
            statusCode: 200,
            body: 'OK'
        }
    } catch(err) {
        console.log(err);

        response = {
            statusCode: 500,
            body: err
        }
    }

    return response;
}

/**
 * Delete media item from DynamoDB
 * @param recordId - UUID key
 * @returns {Promise<*>}
 */
async function deleteMedia(recordId) {
    const dbTableName = process.env.DB_TABLE_NAME;
    const dynamodb = new AWS.DynamoDB({apiVersion: process.env.DB_API_Version});
    const params = {
        TableName: dbTableName,
        Key: {
            id: {S: recordId}
        }
    };

    console.log(`Deleted DynamoDB record: ${recordId}`);

    return dynamodb.deleteItem(params).promise();
}