#!/bin/bash

echo "🚀 正在設置剩餘的微前端應用..."

# 設置 Tasks 微前端
echo "📝 設置 Tasks 微前端..."
mkdir -p tasks/src
cp ../frontend/src/TasksPage.js tasks/src/TasksPage.js

cat > tasks/src/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FocusFlow - 任務管理</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOF

# 設置 Quests 微前端
echo "🎯 設置 Quests 微前端..."
mkdir -p quests/src
cp ../frontend/src/QuestsPage.js quests/src/QuestsPage.js

cat > quests/package.json << 'EOF'
{
  "name": "quests",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2",
    "axios": "^1.9.0",
    "@fullcalendar/daygrid": "^6.1.17",
    "@fullcalendar/interaction": "^6.1.17",
    "@fullcalendar/react": "^6.1.17"
  },
  "devDependencies": {
    "@babel/core": "^7.22.5",
    "@babel/preset-react": "^7.22.5",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.8.1",
    "html-webpack-plugin": "^5.5.3",
    "style-loader": "^3.3.3",
    "webpack": "^5.88.1",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "scripts": {
    "start": "webpack serve --config webpack.config.js --mode development",
    "build": "webpack --config webpack.config.js --mode production"
  }
}
EOF

cat > quests/webpack.config.js << 'EOF'
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3003,
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
      name: "quests",
      filename: "remoteEntry.js",
      exposes: {
        "./QuestsPage": "./src/QuestsPage",
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
EOF

cat > quests/src/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FocusFlow - 任務系統</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOF

# 設置 Store 微前端
echo "🛒 設置 Store 微前端..."
mkdir -p store/src
cp ../frontend/src/PointsStore.js store/src/PointsStore.js

cat > store/package.json << 'EOF'
{
  "name": "store",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2",
    "axios": "^1.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.5",
    "@babel/preset-react": "^7.22.5",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.8.1",
    "html-webpack-plugin": "^5.5.3",
    "style-loader": "^3.3.3",
    "webpack": "^5.88.1",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "scripts": {
    "start": "webpack serve --config webpack.config.js --mode development",
    "build": "webpack --config webpack.config.js --mode production"
  }
}
EOF

cat > store/webpack.config.js << 'EOF'
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3004,
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
      name: "store",
      filename: "remoteEntry.js",
      exposes: {
        "./PointsStore": "./src/PointsStore",
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
EOF

cat > store/src/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FocusFlow - 點數商店</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOF

# 設置 Payment 微前端
echo "💳 設置 Payment 微前端..."
mkdir -p payment/src
cp ../frontend/src/PaymentResult.js payment/src/PaymentResult.js

cat > payment/package.json << 'EOF'
{
  "name": "payment",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2",
    "axios": "^1.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.22.5",
    "@babel/preset-react": "^7.22.5",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.8.1",
    "html-webpack-plugin": "^5.5.3",
    "style-loader": "^3.3.3",
    "webpack": "^5.88.1",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "scripts": {
    "start": "webpack serve --config webpack.config.js --mode development",
    "build": "webpack --config webpack.config.js --mode production"
  }
}
EOF

cat > payment/webpack.config.js << 'EOF'
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3005,
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
      name: "payment",
      filename: "remoteEntry.js",
      exposes: {
        "./PaymentResult": "./src/PaymentResult",
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
EOF

cat > payment/src/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>FocusFlow - 支付結果</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOF

echo "✅ 所有微前端設置完成！"
echo ""
echo "🔧 接下來請執行："
echo "   cd microfrontends"
echo "   npm install"
echo "   npm run install:all"
echo "   npm start"
echo ""
echo "🌐 啟動後可以訪問："
echo "   Shell: http://localhost:3000"
echo "   Auth: http://localhost:3001"
echo "   Tasks: http://localhost:3002"
echo "   Quests: http://localhost:3003"
echo "   Store: http://localhost:3004"
echo "   Payment: http://localhost:3005" 