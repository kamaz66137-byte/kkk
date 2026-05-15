/**
 * @packageDocumentation
 * @module app/hot/page
 * @description 热点资讯列表页
 */

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { mokeHot } from '@/moke';
import { resolveHotCategoryLabel } from '@/moke/hot';
import { Pager } from '@/components/sections/pager';
import styles from './hot.module.css';

interface HotPageProps {
  readonly searchParams: Promise<{ page?: string }>;
}

const todayCardStyle: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid #d4dbe7',
  borderRadius: '18px',
  backgroundImage:
    'radial-gradient(360px 180px at 100% -18%, rgba(248, 113, 113, 0.22), transparent 74%), linear-gradient(168deg, #ffffff 0%, #f8fafc 54%, #eef2ff 100%)',
  boxShadow: '0 14px 36px rgba(15, 23, 42, 0.12)',
};

const todayCardAccentStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '4px',
  background: 'linear-gradient(90deg, #dc2626 0%, #f97316 48%, #f59e0b 100%)',
};

const todayTitleStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '28px',
  padding: '0 11px',
  borderRadius: '999px',
  background: '#fde8e8',
  color: '#991b1b',
  fontSize: '13px',
  fontWeight: 900,
};

const todayTextStyle: CSSProperties = {
  marginTop: '10px',
  color: '#1e293b',
  fontSize: '13px',
  lineHeight: 1.78,
};

const todayListStyle: CSSProperties = {
  marginTop: '12px',
  display: 'grid',
  gap: '10px',
};

const todayItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '10px 10px 10px 12px',
  borderRadius: '12px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  color: '#0f172a',
  fontSize: '13px',
  lineHeight: 1.55,
  fontWeight: 700,
};

const todayDotStyle: CSSProperties = {
  marginTop: '5px',
  width: '8px',
  height: '8px',
  borderRadius: '999px',
  background: '#dc2626',
  boxShadow: '0 0 0 4px rgba(220, 38, 38, 0.12)',
  flex: '0 0 auto',
};

const todayItemTextStyle: CSSProperties = {
  flex: '1 1 auto',
};

export default async function HotPage({ searchParams }: HotPageProps) {
  const items = mokeHot.items;
  const { page } = await searchParams;
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const requestedPage = Number(page ?? '1');
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(Math.floor(requestedPage), 1), totalPages)
    : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleItems = items.slice(startIndex, startIndex + pageSize);
  const buildHref = (targetPage: number) => (targetPage <= 1 ? '/hot' : `/hot?page=${targetPage}`);
  const breakingCount = items.filter((item) => item.isBreaking).length;
  const latestItem = items[0];
  const totalViews = items.reduce((sum, item) => sum + item.views, 0);
  const topLeague = items.find((item) => item.league)?.league;
  const latestId = latestItem?.id;
  const hotTips = visibleItems.slice(0, 3);

  return (
    <main className={styles.page}>
      <section className={styles.wrap} aria-label="热点资讯列表">
        <header className={styles.hero}>
          <p className={styles.kicker}>HOT NEWS FEED</p>
          <h1 className={styles.title}>热点资讯</h1>
          <p className={styles.desc}>
            汇总赛前伤停、阵容动态、转会消息和赛事前瞻，帮助你在第一时间抓到最有价值的足球资讯。
          </p>

          <div className={styles.stats}>
            <article className={styles.statCard}>
              <p className={styles.statLabel}>最新更新</p>
              <p className={styles.statValue}>{latestItem?.publishedAt ?? '--'}</p>
            </article>
            <article className={styles.statCard}>
              <p className={styles.statLabel}>热讯数量</p>
              <p className={styles.statValue}>{breakingCount}</p>
            </article>
            <article className={styles.statCard}>
              <p className={styles.statLabel}>总浏览量</p>
              <p className={styles.statValue}>{totalViews.toLocaleString()}</p>
            </article>
          </div>
        </header>

        <section className={styles.contentLayout}>
          <div className={styles.listCard}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>资讯列表</h2>
              <p className={styles.sectionSub}>第 {currentPage} / {totalPages} 页 · {items.length} 条内容</p>
            </div>

            <ul className={styles.list}>
              {visibleItems.map((item) => (
                <li key={item.id}>
                  <Link href={`/hot/${item.id}`} className={styles.itemLink}>
                    <article className={styles.item}>
                      <div className={styles.itemTop}>
                        <span className={styles.badge}>{resolveHotCategoryLabel(item.category)}</span>
                        {item.league ? <span className={styles.league}>{item.league}</span> : null}
                        {item.isBreaking ? <span className={styles.meta}>即时</span> : null}
                      </div>

                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <p className={styles.itemSummary}>{item.summary}</p>

                      <div className={styles.itemFooter}>
                        <div className={styles.tags}>
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={`${item.id}-${tag}`} className={styles.tag}>{tag}</span>
                          ))}
                        </div>
                        <span>{item.source} · {item.publishedAt}</span>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>

            <div className={styles.pagerWrap}>
              <Pager currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
            </div>
          </div>

          <aside className={styles.sideGrid} aria-label="热点摘要">
            <section className={styles.sideCard} style={todayCardStyle}>
              <span aria-hidden="true" style={todayCardAccentStyle} />
              <h2 className={styles.sideTitle} style={todayTitleStyle}>今日热点</h2>
              <p className={styles.sideText} style={todayTextStyle}>
                当前热点{topLeague ? `聚焦 ${topLeague}` : ''}，共 {items.length} 条资讯，即时条目 {breakingCount} 条。
              </p>
              <ul className={styles.sideList} style={todayListStyle}>
                {hotTips.map((item) => (
                  <li key={item.id} style={todayItemStyle}>
                    <span aria-hidden="true" style={todayDotStyle} />
                    <span style={todayItemTextStyle}>{item.league ? `${item.league} · ` : ''}{item.title}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.sideCard}>
              <h2 className={styles.sideTitle}>快速入口</h2>
              <p className={styles.sideText}>当前页优先条目：</p>
              <div className={styles.chipRow}>
                {visibleItems.slice(0, 4).map((item) => (
                  <Link key={item.id} href={`/hot/${item.id}`} className={styles.chip}>
                    {resolveHotCategoryLabel(item.category)} · {item.publishedAt}
                  </Link>
                ))}
              </div>
            </section>

            <section className={styles.sideCard}>
              <h2 className={styles.sideTitle}>导航说明</h2>
              <p className={styles.sideText}>
                当前在第 {currentPage} / {totalPages} 页，可继续查看最新详情或返回首页。
              </p>
              <div className={styles.backActions}>
                <Link href="/" className={styles.backBtn}>返回首页</Link>
                <Link href={latestId ? `/hot/${latestId}` : '/hot'} className={styles.primaryBtn}>查看最新详情</Link>
              </div>
            </section>
          </aside>
        </section>

      </section>
    </main>
  );
}
