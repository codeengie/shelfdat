'use strict';

const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js
AWS.config.update({region: process.env.DB_AWS_REGION}); // Set the region
const https = require('https');
const { v4: uuidv4 } = require('uuid'); // Generate universally unique identifier
const formidable = require('formidable'); // Process formData/uploads

/**
 * Node 8.10+ has async/wait support, hence the handler can now accept a promise value, this also
 * means we don't need to pass a callback in the parameters of the function.
 * @param event
 * @returns {Promise<{data: *, body: string, statusCode: number}>}
 */
exports.handler = async (event) => {
    let response = '';

    console.log(event);
    //console.log(`Request: ${JSON.stringify(event)}`);
    //handleFormData(event);

    try {
        // Send item data to DynamoDB
        const db = await putNewItem(event);
        console.log(`Return from putNewItem: ${JSON.stringify(db)}`);

        response = {
            statusCode: 200,
            body: 'OK',
            result: db
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

/*function handleFormData(data) {
    const form = formidable();

    form.parse(data, (err, fields, files) => {
        console.log(fields);
        console.log(files);

       if (err) {
           console.log('There was an error parsing the form data');
       }
    });
}*/

/**
 * Put new inventory item data into DynamoDB
 * @param data - Object consisting of media data received from api
 * @returns {Promise<*>}
 */
async function putNewItem(data) {
    const dbTableName = process.env.DB_TABLE_NAME;
    // Create the DynamoDB service object
    const dynamodb = new AWS.DynamoDB({apiVersion: process.env.DB_API_Version});

    try {
        const recordId = uuidv4();
        // Pre-flight data object for db insert
        const params = {
            TableName: dbTableName,
            Item: {
                collection: {BOOL: data.collection},
                container: {N: data.container.toString()},
                createdate: {S: data.createdate},
                format: {S: data.format},
                id: {S: recordId},
                location: {S: data.location},
                other: {L: [{S: 'N/A'}]},
                notes: {S: data.notes},
                title: {S: data.title},
                type: {S: data.type}
            }
        };

        console.log(`Generating new DynamoDB record, with ID: ${recordId}`);
        console.log(`Params: ${JSON.stringify(params)}`);

        await dynamodb.putItem(params).promise();

        // Add the UUID to the original data we received since sending the params is a no-go
        data.id = recordId;
        console.log(`Data with UUID added: ${data}`);

        return data;
    } catch(err) {
        console.log('There was an error with putItem(), new item not added', err);
        //return err;
        throw err;
    }

    //return dynamodb.putItem(params).promise();
}