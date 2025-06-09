# FocusFlow Micro Frontend 架構

## 架構概述

此項目採用 Webpack Module Federation 實現的微前端架構，將原本的單體前端應用拆分為以下獨立的微前端應用：

### 微前端應用分工
- **Shell (Port 3000)**: 主應用殼層，負責路由和微前端編排
- **Auth (Port 3001)**: 認證功能 - Login, Register
- **Tasks (Port 3002)**: 任務管理 - TasksPage
- **Quests (Port 3003)**: 任務系統 - QuestsPage
- **Store (Port 3004)**: 點數商店 - PointsStore
- **Payment (Port 3005)**: 支付功能 - PaymentResult

## 設置步驟

### 1. 安裝依賴
```bash
cd microfrontends
npm install
npm run install:all
```

### 2. 完成其他微前端設置

目前已完成 Shell 和 Auth 微前端的設置。你需要完成其他微前端的設置：

#### 為每個微前端創建 src 目錄和組件：

**Tasks 微前端:**
```bash
mkdir -p tasks/src
```
- 複製 `frontend/src/TasksPage.js` 到 `tasks/src/TasksPage.js`
- 創建 `tasks/src/index.html`

**Quests 微前端:**
```bash
mkdir -p quests/src
```
- 複製 `frontend/src/QuestsPage.js` 到 `quests/src/QuestsPage.js`
- 創建 `quests/src/index.html`
- 創建 webpack.config.js (port 3003)

**Store 微前端:**
```bash
mkdir -p store/src
```
- 複製 `frontend/src/PointsStore.js` 到 `store/src/PointsStore.js`
- 創建 `store/src/index.html`
- 創建 webpack.config.js (port 3004)

**Payment 微前端:**
```bash
mkdir -p payment/src
```
- 複製 `frontend/src/PaymentResult.js` 到 `payment/src/PaymentResult.js`
- 創建 `payment/src/index.html`
- 創建 webpack.config.js (port 3005)

### 3. 創建 Webpack 配置模板

每個微前端需要類似以下的 webpack.config.js：

```javascript
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: [對應端口],
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "[微前端名稱]",
      filename: "remoteEntry.js",
      exposes: {
        "./[組件名稱]": "./src/[組件文件名]",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

### 4. 啟動所有微前端
```bash
npm start
```

這會同時啟動所有微前端應用：
- Shell: http://localhost:3000
- Auth: http://localhost:3001  
- Tasks: http://localhost:3002
- Quests: http://localhost:3003
- Store: http://localhost:3004
- Payment: http://localhost:3005

## 開發流程

1. **獨立開發**: 每個微前端可以獨立開發和測試
2. **整合測試**: 透過 Shell 應用進行整合測試
3. **獨立部署**: 每個微前端可以獨立部署和版本控制

## 優勢

✅ **獨立開發**: 各團隊可以獨立開發不同的功能模組  
✅ **技術多樣性**: 可以使用不同的技術棧和版本  
✅ **獨立部署**: 降低部署風險，支持漸進式更新  
✅ **可擴展性**: 容易添加新的微前端應用  
✅ **故障隔離**: 單個微前端的問題不會影響整個應用  

## 注意事項

⚠️ **依賴共享**: 注意 React 等共享依賴的版本一致性  
⚠️ **狀態管理**: 跨微前端的狀態共享需要特別設計  
⚠️ **路由協調**: 確保路由配置的一致性  
⚠️ **樣式隔離**: 避免 CSS 樣式衝突 