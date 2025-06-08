# FocusFlow

[English](#english) | [中文](#中文)

---

## 中文

FocusFlow 是一個功能豐富的任務管理系統，結合遊戲化元素，幫助用戶提高生產力和保持專注。系統採用微服務架構，提供個人任務管理、點數獎勵、每日任務、成就系統和點數商店等功能。

### 🎯 核心功能

#### ✅ 已完成功能

**第一階段 - 基礎任務管理**
- 🔐 用戶認證系統（註冊/登入/登出）
- 📝 任務管理（創建、編輯、刪除、完成）
- 📅 月曆視圖展示任務
- 🎨 響應式 UI 設計

**遊戲化系統**
- 💰 點數系統（完成任務獲得點數）
- 🎯 每日任務系統（5種不同類型的每日挑戰）
- 🏆 成就系統（9個不同稀有度的成就）
- 🛒 點數商店（購買點數、兌換商品）
- 🎴 Food TCG 卡包（3種不同稀有度的卡包）

**支付整合**
- 💳 Line Pay 支付整合
- 💎 點數購買系統
- 📦 商品兌換系統

#### 🚧 計劃功能

**第二階段 - 群組協作**
- 👥 群組管理
- 🤝 任務共享
- 💬 群組留言板

**第三階段 - 數據分析**
- 📊 任務分析
- 📈 數據視覺化
- 📋 趨勢報告

### 🛠 技術棧

**前端**
- React 18
- React Router
- Axios
- Tailwind CSS
- FullCalendar
- styled-jsx

**後端**
- Node.js
- Express
- MySQL
- JWT Authentication
- Sequelize ORM
- bcryptjs

**架構**
- 微服務架構
- RESTful API
- 服務間通信

### 🏗 系統架構

```
FocusFlow/
├── frontend/              # React 前端應用 (Port 3000)
├── user-service/          # 用戶服務 (Port 5001)
│   ├── 用戶認證
│   ├── 點數管理
│   ├── 每日任務
│   ├── 成就系統
│   ├── 商品管理
│   └── Line Pay 整合
├── task-service/          # 任務服務 (Port 5002)
│   ├── 任務 CRUD
│   └── 任務完成追蹤
└── 測試腳本
```

### 🎮 遊戲化功能詳解

#### 每日任務系統
- **每日登入**: 每天登入獲得 5 點
- **創建任務**: 今天創建 3 個新任務獲得 15 點
- **完成任務**: 今天完成 5 個任務獲得 25 點
- **任務達人**: 今天完成 10 個任務獲得 50 點
- **連續登入**: 連續登入 7 天獲得 100 點

#### 成就系統
- **任務新手** (普通): 完成第一個任務 (+20 點)
- **任務達人** (稀有): 累計完成 50 個任務 (+100 點)
- **任務大師** (史詩): 累計完成 200 個任務 (+300 點)
- **任務傳說** (傳說): 累計完成 500 個任務 (+1000 點)
- **點數收集者** (普通): 累計獲得 1000 點數 (+50 點)
- **點數大亨** (史詩): 累計獲得 10000 點數 (+200 點)
- **堅持不懈** (稀有): 連續登入 30 天 (+500 點)
- **早起鳥兒** (稀有): 早上 6-8 點完成 10 個任務 (+150 點)
- **夜貓子** (稀有): 晚上 10-12 點完成 10 個任務 (+150 點)

#### 點數商店
- **購買點數**: 透過 Line Pay 購買點數包
- **兌換商品**: 使用點數兌換實體商品
- **Food TCG 卡包**: 
  - 基礎卡包 (80 點)
  - 進階卡包 (150 點)
  - 傳說卡包 (300 點)

### 🚀 快速開始

#### 前置需求
- Node.js (v16+)
- MySQL (v8+)
- npm 或 yarn

#### 安裝步驟

1. **克隆專案**
```bash
git clone [repository-url]
cd FocusFlow
```

2. **安裝依賴**
```bash
# 安裝用戶服務依賴
cd user-service
npm install

# 安裝任務服務依賴
cd ../task-service
npm install

# 安裝前端依賴
cd ../frontend
npm install
```

3. **設置環境變數**
```bash
# 在 user-service 和 task-service 目錄下創建 .env 文件
# user-service/.env
DB_HOST=localhost
DB_NAME=focusflow
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
LINE_PAY_CHANNEL_ID=your_line_pay_channel_id
LINE_PAY_CHANNEL_SECRET=your_line_pay_channel_secret

# task-service/.env
DB_HOST=localhost
DB_NAME=focusflow_tasks
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

4. **初始化資料庫**
```bash
# 初始化商品
cd user-service
node scripts/initProducts.js

# 初始化每日任務
node scripts/initQuests.js

# 初始化成就
node scripts/initAchievements.js
```

5. **啟動服務**
```bash
# 啟動用戶服務 (Terminal 1)
cd user-service
npm start

# 啟動任務服務 (Terminal 2)
cd task-service
npm start

# 啟動前端服務 (Terminal 3)
cd frontend
npm start
```

6. **訪問應用**
- 前端應用: http://localhost:3000
- 用戶服務 API: http://localhost:5001
- 任務服務 API: http://localhost:5002

### 🧪 測試

```bash
# 測試完整系統流程
node test-complete-flow.js

# 測試點數商店功能
node test-store-functionality.js

# 測試每日任務和成就系統
node test-quests-achievements.js
```

### 📱 使用指南

1. **註冊/登入**: 創建帳戶或使用現有帳戶登入
2. **任務管理**: 在月曆視圖中創建和管理任務
3. **完成任務**: 標記任務為完成狀態獲得點數
4. **查看進度**: 點擊「每日任務」查看今日任務進度
5. **解鎖成就**: 達成里程碑自動解鎖成就
6. **購買點數**: 在點數商店購買點數包
7. **兌換商品**: 使用點數兌換 Food TCG 卡包或其他商品

---

## English

FocusFlow is a feature-rich task management system that combines gamification elements to help users improve productivity and maintain focus. Built with microservices architecture, it provides personal task management, point rewards, daily quests, achievement system, and points store.

### 🎯 Core Features

#### ✅ Completed Features

**Phase 1 - Basic Task Management**
- 🔐 User Authentication (Register/Login/Logout)
- 📝 Task Management (Create, Edit, Delete, Complete)
- 📅 Calendar View for Tasks
- 🎨 Responsive UI Design

**Gamification System**
- 💰 Points System (Earn points by completing tasks)
- 🎯 Daily Quest System (5 different types of daily challenges)
- 🏆 Achievement System (9 achievements with different rarities)
- 🛒 Points Store (Purchase points, redeem products)
- 🎴 Food TCG Card Packs (3 different rarity levels)

**Payment Integration**
- 💳 Line Pay Integration
- 💎 Points Purchase System
- 📦 Product Redemption System

#### 🚧 Planned Features

**Phase 2 - Group Collaboration**
- 👥 Group Management
- 🤝 Task Sharing
- 💬 Group Message Board

**Phase 3 - Data Analytics**
- 📊 Task Analysis
- 📈 Data Visualization
- 📋 Trend Reports

### 🛠 Tech Stack

**Frontend**
- React 18
- React Router
- Axios
- Tailwind CSS
- FullCalendar
- styled-jsx

**Backend**
- Node.js
- Express
- MySQL
- JWT Authentication
- Sequelize ORM
- bcryptjs

**Architecture**
- Microservices Architecture
- RESTful API
- Inter-service Communication

### 🏗 System Architecture

```
FocusFlow/
├── frontend/              # React Frontend App (Port 3000)
├── user-service/          # User Service (Port 5001)
│   ├── User Authentication
│   ├── Points Management
│   ├── Daily Quests
│   ├── Achievement System
│   ├── Product Management
│   └── Line Pay Integration
├── task-service/          # Task Service (Port 5002)
│   ├── Task CRUD
│   └── Task Completion Tracking
└── Test Scripts
```

### 🎮 Gamification Features

#### Daily Quest System
- **Daily Login**: Login daily to earn 5 points
- **Create Tasks**: Create 3 new tasks today to earn 15 points
- **Complete Tasks**: Complete 5 tasks today to earn 25 points
- **Task Master**: Complete 10 tasks today to earn 50 points
- **Login Streak**: Login for 7 consecutive days to earn 100 points

#### Achievement System
- **Task Rookie** (Common): Complete your first task (+20 points)
- **Task Expert** (Rare): Complete 50 tasks total (+100 points)
- **Task Master** (Epic): Complete 200 tasks total (+300 points)
- **Task Legend** (Legendary): Complete 500 tasks total (+1000 points)
- **Point Collector** (Common): Earn 1000 points total (+50 points)
- **Point Tycoon** (Epic): Earn 10000 points total (+200 points)
- **Persistent** (Rare): Login for 30 consecutive days (+500 points)
- **Early Bird** (Rare): Complete 10 tasks between 6-8 AM (+150 points)
- **Night Owl** (Rare): Complete 10 tasks between 10 PM-12 AM (+150 points)

#### Points Store
- **Purchase Points**: Buy point packages through Line Pay
- **Redeem Products**: Exchange points for physical products
- **Food TCG Card Packs**: 
  - Basic Pack (80 points)
  - Advanced Pack (150 points)
  - Legend Pack (300 points)

### 🚀 Quick Start

#### Prerequisites
- Node.js (v16+)
- MySQL (v8+)
- npm or yarn

#### Installation Steps

1. **Clone Repository**
```bash
git clone [repository-url]
cd FocusFlow
```

2. **Install Dependencies**
```bash
# Install user service dependencies
cd user-service
npm install

# Install task service dependencies
cd ../task-service
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Setup Environment Variables**
```bash
# Create .env files in user-service and task-service directories
# user-service/.env
DB_HOST=localhost
DB_NAME=focusflow
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
LINE_PAY_CHANNEL_ID=your_line_pay_channel_id
LINE_PAY_CHANNEL_SECRET=your_line_pay_channel_secret

# task-service/.env
DB_HOST=localhost
DB_NAME=focusflow_tasks
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

4. **Initialize Database**
```bash
# Initialize products
cd user-service
node scripts/initProducts.js

# Initialize daily quests
node scripts/initQuests.js

# Initialize achievements
node scripts/initAchievements.js
```

5. **Start Services**
```bash
# Start user service (Terminal 1)
cd user-service
npm start

# Start task service (Terminal 2)
cd task-service
npm start

# Start frontend (Terminal 3)
cd frontend
npm start
```

6. **Access Application**
- Frontend App: http://localhost:3000
- User Service API: http://localhost:5001
- Task Service API: http://localhost:5002

### 🧪 Testing

```bash
# Test complete system flow
node test-complete-flow.js

# Test points store functionality
node test-store-functionality.js

# Test daily quests and achievements
node test-quests-achievements.js
```

### 📱 User Guide

1. **Register/Login**: Create an account or login with existing credentials
2. **Task Management**: Create and manage tasks in the calendar view
3. **Complete Tasks**: Mark tasks as completed to earn points
4. **Check Progress**: Click "Daily Quests" to view today's quest progress
5. **Unlock Achievements**: Automatically unlock achievements by reaching milestones
6. **Purchase Points**: Buy point packages in the points store
7. **Redeem Products**: Use points to redeem Food TCG card packs or other products

### 🤝 Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

### 🙏 Acknowledgments

- React team for the amazing frontend framework
- Express.js for the robust backend framework
- Sequelize for the excellent ORM
- FullCalendar for the calendar component
- All contributors who helped make this project possible

[English](#english) | [中文](#中文)

---

## 中文

FocusFlow 是一個功能豐富的任務管理系統，結合遊戲化元素，幫助用戶提高生產力和保持專注。系統採用微服務架構，提供個人任務管理、點數獎勵、每日任務、成就系統和點數商店等功能。

### 🎯 核心功能

#### ✅ 已完成功能

**第一階段 - 基礎任務管理**
- 🔐 用戶認證系統（註冊/登入/登出）
- 📝 任務管理（創建、編輯、刪除、完成）
- 📅 月曆視圖展示任務
- 🎨 響應式 UI 設計

**遊戲化系統**
- 💰 點數系統（完成任務獲得點數）
- 🎯 每日任務系統（5種不同類型的每日挑戰）
- 🏆 成就系統（9個不同稀有度的成就）
- 🛒 點數商店（購買點數、兌換商品）
- 🎴 Food TCG 卡包（3種不同稀有度的卡包）

**支付整合**
- 💳 Line Pay 支付整合
- 💎 點數購買系統
- 📦 商品兌換系統

#### 🚧 計劃功能

**第二階段 - 群組協作**
- 👥 群組管理
- 🤝 任務共享
- 💬 群組留言板

**第三階段 - 數據分析**
- 📊 任務分析
- 📈 數據視覺化
- 📋 趨勢報告

### 🛠 技術棧

**前端**
- React 18
- React Router
- Axios
- Tailwind CSS
- FullCalendar
- styled-jsx

**後端**
- Node.js
- Express
- MySQL
- JWT Authentication
- Sequelize ORM
- bcryptjs

**架構**
- 微服務架構
- RESTful API
- 服務間通信

### 🏗 系統架構

```
FocusFlow/
├── frontend/              # React 前端應用 (Port 3000)
├── user-service/          # 用戶服務 (Port 5001)
│   ├── 用戶認證
│   ├── 點數管理
│   ├── 每日任務
│   ├── 成就系統
│   ├── 商品管理
│   └── Line Pay 整合
├── task-service/          # 任務服務 (Port 5002)
│   ├── 任務 CRUD
│   └── 任務完成追蹤
└── 測試腳本
```

### 🎮 遊戲化功能詳解

#### 每日任務系統
- **每日登入**: 每天登入獲得 5 點
- **創建任務**: 今天創建 3 個新任務獲得 15 點
- **完成任務**: 今天完成 5 個任務獲得 25 點
- **任務達人**: 今天完成 10 個任務獲得 50 點
- **連續登入**: 連續登入 7 天獲得 100 點

#### 成就系統
- **任務新手** (普通): 完成第一個任務 (+20 點)
- **任務達人** (稀有): 累計完成 50 個任務 (+100 點)
- **任務大師** (史詩): 累計完成 200 個任務 (+300 點)
- **任務傳說** (傳說): 累計完成 500 個任務 (+1000 點)
- **點數收集者** (普通): 累計獲得 1000 點數 (+50 點)
- **點數大亨** (史詩): 累計獲得 10000 點數 (+200 點)
- **堅持不懈** (稀有): 連續登入 30 天 (+500 點)
- **早起鳥兒** (稀有): 早上 6-8 點完成 10 個任務 (+150 點)
- **夜貓子** (稀有): 晚上 10-12 點完成 10 個任務 (+150 點)

#### 點數商店
- **購買點數**: 透過 Line Pay 購買點數包
- **兌換商品**: 使用點數兌換實體商品
- **Food TCG 卡包**: 
  - 基礎卡包 (80 點)
  - 進階卡包 (150 點)
  - 傳說卡包 (300 點)

### 🚀 快速開始

#### 前置需求
- Node.js (v16+)
- MySQL (v8+)
- npm 或 yarn

#### 安裝步驟

1. **克隆專案**
```bash
git clone [repository-url]
cd FocusFlow
```

2. **安裝依賴**
```bash
# 安裝用戶服務依賴
cd user-service
npm install

# 安裝任務服務依賴
cd ../task-service
npm install

# 安裝前端依賴
cd ../frontend
npm install
```

3. **設置環境變數**
```bash
# 在 user-service 和 task-service 目錄下創建 .env 文件
# user-service/.env
DB_HOST=localhost
DB_NAME=focusflow
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
LINE_PAY_CHANNEL_ID=your_line_pay_channel_id
LINE_PAY_CHANNEL_SECRET=your_line_pay_channel_secret

# task-service/.env
DB_HOST=localhost
DB_NAME=focusflow_tasks
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

4. **初始化資料庫**
```bash
# 初始化商品
cd user-service
node scripts/initProducts.js

# 初始化每日任務
node scripts/initQuests.js

# 初始化成就
node scripts/initAchievements.js
```

5. **啟動服務**
```bash
# 啟動用戶服務 (Terminal 1)
cd user-service
npm start

# 啟動任務服務 (Terminal 2)
cd task-service
npm start

# 啟動前端服務 (Terminal 3)
cd frontend
npm start
```

6. **訪問應用**
- 前端應用: http://localhost:3000
- 用戶服務 API: http://localhost:5001
- 任務服務 API: http://localhost:5002

### 🧪 測試

```bash
# 測試完整系統流程
node test-complete-flow.js

# 測試點數商店功能
node test-store-functionality.js

# 測試每日任務和成就系統
node test-quests-achievements.js
```

### 📱 使用指南

1. **註冊/登入**: 創建帳戶或使用現有帳戶登入
2. **任務管理**: 在月曆視圖中創建和管理任務
3. **完成任務**: 標記任務為完成狀態獲得點數
4. **查看進度**: 點擊「每日任務」查看今日任務進度
5. **解鎖成就**: 達成里程碑自動解鎖成就
6. **購買點數**: 在點數商店購買點數包
7. **兌換商品**: 使用點數兌換 Food TCG 卡包或其他商品

---

## English

FocusFlow is a feature-rich task management system that combines gamification elements to help users improve productivity and maintain focus. Built with microservices architecture, it provides personal task management, point rewards, daily quests, achievement system, and points store.

### 🎯 Core Features

#### ✅ Completed Features

**Phase 1 - Basic Task Management**
- 🔐 User Authentication (Register/Login/Logout)
- 📝 Task Management (Create, Edit, Delete, Complete)
- 📅 Calendar View for Tasks
- 🎨 Responsive UI Design

**Gamification System**
- 💰 Points System (Earn points by completing tasks)
- 🎯 Daily Quest System (5 different types of daily challenges)
- 🏆 Achievement System (9 achievements with different rarities)
- 🛒 Points Store (Purchase points, redeem products)
- 🎴 Food TCG Card Packs (3 different rarity levels)

**Payment Integration**
- 💳 Line Pay Integration
- 💎 Points Purchase System
- 📦 Product Redemption System

#### 🚧 Planned Features

**Phase 2 - Group Collaboration**
- 👥 Group Management
- 🤝 Task Sharing
- 💬 Group Message Board

**Phase 3 - Data Analytics**
- 📊 Task Analysis
- 📈 Data Visualization
- 📋 Trend Reports

### 🛠 Tech Stack

**Frontend**
- React 18
- React Router
- Axios
- Tailwind CSS
- FullCalendar
- styled-jsx

**Backend**
- Node.js
- Express
- MySQL
- JWT Authentication
- Sequelize ORM
- bcryptjs

**Architecture**
- Microservices Architecture
- RESTful API
- Inter-service Communication

### 🏗 System Architecture

```
FocusFlow/
├── frontend/              # React Frontend App (Port 3000)
├── user-service/          # User Service (Port 5001)
│   ├── User Authentication
│   ├── Points Management
│   ├── Daily Quests
│   ├── Achievement System
│   ├── Product Management
│   └── Line Pay Integration
├── task-service/          # Task Service (Port 5002)
│   ├── Task CRUD
│   └── Task Completion Tracking
└── Test Scripts
```

### 🎮 Gamification Features

#### Daily Quest System
- **Daily Login**: Login daily to earn 5 points
- **Create Tasks**: Create 3 new tasks today to earn 15 points
- **Complete Tasks**: Complete 5 tasks today to earn 25 points
- **Task Master**: Complete 10 tasks today to earn 50 points
- **Login Streak**: Login for 7 consecutive days to earn 100 points

#### Achievement System
- **Task Rookie** (Common): Complete your first task (+20 points)
- **Task Expert** (Rare): Complete 50 tasks total (+100 points)
- **Task Master** (Epic): Complete 200 tasks total (+300 points)
- **Task Legend** (Legendary): Complete 500 tasks total (+1000 points)
- **Point Collector** (Common): Earn 1000 points total (+50 points)
- **Point Tycoon** (Epic): Earn 10000 points total (+200 points)
- **Persistent** (Rare): Login for 30 consecutive days (+500 points)
- **Early Bird** (Rare): Complete 10 tasks between 6-8 AM (+150 points)
- **Night Owl** (Rare): Complete 10 tasks between 10 PM-12 AM (+150 points)

#### Points Store
- **Purchase Points**: Buy point packages through Line Pay
- **Redeem Products**: Exchange points for physical products
- **Food TCG Card Packs**: 
  - Basic Pack (80 points)
  - Advanced Pack (150 points)
  - Legend Pack (300 points)

### 🚀 Quick Start

#### Prerequisites
- Node.js (v16+)
- MySQL (v8+)
- npm or yarn

#### Installation Steps

1. **Clone Repository**
```bash
git clone [repository-url]
cd FocusFlow
```

2. **Install Dependencies**
```bash
# Install user service dependencies
cd user-service
npm install

# Install task service dependencies
cd ../task-service
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Setup Environment Variables**
```bash
# Create .env files in user-service and task-service directories
# user-service/.env
DB_HOST=localhost
DB_NAME=focusflow
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
LINE_PAY_CHANNEL_ID=your_line_pay_channel_id
LINE_PAY_CHANNEL_SECRET=your_line_pay_channel_secret

# task-service/.env
DB_HOST=localhost
DB_NAME=focusflow_tasks
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

4. **Initialize Database**
```bash
# Initialize products
cd user-service
node scripts/initProducts.js

# Initialize daily quests
node scripts/initQuests.js

# Initialize achievements
node scripts/initAchievements.js
```

5. **Start Services**
```bash
# Start user service (Terminal 1)
cd user-service
npm start

# Start task service (Terminal 2)
cd task-service
npm start

# Start frontend (Terminal 3)
cd frontend
npm start
```

6. **Access Application**
- Frontend App: http://localhost:3000
- User Service API: http://localhost:5001
- Task Service API: http://localhost:5002

### 🧪 Testing

```bash
# Test complete system flow
node test-complete-flow.js

# Test points store functionality
node test-store-functionality.js

# Test daily quests and achievements
node test-quests-achievements.js
```

### 📱 User Guide

1. **Register/Login**: Create an account or login with existing credentials
2. **Task Management**: Create and manage tasks in the calendar view
3. **Complete Tasks**: Mark tasks as completed to earn points
4. **Check Progress**: Click "Daily Quests" to view today's quest progress
5. **Unlock Achievements**: Automatically unlock achievements by reaching milestones
6. **Purchase Points**: Buy point packages in the points store
7. **Redeem Products**: Use points to redeem Food TCG card packs or other products

### 🤝 Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

### 🙏 Acknowledgments

- React team for the amazing frontend framework
- Express.js for the robust backend framework
- Sequelize for the excellent ORM
- FullCalendar for the calendar component
- All contributors who helped make this project possible 
