const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "assets"),
            to: path.resolve(__dirname, "build", "assets"),
          },
        ],
      }),
      new webpack.DefinePlugin(envKeys),
      new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.html"),
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
    ],
    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "/"),
      },
      port: 3005,
      open:true
    },
    externals: {
      jquery: "$",
    },
    module: {
      // exclude node_modules
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpg|jpeg|gif)$/, // to import images and fonts
          loader: "url-loader",
          options: { limit: 1024000 },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    // pass all js files through Babel
    resolve: {
      extensions: ["*", ".js", ".jsx"],
      alias: {
        "@pages": path.resolve(__dirname, "src/pages"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@components": path.resolve(__dirname, "components/"),
        // "@assets": path.resolve(__dirname, "public/assets/"),
      },
    },
  };
};
