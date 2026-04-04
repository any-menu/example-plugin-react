# AnyMenu Plugin Simple

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

可选阅读，仅推荐有需要自定义插件模板的查看 (如需要开发有 Vue/React 等依赖的插件模板)

(1) git 环境 (可选)

```bash
$ git init
# 并创建和修改 .gitignore
```

(2) npm 环境

```bash
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (anymenu-plugin-simple)
version: (1.0.0)
description: AnyMenu simple plugin example
entry point: (index.js)
test command:
git repository:
keywords: anymenu
author:
license: (ISC) MIT
type: (commonjs) module
About to write to H:\Git\Private\Group_AnyMenu\anymenu-plugin-simple\package.json:

{
  "name": "anymenu-plugin-simple",
  "version": "1.0.0",
  "description": "AnyMenu simple plugin example",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "anymenu"
  ],
  "author": "",
  "license": "MIT",
  "type": "module"
}


Is this OK? (yes)
```

(3) typescript 和 vite 环境

```bash
# 可参考当前项目的 package.json

$ npm install -D typescript vite

# 替换 package.json 的 scripts (使用 vite 和 typescript)
# 添加 tsconfig.json
# 添加 vite.config.js
```

(4) 程序文件

```bash
# 然后是文件准备

# (1) typescript 类型
# 复制 any-menu/any-menu 项目的 src/Core/PluginInterface.ts 接口到 /types/any-menu.d.ts
# 或复制该项目的 /types/any-menu.d.ts
# 或等待后期这一步会转而使用 npm 类型依赖包来实现
# 
# 当然，如果你使用 js 来编写则不需要这一步，直接仿照官方的 js 示例插件来编写就可以了

# (2) 创建和编写 src/ 文件夹内的内容 (主要程序代码和样式文件)
# 特殊：这里使用的特殊的方式将 css 文件转为字符串附加到 js 上，这样能方便你更好地利用代码着色功能编辑 js 文件
```
