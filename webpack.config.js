const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-sourse-map',

  entry: {
    index: './src/index.js',
    cards: './src/cards.js',
    elements: './src/elements.js',
    'colors-types': './src/colors-types.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
           'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [/fonts/],
        use: [
          'file-loader?name=./images/[name].[ext]'
        ]
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot|ijmap.txt)$/,
        use: [
          'file-loader?name=./fonts/[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.pug',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/cards.pug',
      filename: 'cards.html',
      chunks: ['cards']
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/elements.pug',
      filename: 'elements.html',
      chunks: ['elements']
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/colors-types.pug',
      filename: 'colors-types.html',
      chunks: ['colors-types']
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
  }),
  ],
  
  devServer: {
        contentBase: './dist'
  },
};