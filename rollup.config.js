import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';

export default {
    entry: './src/index.ts',
    format: 'cjs',
    dest: 'index.js',

    plugins: [
        typescript({ typescript: require('typescript') }),
        babel({ exclude: 'node_modules/**' }),
    ],

    external(id) {
        if (id.includes(':')) {
            return false;
        }
        return id.match(/^[a-z0-9\-_@]/i) !== null;
    },
};
