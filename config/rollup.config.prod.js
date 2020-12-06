import { terser } from 'rollup-plugin-terser';

export default {
    input: './src/main.js',
    output: {
        file: './build/soursop-core.js',
        format: 'iife',
        name: 'soursopCore',
        sourcemap: true,
    },
    plugins: [
        terser(),
    ],
};
