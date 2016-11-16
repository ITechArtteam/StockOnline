var webpack = require('webpack');
module.exports = {
    devtool: "eval-source-map",
    entry: "./src/index.js",
    output: {
        path: "../webapp/resources/js",
        filename: "bundle.js"
    },
    scripts: {
        "start": "webpack-dev-server --hot --inline"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /public/],
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/],
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader?strictMath&noIeCompat"
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },

            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },


            {
                test: /\.json$/,
                loader: "json-loader"
            },

            {test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: "url-loader"}
        ]
    }
};