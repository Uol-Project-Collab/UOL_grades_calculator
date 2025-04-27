const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development', // or 'production' for production builds
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // transpile both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,  // process CSS files
        use: [
          'style-loader', // injects styles into the DOM
          'css-loader'    // resolves @import and url() in CSS files
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // import without extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // use your HTML template
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public/assets', 
          to: 'assets' 
        }
      ]
    })
  ]
};
