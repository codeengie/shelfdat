'use strict';

//const raw = require('./test/raw');
const parser = require('./utils/parser');
const uploader = require('./utils/uploader');
const putter = require('./utils/putter');

exports.handler = async (event) => {
    console.log('RAW Payload:', event);

    const formData = await parser(event);
    console.log(formData);

    // Run concurrently
    const uploadFile = await uploader(formData.file, formData.id);
    const newItem = await putter(formData);

    await Promise.all([uploadFile, newItem])
        .then(console.log)
        .catch(console.log);

    const response = {
        statusCode: 200,
        body: JSON.stringify('OK')
    };
    return response;
};