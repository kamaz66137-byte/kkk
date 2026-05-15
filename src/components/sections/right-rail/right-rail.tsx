/**
 * @packageDocumentation
 * @module components/sections/right-rail
 * @description PC 端右侧洞察侧边栏（≥1024px）
 */

import type { RightRailProps } from './types';

export function RightRail({ hotRanking, primaryColor, backgroundColor, brandName }: RightRailProps) {
  return (
    <aside className="hc-right-rail" aria-label="PC洞察区">
      <section className="hc-rail-card hc-rail-gradient">
        <p className="hc-rail-kicker">LIVE INSIGHT</p>
        <h3>热度雷达</h3>
        <p>来源：{brandName} 站点提取数据</p>
        <ul className="hc-hot-list">
          {hotRanking.map((item, index) => (
            <li key={item.id}>
              <span className="hc-hot-rank">TOP {index + 1}</span>
              <span className="hc-hot-name">{item.author}</span>
              <span className="hc-hot-league">{item.league}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="hc-rail-card">
        <h3>设计元素</h3>
        <p>新增双栏布局、数据雷达卡、品牌实验层，移动端保持轻量信息流。</p>
        <div className="hc-pill-row">
          <span>PC 双栏</span>
          <span>移动优先</span>
          <span>真实数据</span>
        </div>
      </section>

      <section className="hc-rail-card">
        <h3>视觉基线</h3>
        <p>Primary: {primaryColor}</p>
        <p>Background: {backgroundColor}</p>
        <p>Source: wap.hongcai.163.com</p>
      </section>
    </aside>
  );
}
