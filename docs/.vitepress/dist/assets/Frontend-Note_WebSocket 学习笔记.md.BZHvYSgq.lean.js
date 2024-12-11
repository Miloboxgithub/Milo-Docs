import{_ as n,c as a,a3 as p,o as i}from"./chunks/framework.CpP5acwW.js";const d=JSON.parse('{"title":"WebSocket 学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"Frontend-Note/WebSocket 学习笔记.md","filePath":"Frontend-Note/WebSocket 学习笔记.md"}'),l={name:"Frontend-Note/WebSocket 学习笔记.md"};function e(t,s,h,c,k,o){return i(),a("div",null,s[0]||(s[0]=[p(`<h1 id="websocket-学习笔记" tabindex="-1">WebSocket 学习笔记 <a class="header-anchor" href="#websocket-学习笔记" aria-label="Permalink to &quot;WebSocket 学习笔记&quot;">​</a></h1><h2 id="_1-什么是websocket" tabindex="-1">1. 什么是WebSocket？ <a class="header-anchor" href="#_1-什么是websocket" aria-label="Permalink to &quot;1. 什么是WebSocket？&quot;">​</a></h2><p>WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。</p><h2 id="_2-websocket-vs-http" tabindex="-1">2. WebSocket vs HTTP <a class="header-anchor" href="#_2-websocket-vs-http" aria-label="Permalink to &quot;2. WebSocket vs HTTP&quot;">​</a></h2><ul><li><strong>HTTP</strong>：传统的 HTTP 协议是无状态的，每次请求都需要建立一个新的连接。</li><li><strong>WebSocket</strong>：一旦连接建立，就可以保持打开状态，直到一方主动关闭或网络中断。</li></ul><h3 id="优势" tabindex="-1">优势 <a class="header-anchor" href="#优势" aria-label="Permalink to &quot;优势&quot;">​</a></h3><ul><li>减少延迟：不需要为每个请求重新建立连接。</li><li>节省带宽：减少了头部信息的重复发送。</li><li>实时性高：适用于需要实时交互的应用场景，如在线游戏、即时通讯等。</li></ul><h2 id="_3-建立websocket连接" tabindex="-1">3. 建立WebSocket连接 <a class="header-anchor" href="#_3-建立websocket连接" aria-label="Permalink to &quot;3. 建立WebSocket连接&quot;">​</a></h2><h3 id="客户端" tabindex="-1">客户端 <a class="header-anchor" href="#客户端" aria-label="Permalink to &quot;客户端&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 创建新的WebSocket实例</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> socket</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> WebSocket</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ws://localhost:8080&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 监听连接打开事件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;open&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Connection opened&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 监听消息接收事件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;message&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Message from server:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, event.data);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 发送消息到服务器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello Server!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 关闭连接</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><h3 id="服务器-node-js-示例" tabindex="-1">服务器（Node.js 示例） <a class="header-anchor" href="#服务器-node-js-示例" aria-label="Permalink to &quot;服务器（Node.js 示例）&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> WebSocket</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ws&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> wss</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> WebSocket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Server</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ port: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8080</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">wss.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;connection&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> connection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ws.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;message&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> incoming</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">message</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;received: %s&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, message);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 向所有客户端广播消息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ws.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Hello Client!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h2 id="_4-websocket-状态码" tabindex="-1">4. WebSocket 状态码 <a class="header-anchor" href="#_4-websocket-状态码" aria-label="Permalink to &quot;4. WebSocket 状态码&quot;">​</a></h2><ul><li><code>CONNECTING</code> (0): 连接正在进行中，还未完成。</li><li><code>OPEN</code> (1): 连接已成功建立，可以进行通信。</li><li><code>CLOSING</code> (2): 连接正在关闭。</li><li><code>CLOSED</code> (3): 连接已关闭或未能打开。</li></ul><h2 id="_5-错误处理" tabindex="-1">5. 错误处理 <a class="header-anchor" href="#_5-错误处理" aria-label="Permalink to &quot;5. 错误处理&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;error&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;WebSocket error observed:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, event);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h2 id="_6-应用场景" tabindex="-1">6. 应用场景 <a class="header-anchor" href="#_6-应用场景" aria-label="Permalink to &quot;6. 应用场景&quot;">​</a></h2><ul><li>实时聊天应用</li><li>在线多人游戏</li><li>实时股票价格更新</li><li>即时协作工具（如Google Docs）</li></ul><h2 id="_7-实战应用——简易聊天demo" tabindex="-1">7. 实战应用——简易聊天Demo <a class="header-anchor" href="#_7-实战应用——简易聊天demo" aria-label="Permalink to &quot;7. 实战应用——简易聊天Demo&quot;">​</a></h2><ul><li><p><strong>初始化项目</strong>：使用 <code>npm</code> 初始化一个新的 Node.js 项目。这将创建一个 <code>package.json</code> 文件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm init -y</span></span></code></pre></div></li><li><p><strong>安装依赖</strong>：安装 <code>ws</code> 库，这是用于处理 WebSocket 的库。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install ws</span></span></code></pre></div></li><li><p><strong>创建服务器文件</strong>（server.js）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { createRequire } from &#39;module&#39;;</span></span>
<span class="line"><span>const require = createRequire(import.meta.url);</span></span>
<span class="line"><span>const WebSocket = require(&#39;ws&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const wss = new WebSocket.Server({ port: 8080 });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const state = {</span></span>
<span class="line"><span>    HEART: 1,</span></span>
<span class="line"><span>    MESSAGE: 2</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wss.on(&#39;connection&#39;, (ws) =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;连接 nodejs 服务器成功&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ws.on(&#39;message&#39;, (message) =&gt; {</span></span>
<span class="line"><span>        console.log(&#39;接收到客户端发来的消息: &#39; + message);</span></span>
<span class="line"><span>        wss.clients.forEach((client) =&gt; {</span></span>
<span class="line"><span>            if (client.readyState === ws.OPEN) {</span></span>
<span class="line"><span>                client.send(JSON.stringify({ state: state.MESSAGE, message: &quot;我是nodejs服务器，我收到你的消息了&quot; + message }));</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let heartInterval = null;</span></span>
<span class="line"><span>    //心跳机制：服务器定期发送心跳消息给客户端，以保持连接活跃。如果 WebSocket 连接关闭，心跳机制会停止。</span></span>
<span class="line"><span>    const sendHeart = () =&gt; {</span></span>
<span class="line"><span>        if (ws.readyState === ws.OPEN) {</span></span>
<span class="line"><span>            ws.send(JSON.stringify({ state: state.HEART, message: &quot;咚咚咚&quot; }));</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            clearInterval(heartInterval);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    heartInterval = setInterval(sendHeart, 5000);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ws.on(&#39;close&#39;, () =&gt; {</span></span>
<span class="line"><span>        clearInterval(heartInterval);</span></span>
<span class="line"><span>        console.log(&#39;客户端已断开连接&#39;);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ws.on(&#39;error&#39;, (error) =&gt; {</span></span>
<span class="line"><span>        console.error(&#39;WebSocket error:&#39;, error);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>});</span></span></code></pre></div></li><li><p><strong>运行服务器</strong>： 在终端中，进入项目目录并运行以下命令来启动 WebSocket 服务器：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>node server.js</span></span></code></pre></div></li><li><p><strong>创建一个简单的 HTML 页面来作为客户端</strong>(index.html)：</p><p>在浏览器中打开它，查看控制台输出。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>   &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>   &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;</span></span>
<span class="line"><span>   &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>   &lt;title&gt;WebSocket Chat&lt;/title&gt;</span></span>
<span class="line"><span>   &lt;style&gt;</span></span>
<span class="line"><span>      body {</span></span>
<span class="line"><span>         font-family: Arial, sans-serif;</span></span>
<span class="line"><span>         background-color: #f4f4f4;</span></span>
<span class="line"><span>         margin: 0;</span></span>
<span class="line"><span>         padding: 20px;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      #container {</span></span>
<span class="line"><span>         max-width: 600px;</span></span>
<span class="line"><span>         margin: auto;</span></span>
<span class="line"><span>         background: #fff;</span></span>
<span class="line"><span>         padding: 20px;</span></span>
<span class="line"><span>         border-radius: 8px;</span></span>
<span class="line"><span>         box-shadow: 0 2px 4px rgba(0,0,0,0.1);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      #list {</span></span>
<span class="line"><span>         list-style: none;</span></span>
<span class="line"><span>         padding: 0;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      #list li {</span></span>
<span class="line"><span>         padding: 8px;</span></span>
<span class="line"><span>         border-bottom: 1px solid #ddd;</span></span>
<span class="line"><span>         color: #333;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      #input {</span></span>
<span class="line"><span>         width: calc(100% - 100px);</span></span>
<span class="line"><span>         padding: 10px;</span></span>
<span class="line"><span>         margin-right: 10px;</span></span>
<span class="line"><span>         border: 1px solid #ddd;</span></span>
<span class="line"><span>         border-radius: 4px;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      button {</span></span>
<span class="line"><span>      margin-top: 5px;</span></span>
<span class="line"><span>      margin-left: 5px;</span></span>
<span class="line"><span>         padding: 10px 20px;</span></span>
<span class="line"><span>         border: none;</span></span>
<span class="line"><span>         border-radius: 4px;</span></span>
<span class="line"><span>         color: #fff;</span></span>
<span class="line"><span>         background-color: #5cb85c;</span></span>
<span class="line"><span>         cursor: pointer;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      button:disabled {</span></span>
<span class="line"><span>         background-color: #ccc;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      button#stop {</span></span>
<span class="line"><span>         background-color: #d9534f;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>   &lt;/style&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   &lt;div id=&quot;container&quot;&gt;</span></span>
<span class="line"><span>      &lt;ul id=&quot;list&quot;&gt;&lt;/ul&gt;</span></span>
<span class="line"><span>      &lt;input type=&quot;text&quot; id=&quot;input&quot; placeholder=&quot;Type a message...&quot;&gt;</span></span>
<span class="line"><span>      &lt;button id=&quot;send&quot;&gt;发送&lt;/button&gt;</span></span>
<span class="line"><span>      &lt;button id=&quot;stop&quot;&gt;断开&lt;/button&gt;</span></span>
<span class="line"><span>   &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   &lt;script&gt;</span></span>
<span class="line"><span>      const list = document.querySelector(&#39;#list&#39;);</span></span>
<span class="line"><span>      const input = document.querySelector(&#39;#input&#39;);</span></span>
<span class="line"><span>      const btn = document.querySelector(&#39;#send&#39;);</span></span>
<span class="line"><span>      const stop = document.querySelector(&#39;#stop&#39;);</span></span>
<span class="line"><span>      const ws = new WebSocket(&#39;ws://localhost:8080&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ws.addEventListener(&#39;open&#39;, () =&gt; {</span></span>
<span class="line"><span>         console.log(&#39;连接已打开&#39;);</span></span>
<span class="line"><span>         btn.disabled = false;</span></span>
<span class="line"><span>         stop.disabled = false;</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ws.addEventListener(&#39;close&#39;, () =&gt; {</span></span>
<span class="line"><span>         console.log(&#39;连接已关闭&#39;);</span></span>
<span class="line"><span>         btn.disabled = true;</span></span>
<span class="line"><span>         stop.disabled = true;</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ws.addEventListener(&#39;message&#39;, (e) =&gt; {</span></span>
<span class="line"><span>         let data = JSON.parse(e.data);</span></span>
<span class="line"><span>         const li = document.createElement(&#39;li&#39;);</span></span>
<span class="line"><span>         li.innerText = data.message;</span></span>
<span class="line"><span>         list.appendChild(li);</span></span>
<span class="line"><span>         list.scrollTop = list.scrollHeight; </span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      btn.addEventListener(&#39;click&#39;, () =&gt; {</span></span>
<span class="line"><span>         if (input.value.trim()) {</span></span>
<span class="line"><span>            ws.send(JSON.stringify({ message: input.value }));</span></span>
<span class="line"><span>            input.value = &#39;&#39;;</span></span>
<span class="line"><span>         }</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      stop.addEventListener(&#39;click&#39;, () =&gt; {</span></span>
<span class="line"><span>         ws.close();</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      document.querySelector(&#39;form&#39;).addEventListener(&#39;submit&#39;, (e) =&gt; {</span></span>
<span class="line"><span>         e.preventDefault();</span></span>
<span class="line"><span>         btn.click();</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>   &lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre></div></li></ul><h2 id="_8-参考资料" tabindex="-1">8. 参考资料 <a class="header-anchor" href="#_8-参考资料" aria-label="Permalink to &quot;8. 参考资料&quot;">​</a></h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket" target="_blank" rel="noreferrer">MDN Web 文档 - WebSocket</a></li></ul><hr>`,23)]))}const E=n(l,[["render",e]]);export{d as __pageData,E as default};
