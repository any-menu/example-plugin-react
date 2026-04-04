// <reference types="vite/client" />

// Vite 原生支持
// 但还是要让 TypeScript 认识 `?inline` 后缀的 CSS 导入，类型为 string
declare module '*.css?inline' {
  const content: string;
  export default content;
}
