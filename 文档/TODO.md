# 项目待办事项

- [ ] **字体整合:**
  - 下载 Inter 字体文件 (不同字重)。
  - 将字体文件添加到 `assets/fonts/` 目录。
  - 修改 `app/layout.tsx`，使用 `next/font/local` 加载本地 Inter 字体，替换掉之前注释掉的 `next/font/google` 逻辑，并恢复 `--font-sans` CSS 变量的应用。 
  ## TODO List

- [ ] **导航重复/不协调**: `app/(dashboard)/layout.tsx` 现在使用了全局的 `SiteHeader`，同时保留了侧边栏的 `DashboardNav`。需要检查这两个导航之间是否存在功能或链接上的重复，以及视觉风格是否协调。可能需要调整 `SiteHeader` 或 `DashboardNav` 的内容，或者移除其中一个。
- [ ] **字体加载**: (之前的 TODO) 检查字体是否按预期加载，解决 Google Fonts 错误（如果恢复加载的话）。
- [ ] **Linter 错误**: 解决合并过程中引入的 Linter 错误，特别是与 `Button` 组件 `asChild` 和 `size` 属性相关的错误。
- [ ] **页面性能优化**: 使用 `@next/bundle-analyzer` 分析页面包大小，识别并优化加载缓慢的页面。