const path = require('path');

module.exports = {

    entry: './build/main.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    mode: process.env.NODE_ENV || 'production'
};