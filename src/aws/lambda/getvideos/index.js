'use strict';

const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js
AWS.config.update({region: process.env.DB_AWS_REGION}); // Set the region


/**
 * Node 8.10+ has async/wait support, hend the handler can now accept a promise value, this also
 * means we don't need to pass a callback in the parameters of the function.
 * @param event
 * @param context
 * @returns {Promise<{data: *, body: string, statusCode: number}>}
 */
exports.handler = async (event, context) => {
    let response = '';

    console.log(`Event: ${JSON.stringify(event)}`);
    // console.log(`Query: ${event.url}`);

    try {
        // Get movies
        const movies = await getAllMovies();

        response = {
            statusCode: 200,
            body: 'OK',
            data: movies
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
 * Get all videos data from DynamoDB
 */
async function getAllMovies() {
    const dbTableName = process.env.DB_TABLE_NAME;
    const dynamodb = new AWS.DynamoDB({apiVersion: process.env.DB_API_VERSION});
    // Pre-flight data object
    const params = {
        TableName: dbTableName
    }

    return dynamodb.scan(params).promise();
}