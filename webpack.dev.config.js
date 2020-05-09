const merge = require("webpack-merge");
const common = require("./webpack.common.config")

module.exports = merge(common, {
    mode: "development",
    devtool: "sourceMap",
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
})