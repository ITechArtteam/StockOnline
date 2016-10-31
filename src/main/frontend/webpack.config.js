module.exports = {
    devtool: "eval",
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