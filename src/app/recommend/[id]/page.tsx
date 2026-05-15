/**
 * @packageDocumentation
 * @module app/recommend/[id]/page
 * @description 推荐详情页
 */

import { notFound } from 'next/navigation';
import { mokeExperts, mokeFeed } from '@/moke';
import styles from './recommend.module.css';

/**
 * @interface RecommendDetailPageProps
 * @description 推荐详情页参数
 */
interface RecommendDetailPageProps {
  readonly params: Promise<{ id: string }>;
}

/**
 * @function RecommendDetailPage
 * @description 推荐详情页
 * @param {RecommendDetailPageProps} props
 * @returns {Promise<JSX.Element>}
 */
export default async function RecommendDetailPage({ params }: RecommendDetailPageProps) {
  const { id } = await params;

  const feedItem = mokeFeed.items.find((item) => item.id === id);

  if (!feedItem) {
    notFound();
  }

  const expert = mokeExperts.experts.find((item) => item.id === feedItem.expert_id);
  const recentTotal = expert?.recent_total ?? 0;
  const recentHit = expert?.recent_hit ?? 0;
  const winRateNumber = recentTotal > 0 ? Math.round((recentHit / recentTotal) * 100) : 0;
  const winRate = `${winRateNumber}%`;
  const playTypeText = feedItem.play_types.join(' / ');
  const confidenceLevel = winRateNumber >= 70 ? '高' : winRateNumber >= 50 ? '中' : '谨慎';
  const suggestSide = feedItem.match.split(' VS ')[0] ?? feedItem.match;

  return (
    <main className={styles.recommendPage}>
      <section className={styles.recommendWrap} aria-label="推荐详情">
        <header className={styles.recommendHero}>
          <p className={styles.recommendBadge}>{feedItem.category} · {playTypeText}</p>
          <h1 className={styles.recommendTitle}>{feedItem.title}</h1>
          <p className={styles.recommendSummary}>{feedItem.match}</p>
          <div className={styles.recommendMeta} aria-label="赛事摘要">
            <span className={styles.recommendMetaTag}>{feedItem.league}</span>
            <span className={styles.recommendMetaTag}>{feedItem.date}</span>
            <span className={styles.recommendMetaTag}>{feedItem.published}</span>
            <span className={styles.recommendMetaTag}>{feedItem.price}</span>
          </div>
        </header>

        <section className={styles.recommendCard} aria-label="赛事信息">
          <h2 className={styles.recommendCardTitle}>赛事信息</h2>
          <div className={styles.recommendGrid}>
            <p><span>联赛</span>{feedItem.league}</p>
            <p><span>日期</span>{feedItem.date}</p>
            <p><span>发布时间</span>{feedItem.published}</p>
            <p><span>订阅价格</span>{feedItem.price}</p>
          </div>
        </section>

        <section className={styles.recommendCard} aria-label="推荐内容">
          <h2 className={styles.recommendCardTitle}>推荐内容</h2>

          <div className={styles.pickBox}>
            <p className={styles.pickLabel}>推荐方向</p>
            <p className={styles.pickText}>{suggestSide} 不败（主推 {playTypeText}）</p>
            <p className={styles.pickMeta}>信心等级：{confidenceLevel}</p>
          </div>

          <ul className={styles.reasonList}>
            <li>近期命中率为 {winRate}，当前状态具备连续跟踪价值。</li>
            <li>本场为 {feedItem.league} 关键对阵，数据热度与关注度较高。</li>
            <li>专家方向与擅长联赛标签一致，建议优先使用单关策略控制波动。</li>
          </ul>

          <p className={styles.riskNote}>
            风险提示：临场阵容、盘口变化和伤停信息可能改变最终方向，建议开赛前 30 分钟二次确认。
          </p>
        </section>

      </section>
    </main>
  );
}
