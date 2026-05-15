# 项目上下文

## 1. 项目定位
- 项目名称：A足球（Next.js Web）
- 目标：提供足球赛事、专家推荐、AI预测、热点资讯四大内容板块
- 端侧策略：移动端优先，同时兼容 PC

## 2. 技术与运行形态
- 框架：Next.js（App Router）
- 语言：TypeScript
- 渲染：SSR + CSR 混合
- 数据：当前以 `src/moke/**` 的 JSON 模拟数据驱动页面
- 样式：页面样式与组件样式分层管理

## 3. 目录结构约定（核心）
- `src/app`：路由页面与布局
- `src/components/layout`：全局骨架类组件（Header、Bottom Nav）
- `src/components/sections`：页面区块组件（Banner、列表、侧栏等）
- `src/moke`：模拟数据
- `src/types`：类型定义
- `src/utils`：工具函数
- `src/static` / `src/styles`：页面或全局样式资源

## 4. 业务板块与路由映射（当前）
- 首页：`/`
- 足球赛事：`/match`
- 专家推荐：`/expertall/1`（列表）与 `/expert/[id]`（详情）
- AI预测：`/ai`，子页面 `/ai/models`、`/ai/recommend/[id]`
- 热点资讯：`/hot`，详情 `/hot/[id]`
- 我的：`/my`

## 5. 数据流（当前实现）
- 主要入口数据来自 `src/moke/index.ts` 的统一导出
- 页面通过 moke 数据直接渲染，不依赖后端接口
- 推荐详情等页面通过 URL 参数查找对应 moke 项

## 6. 组件规范要点
- 一个组件一个目录
- 每个组件目录必须具备：实现文件、`types.ts`、`index.ts`、专属 CSS、目录 `README.md`
- 组件专属样式必须与组件同级，禁止写入页面级或全局样式文件
- 对外导入必须走目录入口

## 7. 当前状态摘要
- 已具备首页与主要业务页面骨架
- 已存在 AI、热点、专家相关核心页面
- 已新增足球赛事基础页 `/match`，用于承接四大板块中的赛事入口
- 目前仍以 mock 数据为主，后续可平滑替换为接口层

## 8. 建议下一步
1. 抽离统一 API 适配层（保留 moke 兜底）
2. 建立页面级 SEO 元信息策略（title/description/OG）
3. 给 `/match`、`/hot`、`/expertall` 统一筛选与分页交互
4. 增加关键路径测试（路由可达、数据映射、详情页参数校验）
