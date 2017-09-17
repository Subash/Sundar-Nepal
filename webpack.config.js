const webpack = require("webpack");
let plugins = [];

if(process.env.NODE_ENV === 'production') {
  plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}


module.exports = {
  entry: './public/js/app.js',
  output: {
    filename: './.public/js/app.min.js'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                "targets": {
                  "browsers": ["last 3 versions", "safari >= 7"]
                }
              }]
            ],
            plugins: [
              require('babel-plugin-syntax-jsx'),
              require('babel-plugin-transform-react-jsx'),
              require('babel-plugin-syntax-object-rest-spread'),
              require('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      }
    ]
  }
}
