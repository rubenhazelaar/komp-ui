var webpack = require("webpack"),
    DedupePlugin = webpack.optimize.DedupePlugin,
    path = require('path'),
    fs = require('fs'),
    getPackageJson = function () {
        return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    },
    pkg = getPackageJson();

var config = {
    cache: true,
    devtool: 'sourcemap',
    entry: {
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].js',
        library: 'kompo',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: []
};

module.exports = config;

