import commonjs from 'rollup-plugin-commonjs';
export default {
  entry: 'public/scripts/app.js',
  dest: 'public/app.min.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    commonjs({
      namedExports: {'public/scripts/jss.js': ['jss']}
    })
  ]
};
