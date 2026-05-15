# pager

复用分页导航组件，用于列表页的上一页、下一页和当前页状态展示。

## 职责

- 渲染上一页 / 下一页按钮
- 展示当前页与总页数
- 通过 `buildHref` 适配不同列表路由

## 使用场景

- [src/app/expertall/[id]/page.tsx](../../../app/expertall/[id]/page.tsx)
- [src/app/hot/page.tsx](../../../app/hot/page.tsx)
