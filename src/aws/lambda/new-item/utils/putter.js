'use strict';

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const ddb = new AWS.DynamoDB({
    apiVersion: process.env.DB_API_VERSION,
    region: process.env.DB_REGION
});

/**
 * Put a new item onto DynamoDB
 * @param {Object} file - File object
 * @returns {Promise<void>}
 */
const putter = async (file) => {
    return new Promise((resolve, reject) => {
        console.log('DynamoDB Data:', file);

        const dbTableName = process.env.DB_TABLE_NAME;
        const recordId = uuidv4();
        const timestamp = new Date(Date.now()).toISOString();

        const params = {
            TableName: dbTableName,
            Item: {
                collection: { BOOL: (file.collection === 'true') },
                container: { N: file.container },
                createdate: { S: timestamp },
                format: { S: file.format },
                id: { S: recordId },
                location: { S: file.location },
                other: { L: [{ S: 'N/A' }] },
                notes: { S: file.notes },
                title: { S: file.title },
                type: { S: file.type }
            }
        };

        console.log(`Pre-flight DynamoDB:
            recordId: ${recordId}
            params: ${JSON.stringify(params)}
        `);

        ddb.putItem(params, (err, data) => {
            if (err) {
                reject(err);
            }
            console.log(`Item successfully inserted: ${data}`);
            resolve(data);
        });

    });
};

module.exports = putter;