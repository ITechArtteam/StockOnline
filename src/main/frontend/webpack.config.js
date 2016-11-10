var webpack = require('webpack');
module.exports = {
    devtool: "eval-source-map",
    entry: "./src/index.jsx",
    output: {
        path: "../webapp/resources/js",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js",
            "React": "react"
        })
    ],
    resolve: {extensions: ['', '.js', '.jsx']},
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel",
                exclude: [/node_modules/, /public/],
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }

            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            }, {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader?limit=10000',
            }, {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader',
            },
            /* {
             test: /\.jsx$/,
             loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime'],
             exclude: [/node_modules/, /public/],
             query: {        presets: ['es2015', 'stage-0', 'react']
             }

             },*/
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
};