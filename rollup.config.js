import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      entryFileNames: '[name].mjs',
      preserveModules: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
