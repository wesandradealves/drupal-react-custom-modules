
const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
var webpack = require('webpack');
 
const config = {
  entry: './src/index.js',
  devtool: (process.env.NODE_ENV === 'production') ? false : 'inline-source-map',
  mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  target: ['web', 'es5'],
  plugins: [
    new NodePolyfillPlugin(),
    // other plugins,
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),    
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },  
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader' , 'css-loader' ] },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },      
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
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