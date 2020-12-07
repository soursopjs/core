import { terser } from 'rollup-plugin-terser';

export default {
    input: './src/main.js',
    output: {
        file: './dist/soursop-core.min.js',
        format: 'iife',
        name: 'soursopCore',
        sourcemap: true,
    },
    plugins: [
        terser(),
    ],
};
