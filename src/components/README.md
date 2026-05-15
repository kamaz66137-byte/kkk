# Components Overview

本目录采用「一个组件一个文件夹」结构。每个文件夹都对应一个明确的 UI 组件，并在目录内拆分 `types.ts`、实现文件、组件样式文件和 `index.ts` 出口。

## 样式放置规则

以下规则为强制规则：

- 全局基础样式放在 [src/app/globals.css](../app/globals.css)。
- 页面专属样式放在对应页面专属样式文件中，例如 [src/static/home.css](../static/home.css)。
- [MUST] 组件专属样式必须放在对应组件目录内，和组件实现文件同级管理（例如 `pc-header.css`、`rank-banner.css`）。
- [MUSTNOT] 禁止把组件专属样式直接写回页面样式文件（例如 `src/static/home.css`）。
- [ONLY] 首页组件样式只允许通过 [src/static/home.css](../static/home.css) 的 `@import` 统一按需加载。
- 样式分层说明和维护约定见 [src/styles/README.md](../styles/README.md)。
- 新增、修改、删除组件时，如果样式放置方式变化，必须同步更新这里和 [src/styles/README.md](../styles/README.md)。

## 组件目录标准结构

每个组件目录按以下结构维护：

- `README.md`：组件说明、职责、输入输出和维护约束。
- `types.ts`：组件类型定义，禁止与视图实现混写。
- `组件名.tsx`：组件视图实现。
- `组件名.css`：组件专属样式。
- `index.ts`：统一导出入口。


## Layout

| 组件 | 说明 | 文档 |
|---|---|---|
| PC 顶部导航栏 | 桌面端顶部导航，展示品牌、主导航和 VIP 入口 | [pc-header](./layout/pc-header/README.md) |
| 移动端顶部导航栏 | 小屏顶部导航，展示品牌和 VIP 入口 | [mobile-header](./layout/mobile-header/README.md) |
| 移动端底部导航栏 | 底部固定导航，展示首页、专家推荐、AI算法、热点咨询和我的 | [bottom-nav](./layout/bottom-nav/README.md) |

## Sections

| 组件 | 说明 | 文档 |
|---|---|---|
| 红人榜轮播 Banner | 顶部轮播图与分类标签区域 | [rank-banner](./sections/rank-banner/README.md) |
| 专家头像网格 | 红人榜专家头像列表 | [expert-grid](./sections/expert-grid/README.md) |
| 推荐赛事实时卡片 | 推荐对阵、比分和快捷入口卡片 | [live-section](./sections/live-section/README.md) |
| 方案信息流 | 筛选栏和方案卡片列表 | [feed-section](./sections/feed-section/README.md) |
| 右侧洞察栏 | PC 端热度雷达与品牌说明卡片 | [right-rail](./sections/right-rail/README.md) |
| 下载引导条 | 底部下载提示文案展示 | [download-bar](./sections/download-bar/README.md) |
| 分页导航 | 列表上一页 / 下一页与页码展示 | [pager](./sections/pager/README.md) |


