const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: "./frontend/javascripts/webpackPhoneBookScript.js",
    devtool: "source-map",
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [
        new CleanWebpackPlugin()
    ]

};
