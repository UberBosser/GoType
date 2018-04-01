const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: {
        index: "./src/containers/index.jsx",
        play: "./src/containers/play.jsx",
        404: "./src/containers/404.jsx"
    },

    output: {
        path: __dirname + "/static/js/",
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {            
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: "sass-loader" 
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "../css/[name].bundle.css",
        })
    ],

    mode: "development"
};
