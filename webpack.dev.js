const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: path.join(__dirname, 'src', 'js', 'index.js'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
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
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'pages', 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devServer: {
        port: 9000,
        static: {
            directory: path.join(__dirname, 'src', 'pages'),
        },
				open: true,
    },
    devtool: 'eval-source-map',
};
