import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: { // Library 模式：输出单个 ES 模块文件
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'main.js', // 输出文件名
    },
    rollupOptions: {
      external: [],
    },
    output: {
      inlineDynamicImports: true, // 确保产物是单文件，不拆分 chunk
    },
    cssCodeSplit: false, // 不单独输出 .css 文件，这里采用的 ?inline 字符串嵌入方案
    outDir: 'dist',
    minify: false, // (可选)
  },
});
