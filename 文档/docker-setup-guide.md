#在新电脑上使用 Docker 运行 Shadow 项目指南

本文档旨在指导如何在新的开发环境中，使用 Docker 和 Docker Compose 快速启动并运行 "Shadow" 实验室管理系统项目。

## 常用命令速查

以下是在设置和日常开发中可能用到的一些主要命令（请在项目根目录下运行）：

- **克隆仓库:** `git clone <你的仓库 URL>`
- **进入目录:** `cd <项目目录>`
- **安装 pnpm (全局):** `npm install -g pnpm`
- **复制环境变量文件:** `cp .env.example .env.local`
- **生成 NEXTAUTH_SECRET:** `openssl rand -base64 32`
- **首次构建并启动 Docker 服务:** `docker-compose up --build`
- **启动 Docker 服务:** `docker-compose up`
- **停止 Docker 服务:** 在运行 `docker-compose up` 的终端按 `Ctrl + C`
- **停止并移除 Docker 容器/网络:** `docker-compose down`
- **进入应用容器内部:** `docker exec -it taxonomy-app sh`
- **添加 Shadcn UI 组件 (在宿主机):** `pnpm dlx shadcn@latest add <component_name>`

---

## 1. 先决条件

在开始之前，请确保你的新电脑上安装了以下软件：

1.  **Docker Desktop:** 从 Docker 官网下载并安装适合你操作系统的 Docker Desktop。对于 Windows，建议使用基于 WSL 2 的后端。
2.  **Git:** 用于克隆项目代码仓库和后续的版本控制。
3.  **(可选) 代码编辑器:** 如 VS Code 或 Cursor。
4.  **pnpm (推荐安装):** 虽然项目主要在 Docker 内运行，但**强烈推荐**在你的宿主机上也安装 pnpm。这主要用于在本地运行 `shadcn` CLI 命令来添加新的 UI 组件 (如 `pnpm dlx shadcn@latest add button`)。可以通过 `npm install -g pnpm` 安装。

## 2. 获取项目代码

使用 Git 克隆项目仓库到你的本地电脑：

```bash
git clone <你的仓库 URL>
cd <项目目录> # 例如 cd taxonomy-main
```

## 3. 配置环境变量

项目依赖一些环境变量来运行，特别是数据库连接和认证密钥。

1.  **复制示例文件:** 在项目根目录下，将 `.env.example` 文件复制一份并重命名为 `.env.local`。
    ```bash
    cp .env.example .env.local
    ```
2.  **编辑 `.env.local`:** 打开 `.env.local` 文件，根据你的需求进行配置：
    *   `NEXTAUTH_SECRET`: **必须**替换为你自己生成的强随机字符串（可以使用 `openssl rand -base64 32` 命令生成）。
    *   `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: 如果需要 GitHub 登录，填入你申请的 GitHub OAuth App 凭据。
    *   `DATABASE_URL`: **保持注释掉或删除**。因为我们使用 Docker Compose，数据库连接信息会由 `docker-compose.yml` 文件中的 `environment` 部分提供，直接连接到 Docker 网络中的数据库容器。
    *   其他变量（如 Postmark、Stripe）应保持注释掉或删除，因为相关功能已移除或禁用。

## 4. 首次启动 (构建镜像并运行)

打开你的终端 (例如 Git Bash, PowerShell, 或其他 Linux/macOS 终端)，确保你位于项目根目录下。

运行以下命令来构建 Docker 镜像并首次启动服务：

```bash
docker-compose up --build
```

*   `--build` 参数会强制根据 `Dockerfile` 和 `docker-compose.yml` 文件重新构建镜像。
*   这个过程会下载基础镜像、安装 npm 依赖、生成 Prisma Client 等，首次运行可能需要几分钟时间。
*   注意观察终端输出，确保没有报错。

**可能遇到的坑及解决方案 (首次构建时):**

*   **`pnpm` Lockfile 不兼容:**
    *   **现象:** 构建日志中出现类似 `ERR_PNPM_LOCKFILE_BREAKING_CHANGE` 的错误。
    *   **原因:** 本地环境生成 `pnpm-lock.yaml` 的 pnpm 版本与 `Dockerfile` 中安装的 pnpm 版本不兼容。
    *   **当前修复:** `Dockerfile` 中已将 `pnpm install --frozen-lockfile` 修改为 `pnpm install --force`，以忽略此错误继续安装。
*   **网络问题:**
    *   **现象:** 下载基础镜像 (`node:16.18.0-alpine`) 或安装 npm 包 (`pnpm install`) 时速度缓慢或失败。
    *   **解决方案:** 配置 Docker Desktop 使用国内镜像加速器（如阿里云、网易云等）。`Dockerfile` 中已配置 pnpm 使用淘宝镜像源 (`registry.npmmirror.com`)。

等待日志显示数据库 (`taxonomy-db`) 和应用 (`taxonomy-app`) 都成功启动，特别是看到类似 `ready - started server on 0.0.0.0:3000` 的信息。

## 5. 访问应用

在浏览器中打开 `http://localhost:3000` 即可访问应用程序。

## 6. 后续启动

在首次成功构建和启动后，以后再想启动项目，只需要在项目根目录下运行：

```bash
docker-compose up
```

如果修改了 `Dockerfile` 或希望强制重新构建，才需要再次使用 `docker-compose up --build`。

## 7. 开发与调试

*   **添加 UI 组件:** 如果需要添加新的 `shadcn/ui` 组件 (例如 `button`, `dialog` 等)，你需要在**宿主机**的项目根目录下运行以下命令 (确保已安装 pnpm):
    ```bash
    pnpm dlx shadcn@latest add <component_name> 
    ```
    例如: `pnpm dlx shadcn@latest add dialog`。添加后可能需要重启 Docker 服务 (`Ctrl+C` 然后 `docker-compose up`)。
*   **热重载/手动刷新:**
    *   **现状:** 经过排查，在当前的 Docker (Windows + WSL 2) 环境下，**自动热重载可能无法正常工作**（即修改代码后浏览器不会自动更新）。
    *   **解决方案:** 修改代码并保存后，需要**手动在浏览器中进行硬刷新 (按 Ctrl+Shift+R 或 Cmd+Shift+R)** 才能看到更改。我们已在 `docker-compose.yml` 中为 `app` 服务添加了 `WATCHPACK_POLLING: "true"` 环境变量，这似乎确保了手动刷新时能获取到最新代码。
    *   **记录的尝试:** 曾尝试过 `CHOKIDAR_USEPOLLING=true` 但无效；曾尝试简化卷挂载但导致了启动错误。
*   **Google Fonts 问题:**
    *   **现状:** 容器可能无法连接 Google Fonts 下载字体 (如 Inter)，导致日志报错并使用备用字体。
    *   **当前处理:** 已在 `app/layout.tsx` 中注释掉 Inter 字体的加载逻辑。视觉上会使用默认字体。
    *   **待办:** 参考 `文档/TODO.md`，后续应下载字体文件到 `assets/fonts` 并使用 `next/font/local` 加载。
*   **查看日志:** 在 `docker-compose up` 运行的终端可以实时看到应用和数据库的日志。
*   **进入容器:** 如果需要检查容器内部状态或执行命令，可以打开新的终端运行 `docker exec -it taxonomy-app sh`。

## 8. 停止服务

在运行 `docker-compose up` 的终端按 `Ctrl + C` 即可停止所有服务。

如果想彻底移除容器和网络（但不包括数据库数据卷），可以运行 `docker-compose down`。

```bash
docker-compose down
```

---

遵循以上步骤，你应该可以在新电脑上顺利地通过 Docker 运行和开发本项目。 