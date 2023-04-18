const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let html = fs.readdirSync(path.join(__dirname, 'src', 'pages'), 'utf-8');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        index: path.join(__dirname, 'src', 'js', 'index.js'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        ...html.map(page => {
            return new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'pages', page),
                filename: page,
            });
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
        ...(isProd
            ? [
                  new MiniCssExtractPlugin({
                      filename: '[name].[contenthash:8].css',
                  }),
              ]
            : []),
    ],
    devServer: {
        // watchFiles: path.join(__dirname, 'src'),
        port: 9000,
        static: {
            directory: path.join(__dirname, 'src', 'pages'),
        },
    },
    optimization: {
        minimize: isProd,
        minimizer: isProd ? [new TerserPlugin()] : [],
    },
    devtool: isProd ? false : 'source-map',
};
