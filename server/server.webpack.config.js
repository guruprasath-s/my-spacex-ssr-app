const path = require("path");
const nodeExternals = require("webpack-node-externals");
// Webpack build configuration to build the SSR bundle.
// Invoked by build:server.

module.exports = {
  entry: path.resolve(__dirname, "./server.js"),
  target: "node",
  output: {
    path: path.resolve(__dirname, "../server-build"),
    filename: "server.bundle.js",
  },
  optimization: {
    minimize: false,
  },
  devServer: {
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
    },
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" },
      },
      {
        // anything not JS or HTML, we load as a URL
        // this makes static image imports work with SSR
        test: /\.(?!js|mjs|jsx|html|graphql$)[^.]+$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
        },
      },
      {
        // anything in node_modules that isn't js,
        // we load as null - e.g. imported css from a module,
        // that is not needed for SSR
        test: /\.(?!js|mjs|jsx|html|graphql$)[^.]+$/,
        include: /node_modules/,
        use: {
          loader: "null-loader",
        },
      },
    ],
  },
};
