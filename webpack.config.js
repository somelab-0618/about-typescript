const path = require('path');

module.exports = {
  mode: 'development', // minify等の最適化を行わない指定
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js', // 出力ファイル名
    path: path.resolve(__dirname, 'dist'), // 出力先ディレクトリの絶対パス
    publicPath: 'dist', // webpack-dev-server用の設定 webpackの出力を参照するパスをサーバーのルートからの相対パスで指定
  },
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
      },
      {
        directory: __dirname,
        publicPath: '/',
      },
    ],
  },
  devtool: 'eval',
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
};
