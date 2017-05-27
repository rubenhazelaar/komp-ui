var webpack = require("webpack"),
    path = require('path');

var config = {
    cache: true,
    devtool: 'sourcemap',
    entry: {
        'examples/table/dist/table-bundle': './examples/table/src/table-examples.js',
        'examples/table2/dist/table-bundle': './examples/table2/src/table-examples.js',
        'examples/multipanel/dist/bundle': './examples/multipanel/src/index.js'
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
            path.resolve('./examples'),
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

