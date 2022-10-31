const fs = require('fs');
const { defineConfig } = require('@vue/cli-service');

// @todo Look for a better way to achieve this without repeating yourself
if (process.env.NODE_ENV !== 'production') {
    module.exports = defineConfig({
        devServer: {
            host: 'shelfdat.com',
            https: {
                key: fs.readFileSync('.certs/shelfdat.com+5-key.pem'),
                cert: fs.readFileSync('.certs/shelfdat.com+5.pem')
            },
            port: 443
        },
        transpileDependencies: true
    });
} else {
    module.exports = defineConfig({
        transpileDependencies: true
    });
}