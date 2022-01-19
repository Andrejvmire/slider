const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        './src/index.ts',
        './src/styles/main.scss'
    ],
    output: {
        filename: "index.bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            Controller: path.resolve(__dirname, "src/ts/controllers"),
            Model: path.resolve(__dirname, "src/ts/models"),
            View: path.resolve(__dirname, "src/ts/views"),
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: {
                    loader: "ts-loader",
                }
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new miniCssExtractPlugin({
            filename: "style.css",
        })
    ]
}