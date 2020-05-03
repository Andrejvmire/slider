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
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: '/node_modules/',
                use: {
                    loader: "ts-loader",
                }
            }
        ]
    }
}