# 使用 .nvmrc 文件中指定的 Node.js 版本
ARG NODE_VERSION=16.18.0
FROM node:${NODE_VERSION}-alpine

# 设置工作目录
WORKDIR /app

# 安装 pnpm v8 (兼容 Node.js 16)
# 考虑国内环境，使用淘宝镜像
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm@8

# 复制依赖描述文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
# 使用 --force 忽略 lockfile 版本不兼容问题
RUN pnpm install --force

# 复制 Prisma schema 文件
COPY prisma ./prisma/

# 生成 Prisma Client
RUN pnpm exec prisma generate

# 复制项目代码
COPY . .

# 暴露 Next.js 默认端口
EXPOSE 3000

# 启动开发服务器
CMD ["pnpm", "dev"] 