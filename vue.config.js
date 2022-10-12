const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        host: 'shelfdat.com',
        https: true,
        port: 8152
    },
    transpileDependencies: true
})