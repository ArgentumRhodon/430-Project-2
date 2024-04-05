/* Our client cide (in client/homePage.jsx) needs to be built so
   that it can be run by the chromium browser inside of electron.

   We will import the terser plugin to prevent webpack from
   generating licensing files for each of our bundles that
   imports React.
*/

import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";

const smp = new SpeedMeasurePlugin();

export default smp.wrap({
  entry: {
    index: "./client/App.jsx",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: false, // SET TO TRUE FOR PRODUCTION
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  mode: "production",
  output: {
    path: path.resolve(path.dirname("./"), "hosted"),
    filename: "[name]Bundle.js",
  },
});
