const path = require('path');

module.exports = {
  entry: './public/scripts/app.js',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname,'public')
  }
};
