'use strict';

const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js
AWS.config.update({ region: process.env.DB_AWS_REGION }); // Set the region

exports.handler = async () => {
    let response = '';

    console.log(`Fetching inventory from: ${process.env.DB_TABLE_NAME}`);

    try {
        // Get inventory from db
        const inventory = await getInventory();

        if (inventory !== null) {
            console.log('Inventory items fetched');

            // Convert DynamoDB record into a JavaScript object
            const unmarshalled = inventory.Items.map(obj => AWS.DynamoDB.Converter.unmarshall(obj));

            response = {
                statusCode: 200,
                body: 'OK',
                data: unmarshalled
            }
        } else {
            console.log('Inventory came up empty');

            response = {
                status: 500,
                body: 'Inventory items not found or empty'
            }

            throw new Error('Inventory data not available');
        }

    } catch(err) {
        console.log(err);
        throw err;
    }

    return response;
}

// Get all inventory data from DynamoDB
async function getInventory() {
    const dbTableName = process.env.DB_TABLE_NAME;
    const dynamodb = new AWS.DynamoDB({ apiVersion: process.env.DB_API_VERSION });
    // Pre-flight data object
    const params = {
        TableName: dbTableName
    }

    return dynamodb.scan(params).promise();
}