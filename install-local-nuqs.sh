#!/bin/bash

# 安装本地 nuqs 包的脚本
# 构建本地 nuqs 包并安装

set -e  # 遇到错误时退出

NUQS_ROOT="/Users/xren/dev/gensmusic/nuqs"
NUQS_PACKAGE_PATH="$NUQS_ROOT/packages/nuqs"

echo "🔨 构建本地 nuqs 包..."
cd "$NUQS_PACKAGE_PATH"
pnpm build
cd - > /dev/null

echo "🧹 清理项目缓存..."
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf dist

echo "📦 移除当前的 nuqs 包..."
pnpm remove nuqs || true

echo "🔗 安装本地 nuqs 包..."
pnpm add file:"$NUQS_PACKAGE_PATH"

echo "✅ 本地 nuqs 包安装完成！"
echo "💡 现在可以运行 'pnpm dev' 启动开发服务器"
