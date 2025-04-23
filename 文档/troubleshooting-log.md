# 排查页面切换缓慢问题及相关构建错误日志

本文档记录了尝试解决 `taxonomy` 项目页面切换缓慢问题以及在此过程中遇到的相关构建错误所采取的步骤。

**初始问题:** 页面切换缓慢，尤其是在开发模式 (`pnpm dev`) 下（最初在 Docker 环境观察到）。

**排查过程:**

1.  **初步运行 `pnpm dev` (本地):** 遇到 `markdown-wasm` 解析错误。
2.  **尝试清除缓存 (本地):** 无效。
3.  **尝试删除 `node_modules` 并重装 (本地):** 无效。
4.  **网络搜索并应用 pnpm overrides (本地):** 无效。
5.  **固定 Contentlayer 版本 (本地):** 将 `contentlayer` 固定为 `0.3.1`，无效。
6.  **转换 Next.js 配置文件格式 (本地):** 将 `next.config.mjs` 转为 `next.config.js`，处理 `require()` ESM 错误。**解决 `markdown-wasm` 错误。**
7.  **解决类型检查错误 (本地):**
    - `components/icons.tsx`: `LucideIcon` 类型错误，修改为 `typeof LucideIcon` 解决。
    - `components/theme-provider.tsx`: `ThemeProviderProps` 类型错误。升级 `next-themes` 到 `^0.3.0` 未解决。修改为 `React.ComponentProps<typeof NextThemesProvider>` 解决。
    - `components/ui/alert-dialog.tsx`: `className` 不存在于 `AlertDialogPortalProps`。尝试多种修复失败。使用 `shadcn` CLI 更新 `alert-dialog` 组件解决。
    - `components/ui/dialog.tsx`: `className` 不存在于 `DialogPortalProps`。使用 `shadcn` CLI 更新 `dialog` 组件解决。
    - `components/ui/sheet.tsx`: `className` 不存在于 `SheetPortalProps`。使用 `shadcn` CLI 更新 `sheet` 组件解决。
8.  **解决 `WasmHash` 构建错误 (本地):**
    - 构建时出现 `TypeError: Cannot read properties of undefined (reading 'length')`。
    - 更新 `next` 到稳定版 `^13.5.6`。
    - 再次删除 `.next` 缓存解决。
9.  **解决 App Router 路由冲突 (本地):**
    - `pnpm build` 失败，报告 `parallel pages` 错误。
    - 移除 `next.config.js` 中的 `experimental.appDir`。
    - 用户手动删除冲突路由 (`app/login`, `app/register`) 并移动 `app/settings` 到 `app/(dashboard)/settings`。
10. **解决 MDX 渲染错误 (本地):**
    - `pnpm build` 在静态页面生成阶段失败，报告 `Cannot access Image.propTypes on the server`。
    - 修改 `components/mdx-components.tsx`，为 `next/image` 使用包装器组件解决。
11. **本地构建成功:**
    - 再次运行 `pnpm build`，成功完成构建！
12. **返回 Docker 环境测试:**
    - **下一步:** 重新构建 Docker 镜像，并在 Docker 容器内测试页面切换性能，以验证最初的问题是否解决。

---

**重要说明:** 近期的排错步骤主要在本地 Windows 环境进行，旨在解决阻止项目构建和运行的基础错误。这些修复是必要的，但性能问题可能还受 Docker 环境特定因素影响，需在修复构建问题后返回 Docker 进行最终验证。
