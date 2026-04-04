# AnyMenu Plugin React

> 这是 [AnyMenu](https://github.com/any-menu/any-menu) 的插件开发模板

## 编译

```bash
$ npm install
$ npm run build
# 然后会将编译结果生成到 dist 目录下
```

## 使用

同普通的 AnyMenu 插件

将编译好的结果放置于 AnyMenu 的插件目录下，然后 AnyMenu 中刷新本地插件列表即可看到刚刚添加的新插件

将新插件开启后即可 (当前版本可能需要重启下插件/软件才可)

## 从零生成此项目 (可选)

(1) 基于 plugin-simple

先基于 [any-menu/example-plugin-simple](https://github.com/any-menu/example-plugin-simple) 的从零生成说明

然后使用 react:

(2) 添加 react 依赖

```bash
npm install react react-dom
npm install -D @types/react @types/react-dom
```

(3) 修改 vite.config.js 的 define

做法参考 vite.config.js 的 define

主要是使其脱离 process (node.js) 依赖，否则编译结果 main.js 中会直接使用只能在 node.js 环境中使用的 node。
AnyMenu 加载插件时会报错: `Caused by: ReferenceError: process is not defined`

此外，如此也能大大减少编译结果的尺寸

(4) 配置构建工具以支持 React JSX/TSX

- 如果之前的项目基于 webpack：

  ```bash
  npm install -D webpack babel-loader @babel/core @babel/preset-react @babel/preset-typescript
  ```

  webpack.config.js 配置示例：

  ```js
  // webpack.config.js
  module.exports = {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          }
        },
        // 其他规则...
      ]
    },
    // 其他配置...
  }
  ```

- 如果之前的项目基于 vite：

  ```bash
  npm install -D vite @vitejs/plugin-react
  ```

  vite.config.js 配置示例：

  ```js
  // vite.config.js
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()]
  });
  ```

(5) 配置 tsconfig.json 以支持 JSX

在 `tsconfig.json` 中添加或修改以下配置：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true
  }
}
```

(6) 使用 React 挂载到面板元素

入口文件 index.ts 中 **不能使用 JSX 语法**（因为它是 `.ts` 而非 `.tsx`），需要使用 `createElement` 代替：

- React 18+ 写法 (推荐):

  ```ts
  import { createElement } from 'react';
  import { createRoot } from 'react-dom/client';
  import SubPanel from './SubPanel';

  const newPanel = document.createElement('div');
  ctx.api.registerSubPanel({
    id: 'example-plugin-react-panel',
    el: newPanel
  });

  // 使用 React 渲染（在 .ts 中不能写 JSX，需用 createElement）
  const root = createRoot(newPanel);
  root.render(createElement(SubPanel));
  ```

- React 17 及更早写法:

  ```ts
  import { createElement } from 'react';
  import ReactDOM from 'react-dom';
  import SubPanel from './SubPanel';

  const newPanel = document.createElement('div');
  ctx.api.registerSubPanel({
    id: 'example-plugin-react-panel',
    el: newPanel
  });

  // 使用 React 渲染（在 .ts 中不能写 JSX，需用 createElement）
  ReactDOM.render(createElement(SubPanel), newPanel);
  ```

(7) 创建一个示例组件

SubPanel.tsx（组件文件使用 `.tsx` 后缀，可以正常使用 JSX 语法）:

```tsx
import { useState } from 'react';

export default function SubPanel() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Hello from React Plugin!</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

(8) (可选, 推荐) 避免 ts 不认识 `.tsx` 组件的默认导出

当编译和运行一切都正常时，你的 IDE 代码编辑器可能也会在 index.ts 中飘红，
`import SubPanel from './SubPanel'` 提示: `找不到模块"./SubPanel"或其相应的类型声明。ts(2307)`

这是因为 tsconfig.json 中未包含 `.tsx` 文件的解析。确保 tsconfig.json 的 `include` 中包含 tsx 文件：

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

同时确保 `tsconfig.json` 中的 `compilerOptions` 包含步骤 (4) 中的 `"jsx": "react-jsx"` 配置。

(9) (可选) 卸载时清理 React 组件

当插件被禁用或卸载时，应当正确清理 React 渲染树以避免内存泄漏：

- React 18+:

  ```ts
  // 卸载
  root.unmount();
  ```

- React 17 及更早:

  ```ts
  // 卸载
  ReactDOM.unmountComponentAtNode(newPanel);
  ```

(10) (可选) React 18 与 React 17 及更早的一些差异

该项目使用的是 React 18+，版本 18 和 17 的一些用法有些不同

- React 18+
  详见 [官方文档-createRoot](https://react.dev/reference/react-dom/client/createRoot)
  ```js
  import { createRoot } from 'react-dom/client';
  const root = createRoot(container);
  root.render(createElement(App));
  ```
- React 17 及更早
  ```js
  import ReactDOM from 'react-dom';
  ReactDOM.render(createElement(App), container);
  ```

React 18 引入了并发特性 (Concurrent Features)，使用 `createRoot` 是启用这些新特性的前提。如果使用旧的 `ReactDOM.render`，React 18 会以兼容模式 (legacy mode) 运行，不会启用并发特性。
