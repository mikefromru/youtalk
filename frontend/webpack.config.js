var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'build.js',
    sourceMapFilename: 'bundle.js.map',
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new WriteFilePlugin()
  ],
  module: {
    rules: [

      {
        test: /\.mp3$/,
        loader: 'url-loader'
      },

      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },



      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}


//if (process.env.NODE_ENV === 'development') {
  //module.exports.devtool = '#source-map'
  //module.exports.plugins = (module.exports.plugins || []).concat([
    //new webpack.DefinePlugin({
      //'process.env': {
        //NODE_ENV: '"development"',
        //ENDPOINT: '"http://localhost:8000"'
      //}
    //})
  //])
//}

//if (process.env.NODE_ENV === 'production') {
  //module.exports.devtool = '#source-map'
  //// http://vue-loader.vuejs.org/en/workflow/production.html
  //module.exports.plugins = (module.exports.plugins || []).concat([
    //new webpack.DefinePlugin({
      //'process.env': {
        //NODE_ENV: '"production"',
        //ENDPOINT: '"192.168.0.13"',
        ////ENDPOINT: '"http://localhost:8000"'
      //}
    //}),
    //new webpack.optimize.UglifyJsPlugin({
      //sourceMap: true,
      //compress: {
        //warnings: false
      //}
    //}),
    //new webpack.LoaderOptionsPlugin({
      //minimize: true
    //})
  //])
//}
