'use strict';

//const raw = require('./test/raw');
const parser = require('./utils/parser');
const uploader = require('./utils/uploader');
const putter = require('./utils/putter');

exports.handler = async (event) => {
    console.log('RAW Payload:', event);

    /**
     * Lambda Proxy Integration requires backend Lambda function to return a response in the
     * format below. Otherwise, you'll be pulling your hair trying to figure out why you keep
     * getting the dreaded "502 Bad Gateway" error.
     * @link https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
     * @link https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
     * @todo Create a DEBUG environment variable so you only set origin header for development
     */
    let response = {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,POST',
            'Access-Control-Allow-Origin': 'https://shelfdat.com'
        }
    };

    // The parser needs to run first since we need the parsed data to run other functions
    const formData = await parser(event);
    console.log(formData);

    // Run concurrently
    const uploadFile = await uploader(formData.file, formData.id);
    const newItem = await putter(formData);

    try {
        const statuses = await Promise.allSettled([uploadFile, newItem]);
        console.log('Promises:', statuses);
        response.body = JSON.stringify(statuses[1]);
        return response;
    } catch(error) {
        console.log(error);
        response.statusCode = 500;
        response.body = JSON.stringify(error);
        return response;
    }
};