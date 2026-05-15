/**
 * @packageDocumentation
 * @module components/sections/live-section
 * @description 推荐赛事实时卡片 + 快捷入口
 */

import type { LiveSectionProps } from './types';
import Image from 'next/image';

export function LiveSection({ recommendations, entryCards }: LiveSectionProps) {
  return (
    <section className="hc-live" aria-label="推荐赛事">
      {recommendations.map((item) => (
        <article key={item.id} className="hc-live-card">
          <header className="hc-live-head">
            <p className="hc-live-tag">{item.tag}</p>
            <p className="hc-live-status">{item.status}</p>
          </header>
          <div className="hc-live-team-row">
            <Image src={item.home_logo} alt={item.home} className="hc-team-logo" width={18} height={18} />
            <span className="hc-team-name">{item.home}</span>
            <strong className="hc-team-score">{item.home_score}</strong>
          </div>
          <div className="hc-live-team-row">
            <Image src={item.away_logo} alt={item.away} className="hc-team-logo" width={18} height={18} />
            <span className="hc-team-name">{item.away}</span>
            <strong className="hc-team-score">{item.away_score}</strong>
          </div>
        </article>
      ))}
      <div className="hc-entry-grid">
        {entryCards.map((entry) => (
          <article key={entry.id} className="hc-entry-card">
            <p className="hc-entry-title">{entry.title}</p>
            <p className="hc-entry-subtitle">{entry.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
