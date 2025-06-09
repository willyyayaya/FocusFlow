# 🚀 FocusFlow Micro Frontend 快速啟動指南

## 🎯 概覽

你的 FocusFlow 應用已經成功轉換為微前端架構！使用 Webpack Module Federation 實現，將原本的單體前端拆分為 6 個獨立的微前端應用。

## 📁 目錄結構

```
FocusFlow/
├── frontend/           # 原有的單體前端 (保留作參考)
├── microfrontends/     # 新的微前端架構
│   ├── shell/         # 主應用殼層 (Port 3000) ✅
│   ├── auth/          # 認證功能 (Port 3001) ✅
│   ├── tasks/         # 任務管理 (Port 3002)
│   ├── quests/        # 任務系統 (Port 3003)
│   ├── store/         # 點數商店 (Port 3004)
│   ├── payment/       # 支付功能 (Port 3005)
│   └── setup-remaining-mfes.sh # 自動化設置腳本
```

## 🔧 快速設置

### 步驟 1: 執行自動化設置腳本

```bash
cd FocusFlow/microfrontends
./setup-remaining-mfes.sh
```

### 步驟 2: 安裝所有依賴

```bash
npm install
npm run install:all
```

### 步驟 3: 啟動所有微前端

```bash
npm start
```

## 🌐 訪問應用

啟動後，你可以訪問：

- **主應用**: http://localhost:3000 (Shell - 統一入口)
- **認證服務**: http://localhost:3001 (獨立測試認證功能)
- **任務管理**: http://localhost:3002 (獨立測試任務功能)
- **任務系統**: http://localhost:3003 (獨立測試任務系統)
- **點數商店**: http://localhost:3004 (獨立測試商店功能)
- **支付結果**: http://localhost:3005 (獨立測試支付功能)

## ✨ 微前端優勢

### 🔧 開發優勢
- **獨立開發**: 每個功能模組可以獨立開發和部署
- **技術自由**: 各模組可以使用不同的技術棧
- **團隊分工**: 不同團隊可以負責不同的微前端
- **並行開發**: 功能開發不會相互阻塞

### 🚀 部署優勢
- **獨立部署**: 單個功能更新不影響其他功能
- **漸進式更新**: 支持逐步升級和回滾
- **負載分散**: 可以分別針對不同功能進行性能優化
- **故障隔離**: 單個微前端的問題不會影響整個應用

### 💡 維護優勢
- **代碼隔離**: 降低代碼耦合度
- **測試獨立**: 每個微前端可以獨立測試
- **版本管理**: 各模組可以獨立版本控制
- **擴展性**: 容易添加新功能模組

## 🔄 開發工作流

### 1. 獨立開發
```bash
# 只啟動特定微前端進行開發
cd microfrontends/auth
npm start
```

### 2. 整合測試
```bash
# 啟動所有微前端進行整合測試
cd microfrontends
npm start
```

### 3. 獨立部署
```bash
# 構建特定微前端
cd microfrontends/auth
npm run build
```

## ⚠️ 注意事項

### 共享依賴
- React、React-DOM、React-Router-DOM 已設置為共享依賴
- 確保所有微前端使用相同版本的核心依賴

### 狀態管理
- 目前使用 localStorage 進行簡單狀態共享
- 如需複雜狀態管理，可考慮實現事件總線或使用狀態管理庫

### 樣式隔離
- 每個微前端的樣式已經隔離
- 避免使用全局 CSS 類名以防止樣式衝突

## 🛠️ 進階配置

### 添加新微前端
1. 在 `microfrontends/` 下創建新目錄
2. 添加 `package.json` 和 `webpack.config.js`
3. 在 `shell/webpack.config.js` 中添加 remote 配置
4. 在 `shell/src/App.js` 中添加路由

### 生產環境配置
- 修改各微前端的 `webpack.config.js` mode 為 "production"
- 配置適當的 CDN 和域名
- 設置環境變量管理不同環境的配置

## 🔗 相關連結

- [Webpack Module Federation 文檔](https://webpack.js.org/concepts/module-federation/)
- [微前端架構指南](https://micro-frontends.org/)
- [React 微前端最佳實踐](https://blog.bitsrc.io/how-to-develop-microfrontends-using-react-step-by-step-guide-47ebb479cacd)

---

🎉 恭喜！你的 FocusFlow 應用現在已經成功轉換為現代化的微前端架構！ 