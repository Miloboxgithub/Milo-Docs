# WebSocket 学习笔记

## 1. 什么是WebSocket？

WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

## 2. WebSocket vs HTTP

- **HTTP**：传统的 HTTP 协议是无状态的，每次请求都需要建立一个新的连接。
- **WebSocket**：一旦连接建立，就可以保持打开状态，直到一方主动关闭或网络中断。

### 优势
- 减少延迟：不需要为每个请求重新建立连接。
- 节省带宽：减少了头部信息的重复发送。
- 实时性高：适用于需要实时交互的应用场景，如在线游戏、即时通讯等。

## 3. 建立WebSocket连接

### 客户端
```javascript
// 创建新的WebSocket实例
const socket = new WebSocket('ws://localhost:8080');

// 监听连接打开事件
socket.addEventListener('open', function (event) {
    console.log('Connection opened');
});

// 监听消息接收事件
socket.addEventListener('message', function (event) {
    console.log('Message from server:', event.data);
});

// 发送消息到服务器
socket.send('Hello Server!');

// 关闭连接
socket.close();
```

### 服务器（Node.js 示例）
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    // 向所有客户端广播消息
    ws.send('Hello Client!');
});
```

## 4. WebSocket 状态码

- `CONNECTING` (0): 连接正在进行中，还未完成。
- `OPEN` (1): 连接已成功建立，可以进行通信。
- `CLOSING` (2): 连接正在关闭。
- `CLOSED` (3): 连接已关闭或未能打开。

## 5. 错误处理

```javascript
socket.addEventListener('error', function (event) {
    console.error('WebSocket error observed:', event);
});
```

## 6. 应用场景

- 实时聊天应用
- 在线多人游戏
- 实时股票价格更新
- 即时协作工具（如Google Docs）

## 7. 实战应用——简易聊天Demo

- **初始化项目**：使用 `npm` 初始化一个新的 Node.js 项目。这将创建一个 `package.json` 文件。

  ```
  npm init -y
  ```

- **安装依赖**：安装 `ws` 库，这是用于处理 WebSocket 的库。

  ```
  npm install ws
  ```

- **创建服务器文件**（server.js）：

  ```
  import { createRequire } from 'module';
  const require = createRequire(import.meta.url);
  const WebSocket = require('ws');

  const wss = new WebSocket.Server({ port: 8080 });

  const state = {
      HEART: 1,
      MESSAGE: 2
  };

  wss.on('connection', (ws) => {
      console.log('连接 nodejs 服务器成功');

      ws.on('message', (message) => {
          console.log('接收到客户端发来的消息: ' + message);
          wss.clients.forEach((client) => {
              if (client.readyState === ws.OPEN) {
                  client.send(JSON.stringify({ state: state.MESSAGE, message: "我是nodejs服务器，我收到你的消息了" + message }));
              }
          });
      });

      let heartInterval = null;
      //心跳机制：服务器定期发送心跳消息给客户端，以保持连接活跃。如果 WebSocket 连接关闭，心跳机制会停止。
      const sendHeart = () => {
          if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({ state: state.HEART, message: "咚咚咚" }));
          } else {
              clearInterval(heartInterval);
          }
      };

      heartInterval = setInterval(sendHeart, 5000);

      ws.on('close', () => {
          clearInterval(heartInterval);
          console.log('客户端已断开连接');
      });

      ws.on('error', (error) => {
          console.error('WebSocket error:', error);
      });
  });
  ```


- **运行服务器**：
  在终端中，进入项目目录并运行以下命令来启动 WebSocket 服务器：

  ```
  node server.js
  ```

- **创建一个简单的 HTML 页面来作为客户端**(index.html)：

  在浏览器中打开它，查看控制台输出。

  ```
  <!DOCTYPE html>
  <html lang="en">

  <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>WebSocket Chat</title>
     <style>
        body {
           font-family: Arial, sans-serif;
           background-color: #f4f4f4;
           margin: 0;
           padding: 20px;
        }
        #container {
           max-width: 600px;
           margin: auto;
           background: #fff;
           padding: 20px;
           border-radius: 8px;
           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        #list {
           list-style: none;
           padding: 0;
        }
        #list li {
           padding: 8px;
           border-bottom: 1px solid #ddd;
           color: #333;
        }
        #input {
           width: calc(100% - 100px);
           padding: 10px;
           margin-right: 10px;
           border: 1px solid #ddd;
           border-radius: 4px;
        }
        button {
        margin-top: 5px;
        margin-left: 5px;
           padding: 10px 20px;
           border: none;
           border-radius: 4px;
           color: #fff;
           background-color: #5cb85c;
           cursor: pointer;
        }
        button:disabled {
           background-color: #ccc;
        }
        button#stop {
           background-color: #d9534f;
        }
     </style>
  </head>

  <body>

     <div id="container">
        <ul id="list"></ul>
        <input type="text" id="input" placeholder="Type a message...">
        <button id="send">发送</button>
        <button id="stop">断开</button>
     </div>

     <script>
        const list = document.querySelector('#list');
        const input = document.querySelector('#input');
        const btn = document.querySelector('#send');
        const stop = document.querySelector('#stop');
        const ws = new WebSocket('ws://localhost:8080');

        ws.addEventListener('open', () => {
           console.log('连接已打开');
           btn.disabled = false;
           stop.disabled = false;
        });

        ws.addEventListener('close', () => {
           console.log('连接已关闭');
           btn.disabled = true;
           stop.disabled = true;
        });

        ws.addEventListener('message', (e) => {
           let data = JSON.parse(e.data);
           const li = document.createElement('li');
           li.innerText = data.message;
           list.appendChild(li);
           list.scrollTop = list.scrollHeight; 
        });

        btn.addEventListener('click', () => {
           if (input.value.trim()) {
              ws.send(JSON.stringify({ message: input.value }));
              input.value = '';
           }
        });

        stop.addEventListener('click', () => {
           ws.close();
        });

        document.querySelector('form').addEventListener('submit', (e) => {
           e.preventDefault();
           btn.click();
        });
     </script>
  </body>

  </html>
  ```

## 8. 参考资料

- [MDN Web 文档 - WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

---

