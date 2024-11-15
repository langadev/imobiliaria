const path = require('path');

module.exports = {
  entry: './src/index.js', // arquivo de entrada principal do seu projeto
  target: 'node', // define o alvo como 'node', pois é um projeto Node.js
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta de saída
    filename: 'bundle.js', // nome do arquivo de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // aplica babel-loader a arquivos .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'development', // para produção, use 'production'
};
