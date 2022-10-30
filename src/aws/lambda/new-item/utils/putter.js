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
        const boolCollection = (file.collection === 'true');
        const newImage = file.file.filename.replace(/\.(jpeg|jpg|png)/g, '.webp');
        let response = {};

        const params = {
            TableName: dbTableName,
            Item: {
                collection: { BOOL: boolCollection },
                container: { N: file.container },
                createdate: { S: timestamp },
                format: { S: file.format },
                id: { S: recordId },
                imageurl: { S: newImage },
                location: { S: file.location },
                other: { L: [{ S: 'N/A' }] },
                notes: { S: file.notes },
                title: { S: file.title },
                type: { S: file.type },
                year: { N: file.year }
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

            /**
             * I attempted to send back the data I'm adding to the database but unfortunately
             * using `ReturnValue: "ALL_OLD"` didn't yield any results. I have a feeling this
             * attribute is only useful when you are updating items and not creating new ones.
             * @todo Research a better way of sending back data on new items
             */
            response = {
                collection: boolCollection,
                container: file.container,
                createdate: timestamp,
                format: file.format,
                id: recordId,
                imageurl: newImage,
                location: file.location,
                other: ['N/A'],
                notes: file.notes,
                title: file.title,
                type: file.type,
                year: file.year
            }
            console.log(`Item successfully inserted: ${JSON.stringify(response)}`);
            console.log(`This is the PutItemOutput (data) and is empty: ${data}`);
            resolve(response);
        });

    });
};

module.exports = putter;