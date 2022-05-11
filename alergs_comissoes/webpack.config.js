const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    // index: path.resolve(__dirname, './js/index.js'),
    agenda: path.resolve(__dirname, './js/agenda.js'),
    composicao: path.resolve(__dirname, './js/composicao.js'),
  },
  // watch: true,
  optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //   },
  },
  watchOptions: {
    ignored: ["**/node_modules", '/'],
    // aggregateTimeout: 200,
    // poll: 1000,
    // followSymlinks: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [new MiniCssExtractPlugin(
    {
      filename: '[name]/[name].css',
    }
  )],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]/[name].bundle.js',
  },
};
