const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


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
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader"

                ]
            },
            {
                test:  /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                use:"file-loader?name=[path][name].[ext]?[hash]"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ]
};
