import path from 'path';

export default {
  mode: 'production',
  entry: path.resolve(__dirname, 'index'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: { rules: [{ test: /\.ts$/i, loader: 'ts-loader' }] },
  resolve: { extensions: ['.ts', '.js'] },
  target: 'node',
};
