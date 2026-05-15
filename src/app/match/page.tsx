/**
 * @packageDocumentation
 * @module app/match/page
 * @description 足球赛事基础页（移动端优先）
 */

import Link from 'next/link';
import { mokeFeed, mokeQuickEntry } from '@/moke';

/**
 * @interface MatchDisplayItem
 * @description 赛事展示项
 */
interface MatchDisplayItem {
  readonly id: string;
  readonly matchDate: string;
  readonly match: string;
  readonly league: string;
  readonly playType: string;
  readonly status: string;
  readonly href: string;
}

/**
 * @function resolveStatusLabel
 * @description 统一赛事状态展示文案
 * @param {string | undefined} rawStatus 原始状态
 * @returns {string} 展示状态
 */
function resolveStatusLabel(rawStatus?: string): string {
  if (!rawStatus) {
    return '待开赛';
  }

  return rawStatus;
}

/**
 * @function MatchPage
 * @description 足球赛事页，汇总近期推荐比赛与入口
 * @returns {JSX.Element}
 */
export default function MatchPage() {
  const recommendations = mokeQuickEntry.recommendations;

  const matchItems: readonly MatchDisplayItem[] = recommendations.map((item, index) => {
    const matchedFeed = mokeFeed.items[index];

    return {
      id: item.id,
      matchDate: item.match_date ?? '--',
      match: `${item.home} VS ${item.away}`,
      league: matchedFeed?.league ?? '焦点赛事',
      playType: matchedFeed?.play_types.join(' / ') ?? '单场',
      status: resolveStatusLabel(item.status),
      href: matchedFeed ? `/recommend/${matchedFeed.id}` : '/hot',
    };
  });

  const liveCount = matchItems.filter((item) => item.status.includes('进行')).length;
  const upcomingCount = matchItems.length - liveCount;

  return (
    <main className="page">
      <section className="wrap" aria-label="足球赛事">
        <header className="hero">
          <p className="kicker">MATCH CENTER</p>
          <h1 className="title">足球赛事</h1>
          <p className="desc">聚合今日重点场次与推荐入口，优先展示可直接进入的推荐详情。</p>

          <div className="metrics">
            <article className="metricCard">
              <p className="metricLabel">赛事总数</p>
              <p className="metricValue">{matchItems.length}</p>
            </article>
            <article className="metricCard">
              <p className="metricLabel">进行中</p>
              <p className="metricValue">{liveCount}</p>
            </article>
            <article className="metricCard">
              <p className="metricLabel">待开赛</p>
              <p className="metricValue">{upcomingCount}</p>
            </article>
          </div>
        </header>

        <section className="board" aria-label="赛事列表">
          <ul className="list">
            {matchItems.map((item, index) => (
              <li key={item.id}>
                <Link href={item.href} className="card">
                  <div className="cardTop">
                    <p className="rank">#{index + 1}</p>
                    <p className="league">{item.league}</p>
                    <p className="status">{item.status}</p>
                  </div>

                  <h2 className="match">{item.match}</h2>

                  <div className="metaRow">
                    <span className="meta">日期 {item.matchDate}</span>
                    <span className="meta">玩法 {item.playType}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="actions" aria-label="快捷入口">
            <Link href="/expertall/1" className="actionBtn">查看专家推荐</Link>
            <Link href="/ai" className="actionBtn primary">查看AI预测</Link>
          </div>
        </section>
      </section>

      <style>{`
        .page {
          min-height: 100dvh;
          padding: 14px 12px 28px;
          background:
            radial-gradient(820px 260px at 100% -12%, rgba(59, 130, 246, 0.18), transparent 60%),
            radial-gradient(700px 220px at 0% -12%, rgba(16, 185, 129, 0.16), transparent 60%),
            #f5f8fc;
        }

        .wrap {
          width: min(100%, 1024px);
          margin: 0 auto;
          display: grid;
          gap: 12px;
        }

        .hero {
          border-radius: 18px;
          padding: 16px;
          color: #ffffff;
          background: linear-gradient(138deg, #0f172a 0%, #1e3a8a 56%, #0f766e 100%);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 14px 36px rgba(15, 23, 42, 0.2);
        }

        .kicker {
          font-size: 11px;
          letter-spacing: 0.18em;
          font-weight: 800;
          color: #93c5fd;
        }

        .title {
          margin-top: 8px;
          font-size: 30px;
          line-height: 1.08;
          font-weight: 900;
        }

        .desc {
          margin-top: 8px;
          color: rgba(241, 245, 249, 0.9);
          font-size: 14px;
          line-height: 1.7;
        }

        .metrics {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .metricCard {
          border-radius: 12px;
          padding: 10px;
          background: rgba(15, 23, 42, 0.26);
          border: 1px solid rgba(203, 213, 225, 0.2);
        }

        .metricLabel {
          font-size: 11px;
          color: rgba(226, 232, 240, 0.86);
        }

        .metricValue {
          margin-top: 6px;
          font-size: 22px;
          font-weight: 900;
        }

        .board {
          border-radius: 18px;
          border: 1px solid #d5deea;
          background: #ffffff;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
          padding: 12px;
        }

        .list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 10px;
        }

        .card {
          display: block;
          text-decoration: none;
          color: #0f172a;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          background: linear-gradient(168deg, #ffffff 0%, #f8fafc 100%);
          padding: 12px;
        }

        .cardTop {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rank,
        .league,
        .status {
          min-height: 24px;
          padding: 0 10px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          font-weight: 700;
        }

        .rank {
          background: #e0e7ff;
          color: #3730a3;
        }

        .league {
          background: #ecfeff;
          color: #0f766e;
        }

        .status {
          background: #fee2e2;
          color: #991b1b;
        }

        .match {
          margin-top: 10px;
          font-size: 17px;
          line-height: 1.4;
          font-weight: 900;
        }

        .metaRow {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .meta {
          font-size: 12px;
          color: #334155;
          background: #f1f5f9;
          border-radius: 999px;
          padding: 0 10px;
          min-height: 24px;
          display: inline-flex;
          align-items: center;
        }

        .actions {
          margin-top: 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .actionBtn {
          min-height: 40px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          background: #f1f5f9;
          color: #0f172a;
          border: 1px solid #d4dce8;
        }

        .actionBtn.primary {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        @media (min-width: 1024px) {
          .page {
            padding: 20px 16px 32px;
          }

          .wrap {
            gap: 14px;
          }

          .hero {
            padding: 20px;
          }

          .title {
            font-size: 34px;
          }

          .actions {
            width: 420px;
          }
        }
      `}</style>
    </main>
  );
}
