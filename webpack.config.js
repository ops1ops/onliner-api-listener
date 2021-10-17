const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { DEFAULT_PORT, DIST_PATH } = require('./config/config');
const resolveTsconfigPathsToAlias = require('./resolve-tsconfig-path-to-webpack-alias');

module.exports = {
  entry: ['./src/client/index.tsx'],
  output: {
    path: DIST_PATH,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(css|less)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: resolveTsconfigPathsToAlias(),
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': `http://localhost:${process.env.PORT || DEFAULT_PORT}`,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
  // https://www.amcharts.com/docs/v4/getting-started/integrations/using-webpack/#Large_file_sizes
  externals: (context, request, callback) => {
    if (/xlsx|canvg|pdfmake/.test(request)) {
      return callback(null, `commonjs ${request}`);
    }

    callback();
  },
};
