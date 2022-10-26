'use strict';

//const raw = require('./raw');
const parser = require('./parser');
const uploader = require('./uploader');
const putter = require('./putter');

exports.handler = async (event) => {
//const foobar = async (event) => {
    console.log('RAW Payload:', event);

    const formData = await parser(event);
    console.log(formData);

    // Run concurrently
    const uploadFile = await uploader(formData.file);
    const newItem = await putter(formData);

    await Promise.all([uploadFile, newItem])
        .then(console.log)
        .catch(console.log);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!')
    };
    return response;
};

//foobar(raw);