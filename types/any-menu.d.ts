/**
 * AnyMenu Plugin Type Declarations
 * Copy from any-menu/any-menu: src/Core/pluginManager/PluginInterface.ts
 *
 * Plugin developers only need this file to get full type support.
 * Do NOT import from the host app directly.
 */

export interface PluginMetadata {
  /** 唯一标识符 */
  id: string;
  /** 脚本版本 */
  version: string;
  /** 宿主应用最低版本要求 */
  min_app_version: string;
  /** 插件名称（默认为 id） */
  name?: string;
  /** 插件作者 */
  author?: string;
  /** 插件描述 */
  description?: string;
  /**
   * 图标
   * - lucide 图标名：如 "lucide-table"
   * - SVG string
   * - 不填则用名字自动生成
   */
  icon?: string;
  /** CSS 字符串，插件加载时自动注入到 <head>，卸载时自动移除
   * 若使用 TypeScript 模板仓库开发，build 工具会自动将 .css 文件内容填入此字段
   */
  css?: string;
}

export interface PluginInterfaceCtx {
  env: {
    /** 当前选中文本 */
    selectedText?: string;
    /** 当前平台 */
    platform: string;
    /** 当前激活的应用/窗口名称 */
    activeAppName?: string;
    /** 当前文档/页面标题 */
    activeDocTitle?: string;
    /** 当前文档/页面链接 */
    activeDocUrl?: string;
  };
  api: {
    /** 输出文本到当前位置，输出后自动隐藏面板（低风险） */
    sendText: (str: string) => void;
    /** 保存到剪切板（低风险） */
    saveToClipboard: (str: string) => void;
    /** 通知用户（低风险） */
    notify: (message: string) => void;
    /** 网络请求（中风险） */
    urlRequest: (conf: UrlRequestConfig) => Promise<UrlResponse | null>;
    /** 隐藏面板（低风险） */
    hidePanel: (list?: string[]) => void;
    /** 读取文件（高风险） */
    readFile: (basePath: 'CONFIG'|'PUBLIC', relPath: string) => Promise<string | null>;
    /** 写入文件（高风险） */
    writeFile: (basePath: 'CONFIG'|'PUBLIC', relPath: string, content: string) => Promise<boolean>;
    /** 显示面板（低风险） */
    showPanel: (list?: string[]) => void;
    /** 注册子面板（中风险） */
    registerSubPanel: (options: { id: string, el: HTMLElement|((el: HTMLElement) => void) }) => void;
    /** 注销子面板 */
    unregisterSubPanel: (id: string) => void;
  };
}

export interface UrlRequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string;
}

export interface UrlResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}

/**
 * 插件接口 - 所有插件必须实现此接口
 *
 * 推荐写法：export default class MyPlugin implements PluginInterface { ... }
 */
export interface PluginInterface {
  metadata: PluginMetadata;

  /**
   * 点击/选择触发，必须实现
   */
  run(ctx: PluginInterfaceCtx): Promise<void>;

  /**
   * @deprecated 旧接口，无 ctx 环境，请改用 run
   */
  process?: (str?: string) => Promise<void | string>;

  /** 插件加载时调用（可选） */
  onLoad?(): void;

  /** 插件卸载时调用（可选） */
  onUnload?(): void;
}
