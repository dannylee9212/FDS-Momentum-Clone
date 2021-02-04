const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin }  = require('clean-webpack-plugin'); 
const webpack = require('webpack');

출처: https://ibrahimovic.tistory.com/47 [Web Standard]
module.exports = {
  // entry file
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: ['@babel/polyfill', './src/js/index.js'],
  // 번들링된 js 파일의 이름(filename)과 저장될 경로(path)를 지정
  // https://webpack.js.org/configuration/output/#outputpath
  // https://webpack.js.org/configuration/output/#outputfilename
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // https://webpack.js.org/configuration/module
  module: {
    rules: [
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/configuration/mode
  mode: 'development',
  plugins: [ 
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ title: 'Hot Module Replacement',template: './index.html',scriptLoading:"defer" }), 
    new webpack.HotModuleReplacementPlugin()
  ],
}



