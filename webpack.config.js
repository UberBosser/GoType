const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: {
        index: "./src/containers/index.jsx",
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
                test: /\.(css|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader" 
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
