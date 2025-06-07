# FocusFlow

FocusFlow 是一個任務管理系統，幫助用戶追蹤和管理他們的任務。系統提供個人任務管理、群組協作和任務分析功能。

## 功能特點

### 第一階段
- 用戶認證（註冊/登入/登出）
- 任務管理（CRUD 操作）
- 月曆視圖展示任務

### 第二階段
- 群組管理
- 任務共享
- 群組留言板

### 第三階段
- 任務分析
- 數據視覺化
- 趨勢報告

## 技術棧

### 前端
- React
- React Router
- Axios
- Tailwind CSS
- React Calendar

### 後端
- Node.js
- Express
- MySQL
- JWT Authentication
- Sequelize ORM

## 設置指南

### 前置需求
- Node.js (v14+)
- MySQL (v8+)
- npm 或 yarn

### 安裝步驟

1. 克隆專案
```bash
git clone [repository-url]
cd focusflow
```

2. 安裝依賴
```bash
# 安裝後端依賴
cd backend
npm install

# 安裝前端依賴
cd ../frontend
npm install
```

3. 設置環境變數
```bash
# 在 backend 目錄下創建 .env 文件
cp .env.example .env
# 編輯 .env 文件，設置必要的環境變數
```

4. 初始化資料庫
```bash
cd backend
npm run db:init
```

5. 啟動開發服務器
```bash
# 啟動後端服務器
cd backend
npm run dev

# 啟動前端服務器
cd frontend
npm start
```

## 開發指南

### 目錄結構
```
focusflow/
├── frontend/          # React 前端應用
├── backend/           # Node.js 後端服務
└── docs/             # 專案文檔
```

### 開發工作流程
1. 創建新的功能分支
2. 實現功能
3. 編寫測試
4. 提交 Pull Request

## 貢獻指南
請參考 CONTRIBUTING.md 文件了解如何參與專案開發。

## 授權
MIT License 