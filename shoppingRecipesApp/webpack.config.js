const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // source file that contain the code (could be more than one)
    entry: ['babel-polyfill', './src/js/index.js'],
    // path to save the bundle JS file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    // location of folder to be open with webpack as local hosting (using command: "npm run start")
    devServer: {
        contentBase: './dist/'
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    // babel loader 
    module: {
        rules: [{
            // evaluate and convrt all js files to ES5
            test: /\.js$/,
            // exclude to evaluate and convert js files to ES5 that are not from out project
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
};