const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const config = {
  entry: {
    index: path.resolve(__dirname, './js/index.js'),
    apresentacao: path.resolve(__dirname, './js/apresentacao.js'),
    widget: path.resolve(__dirname, './js/widget.js'),
  },
  watchOptions: {
    ignored: ["**/node_modules"],
    poll: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          enforce: true
        },
      }
    }
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]/[name].bundle.js',
  },
  target: ['web', 'es5'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new NodePolyfillPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // {
      //   test: /\.(s(a|c)ss)$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '/public/icons/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'fonts',
            outputPath: 'fonts',
          }
        }
      },
    ],
  },
};

module.exports = config;
