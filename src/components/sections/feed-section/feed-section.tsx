/**
 * @packageDocumentation
 * @module components/sections/feed-section
 * @description 方案信息流 + 筛选栏
 */

import type { FeedSectionProps } from './types';
import Image from 'next/image';
import Link from 'next/link';

export function FeedSection({ items, filters }: FeedSectionProps) {
  return (
    <>
      <section className="hc-filter" aria-label="筛选栏目">
        {filters.map((filter, index) => (
          <button key={filter} type="button" className="hc-filter-item">
            <span className={index === 0 ? 'hc-filter-text is-active' : 'hc-filter-text'}>
              {filter}
            </span>
          </button>
        ))}
      </section>

      <section className="hc-feed" aria-label="方案信息流">
        {items.map((item) => (
          <article key={item.id} className="hc-feed-card">
            <header className="hc-feed-head">
              <Image src={item.avatar} alt={item.author} className="hc-feed-avatar" width={24} height={24} />
              <div className="hc-feed-profile">
                <p className="hc-feed-author-line">
                  <span className="hc-feed-author">{item.author}</span>
                  <span className="hc-feed-record">{item.record}</span>
                </p>
                <p className="hc-feed-role">
                  {item.role}{item.speciality ? ` ${item.speciality}` : ''}
                </p>
              </div>
              <p className="hc-feed-rate"><strong>100</strong>命中率%</p>
            </header>
            <h3 className="hc-feed-title">
              <Link href={`/recommend/${item.id}`} className="hc-feed-title-link">
                [{item.play_types.join('][')}]
                {item.title}
              </Link>
            </h3>
            <p className="hc-feed-meta">{item.category} {item.date} {item.league}</p>
            <p className="hc-feed-match">{item.match}</p>
            <footer className="hc-feed-foot">
              <span>{item.published}</span>
              <span className="hc-feed-foot-right">
                <span className="hc-feed-price">{item.price}</span>
                <Link href={`/recommend/${item.id}`} className="hc-feed-detail-link">查看详情</Link>
              </span>
            </footer>
          </article>
        ))}
      </section>
    </>
  );
}
