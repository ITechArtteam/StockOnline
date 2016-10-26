var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
        path: "../webapp/resources/js",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    }
};