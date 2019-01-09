const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  //  Automatically find all handlers and bundle them.
  entry: slsw.lib.entries,
  target: "node",
  devtool: "source-map",
  //  `aws-sdk` is not compatible with Webpack.
  //  Exclude `node_modules` dependencies.
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    //  Turn off minification.
    minimize: false
  },
  performance: {
    //  Turn off size warnings for entry points.
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
