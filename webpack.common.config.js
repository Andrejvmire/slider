const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: [
        "./src/index.ts"
    ],
    output: {
        filename: "index.bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
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
                exclude: "/node_modules/",
                use: {
                    loader: "ts-loader",
                }
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            plugins: [
                                require("autoprefixer"),
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}