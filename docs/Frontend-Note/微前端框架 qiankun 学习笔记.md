# 微前端框架 qiankun 学习笔记

## 介绍
   qiankun 是一个由蚂蚁金服开源的微前端解决方案，它允许你将多个独立的应用（子应用）集成到一个主应用中，每个子应用可以是任意技术栈开发的独立项目。通过 qiankun，我们可以实现前后端分离架构下的多团队协作、技术栈无关、增量升级等需求。

## 核心概念
- **主应用**：作为入口的应用，负责加载和管理子应用。
- **子应用**：被主应用加载的应用，可以是SPA或其他形式的应用。
- **沙箱环境**：qiankun 提供了运行时沙箱来隔离不同子应用之间的全局变量和样式冲突。
- **生命周期钩子**：qiankun 定义了一套生命周期函数，用于在子应用的不同阶段执行自定义逻辑。

## 安装与配置
### 主应用
1. 安装 qiankun:
   ```bash
   npm install qiankun --save
   ```
2. 在主应用中注册子应用：
   ```javascript
   import { registerMicroApps, start } from 'qiankun';

   registerMicroApps([
     {
       name: 'app1',
       entry: '//localhost:8081',
       container: '#yourContainer',
       activeRule: '/app1',
     },
     // 更多子应用...
   ]);

   start();
   ```

### 子应用
1. 修改子应用的构建配置，确保支持跨域加载以及公共路径设置。
2. 实现必要的生命周期钩子，如 `bootstrap`, `mount`, `unmount` 等。
3. 如果需要，处理路由问题以适应嵌入式运行环境。

## 沙箱机制
qiankun 使用了两种沙箱模式：
- **代理沙箱**：基于 Proxy 对象拦截对 window 对象的操作。
- **快照沙箱**：保存并恢复全局状态的变化。

选择合适的沙箱模式取决于具体的应用场景和性能要求。

## 跨应用通信
qiankun 提供了简单的事件总线机制来实现在主应用与子应用之间或者子应用之间的通信。
```javascript
// 发送消息
import { sendMessage } from 'qiankun';

sendMessage({ type: 'someType', content: 'Hello' });

// 接收消息
import { initGlobalState, onGlobalStateChange } from 'qiankun';

const state = initGlobalState({ user: 'qiankun' });
onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));
```

#### 实践项目结构

假设我们有一个主应用 `main-app` 和两个子应用 `react-app` 和 `vue-app`。

```
/project-root
├── main-app
│   ├── public
│   ├── src
│   │   ├── index.js
│   │   ├── registerApps.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── react-app
│   ├── public
│   ├── src
│   │   ├── index.js
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   └── ...
└── vue-app
    ├── public
    ├── src
    │   ├── main.js
    │   ├── App.vue
    │   └── ...
    ├── package.json
    └── ...
```

#### 主应用配置

1. **安装 qiankun**：

```bash
cd main-app
npm install qiankun --save
```

2. **注册子应用**（`src/registerApps.js`）：

```javascript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:3000', // React 子应用的入口地址
    container: '#react-container', // 主应用中的容器元素
    activeRule: '/react-app', // 激活规则
  },
  {
    name: 'vue-app',
    entry: '//localhost:8080', // Vue 子应用的入口地址
    container: '#vue-container', // 主应用中的容器元素
    activeRule: '/vue-app', // 激活规则
  },
]);

start();
```

3. **创建容器元素**（`public/index.html`）：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Main App</title>
</head>
<body>
  <div id="react-container"></div>
  <div id="vue-container"></div>
  <script src="./index.js"></script>
</body>
</html>
```

4. **启动主应用**（`package.json`）：

```json
{
  "name": "main-app",
  "version": "1.0.0",
  "scripts": {
    "start": "http-server . -p 8000"
  },
  "dependencies": {
    "qiankun": "^2.5.0",
    "http-server": "^14.0.0"
  }
}
```

#### React 子应用配置

1. **修改构建配置**（使用 `craco` 或者自定义 Webpack 配置）：

安装 `@craco/craco` 和 `@craco/config-react-app`：

```bash
cd react-app
npm install @craco/craco @craco/config-react-app --save
```

创建 `craco.config.js` 文件：

```javascript
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'development') {
        webpackConfig.output.publicPath = 'auto';
      } else {
        webpackConfig.output.library = 'react-app';
        webpackConfig.output.libraryTarget = 'umd';
        webpackConfig.output.globalObject = 'window';
      }
      return webpackConfig;
    },
  },
};
```

修改 `package.json` 中的脚本：

```json
{
  "name": "react-app",
  "version": "1.0.0",
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3"
  },
  "devDependencies": {
    "@craco/craco": "^6.1.2",
    "@craco/config-react-app": "^6.1.2"
  }
}
```

2. **导出生命周期钩子**（`src/index.js`）：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export async function bootstrap() {
  console.log('React app bootstraped');
}

export async function mount(props) {
  console.log('React app mount', props);
  ReactDOM.render(<App />, document.getElementById('root'));
}

export async function unmount() {
  console.log('React app unmount');
  const { container } = window.__POWERED_BY_QIANKUN__ ? props : {};
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.getElementById('root'));
}
```

3. **启动 React 子应用**：

```bash
npm start
```

#### Vue 子应用配置

1. **修改构建配置**（使用 `vue-cli` 的 `vue.config.js`）：

创建 `vue.config.js` 文件：

```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'auto' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: 'vue-app',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_vue_app`,
    },
  },
};
```

2. **导出生命周期钩子**（`src/main.js`）：

```javascript
import Vue from 'vue';
import App from './App.vue';

export async function bootstrap() {
  console.log('Vue app bootstraped');
}

export async function mount(props) {
  console.log('Vue app mount', props);
  const { container } = window.__POWERED_BY_QIANKUN__ ? props : {};
  new Vue({
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

export async function unmount() {
  console.log('Vue app unmount');
  const instance = container ? container.__vue__ : null;
  if (instance) {
    instance.$destroy();
  }
}
```

3. **启动 Vue 子应用**：

```bash
npm run serve
```

## 遇到的问题及解决方法

- **CSS样式污染**：使用 CSS Modules 或者其他方式为组件添加作用域。
- **路由冲突**：确保各子应用的路由规则不会重叠。
- **资源加载问题**：检查网络请求是否正确，确保所有静态资源都可访问。
