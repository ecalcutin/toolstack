import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      preserveModules: true,
      dir: 'dist/esm',
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    {
      preserveModules: true,
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      interop: 'auto',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
