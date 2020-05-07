const path = require('path');

module.exports = {
    entry: [
        './src/index.ts'
    ],
    output: {
        filename: "index.bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            Controller: path.resolve(__dirname, "src/js/controllers"),
            Model: path.resolve(__dirname, "src/js/models"),
            View: path.resolve(__dirname, "src/js/views"),
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
                                require('autoprefixer'),
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
    }
}