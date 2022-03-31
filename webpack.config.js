const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: ["webpack/hot/poll?100", "./src/main.ts"],
  target: "node",
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
  resolve: {
    alias: {
      "@auth": path.resolve(__dirname, "./src/auth"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@dto": path.resolve(__dirname, "./src/dto"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@environments": path.resolve(__dirname, "./src/environments"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@validations": path.resolve(__dirname, "./src/validations"),
      "@entities": path.resolve(__dirname, "./src/entities"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({ name: "server.js" }),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
    new ProgressBarPlugin({
      format:
        chalk.hex("#6c5ce7")("build ") +
        chalk.hex("#0984e3")("▯:bar▯ ") +
        // chalk.red('▯ :bar ▯ ') +
        chalk.hex("#00b894")("(:percent) ") +
        // chalk.green(':percent ') +
        chalk.hex("#ffeaa7")(":msg"),
      // chalk.blue('( :elapsed s )')
      complete: "▰",
      incomplete: "▱",
      clear: false,
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      analyzerHost: "127.0.0.1",
      analyzerPort: "8888",
      reportFilename: process.env.NODE_ENV === "development" && "report.html",
      openAnalyzer: false,
      generateStatsFile: false,
      statsFilename: "stats.json",
    }),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js",
  },
};
