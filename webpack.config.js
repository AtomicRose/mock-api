var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

/*
 ExtractTextPlugin，打出单独的css包
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
/*
 HtmlWebpackPlugin，打包html
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [];

plugins.push(new HtmlWebpackPlugin({
    title: "mock-api",
    favicon: "./app/images/ico/favico.ico",
    template: path.resolve(__dirname, 'app/index.html'),
    inject: true,
    hash: true
}));

var distPath = '/dist/';
var outPutFile = 'bundle.js';

var config = {
    entry: [
        './app/index.js'      //入口
    ],
    output: {
        path: path.resolve(__dirname, './dist/web/'),
        filename: outPutFile
    },
    module: {
        loaders:[
            {
                test: /\.scss/,
                loaders: ['style', 'css', 'sass'],
                include: path.resolve(__dirname, 'app')
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {test: /\.(jpg|png|gif)$/, loader: "url-loader?limit=1024&name=images/[hash:8].[name].[ext]"}
        ]
    },
    plugins: plugins,
    watch: true
};
module.exports = config;
