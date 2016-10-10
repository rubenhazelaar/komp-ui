var webpack = require("webpack"),
    path = require('path');

var config = {
    cache: true,
    devtool: 'sourcemap',
    entry: {
        'components/table/dist/table-bundle': './components/table/src/table-examples.js'
    },
    output: {
        path: './',
        filename: '[name].js',
        library: 'kompo',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.json'],
        modules: [
            path.resolve('./components'),
            'node_modules'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: []
};

module.exports = config;

