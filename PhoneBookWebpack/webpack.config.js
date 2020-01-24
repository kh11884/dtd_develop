const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                use: "file-loader?name=[path][name].[ext]?[hash]"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ]
                    }
                }
            },
            { test: /\.vue$/,
                use: "vue-loader"
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        }),
        new CopyPlugin([
            { from: './frontend/images', to: './images' },
        ]),
        new VueLoaderPlugin()
    ]
};
