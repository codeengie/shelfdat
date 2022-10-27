'use strict';

const busboy = require('busboy');

/**
 * Parse form data, especially ones with file uploads.
 * @param {Object} data - FormData object received from the client, this should be in its RAW form
 * @returns {Promise<void>}
 */
const parseFormData = (data) => {
    return new Promise((resolve, reject) => {
        console.log('Parser initialized');

        // Storage for extracted form fields and file data
        const fields = {};

        //const decoded = Buffer.from(data.body, 'base64').toString('ascii');
        //console.log(decoded);

        // Get the headers from the raw payload, this aids in extracting multipart/form-data boundaries
        const contentType = data.headers['Content-Type'] || data.headers['content-type'];
        console.log('Content-Type is:', contentType);

        // Instantiate busboy instance
        const bb = busboy( { headers: { 'content-type': contentType } } );
        // Container for image chunks
        let chunks = [];

        // Parse file(s)
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            console.log(`File [${name}]: filename: ${filename}, encoding: ${encoding}, mimeType: ${mimeType}`);

            fields[name] = {
                filename,
                type: mimeType
            };

            file.on('data', (data) => {
                console.log(`File [${name}] got ${data.length} bytes`);
                chunks.push(data);
            }).on('close', () => {
                fields[name].content = Buffer.concat(chunks);
                console.log(`File [${name}] done`);
            });
        });

        // Parse field(s)
        bb.on('field', (name, val) => {
            console.log(`Field [${name}]: value: ${val}`);
            fields[name] = val;
        }).on('finish', () => {
            console.log('Parsing complete!');
            resolve(fields);
        }).on('error', err => {
            console.log('Failed', err);
            reject(err);
        });

        bb.end(data.body, data.isBase64Encoded ? 'base64' : 'binary');
    });
};

module.exports = parseFormData;