const fs = require('fs');
const { defineConfig } = require('@vue/cli-service')
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
})