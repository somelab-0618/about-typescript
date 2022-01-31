const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production', // minify等の最適化を行わない指定
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js', // 出力ファイル名
    path: path.resolve(__dirname, 'dist'), // 出力先ディレクトリの絶対パス
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /(node_modules | basics)/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    //ワークフロー全体に影響する
    new CleanPlugin.CleanWebpackPlugin(),
  ],
};
