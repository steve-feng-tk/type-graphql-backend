const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

module.exports = {
    mode: 'production',
    entry: slsw.lib.entries,
    target: 'node',
    optimization: {
        minimize: false,
    },
    resolve: {
        alias: {
            '@util': path.resolve(__dirname, 'lib/utils/'),
        },
        extensions: ['.ts', '.js'],
    },
    node: false,
    devtool: 'inline-cheap-module-source-map',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
};
