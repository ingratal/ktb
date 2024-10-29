const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'public'), // Output directory
  },
  performance: {
    maxAssetSize: 1024000, // 1 MB for individual assets
    maxEntrypointSize: 1024000, // 1 MB for entry points
  },
  mode: 'production', // Set to 'production' for production build
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel to transpile ES6+
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
      process: require.resolve('process/browser'),  // Add this line
      buffer: require.resolve("buffer/"),


    },
  },
  plugins: [
    new Dotenv(), // Load environment variables from .env file
    new webpack.ProvidePlugin({
      process: 'process/browser', // Provide global `process`
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve files from the public folder
    },
    port: 3000, // Port for the dev server
    historyApiFallback: true, // For single-page applications
  },
};
