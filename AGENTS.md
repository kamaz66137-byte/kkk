# AGENTS
## 项目说明
- 本项目基于Next.js v16.2 构建，足球红单推荐web应用,PC,移动端适配
- 主要功能包括：足球赛事、专家推荐、AI预测、足球资讯 四大板块
- 采用SSR和CSR混合渲染方式，提升性能和SEO表现
- 使用TypeScript进行类型安全开发，提升代码质量和可维护性
- 集成了AI智能推荐系统，提供个性化的足球赛事推荐和分析
- 设计了响应式UI界面，适配不同设备和屏幕尺寸，提供良好的用户体验
- 实现了用户注册、登录、收藏等功能，增强用户互动和粘性
- 采用了现代化的前端技术栈，包括React Hooks Prisma
- 项目结构清晰，模块化设计，便于团队协作和后续维护
- AGENTS辅助编程 Vs Code Github Copilot

## 指令关键词

| 关键词 | 含义 |
|--------|------|
| `[MUST]` | 必须遵守，不可违背 |
| `[MUSTNOT]` | 禁止行为，绝不允许 |
| `[ONLY]` | 只允许使用指定方式 |
| `[OPTIONAL]` | 可选，非必须 |

## [MUST] 严格遵守规范
| 指令 | 生效方式 |
|--------|------|
| [注释规范](.github/instructions/code.instructions.md) | 编写任何ts文件都生效 |
| [组件库规范](.github/instructions/components.instructions.md) | [组件](src/components/README.md) 生效 |




## 代码规范
- 使用TypeScript only ESM 进行开发，确保类型安全
- 代码注释必须遵循项目的代码注释标准，确保代码可读性和维护性
- 遵循React和Next.js的最佳实践，确保代码质量和性能


## 项目结构规范
```
src/
├── components/  # 可复用组件 tsx和ts代码必须分开
├── apps/        # 业务逻辑相关代码
├── pages/       # Next.js页面
├── styles/      # 样式文件
├── types/       # 类型定义
├── moke/       # 模拟数据必须json格式
└── utils/       # 工具函数
```

## 组件UI设计
- 