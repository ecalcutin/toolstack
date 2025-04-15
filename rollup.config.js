import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      exports: 'auto',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    commonjs({
      extensions: ['.js', '.ts'],
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto',
    }),
  ],
};
