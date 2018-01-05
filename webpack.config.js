const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const ETP = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/chat.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, 'public'),
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname, 'src', 'index.html'),
  //     inject: 'body',
  //     filename: 'index.html',
  //   }),
  //
  //   // new webpack.HotModuleReplacementPlugin(),
  //
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //   name: 'common',
  //   // }),
  //   //
  //   // new ETP({
  //   //   filename: '[name].styles.css',
  //   //   allChunks: true,
  //   // }),
  // ],
};
