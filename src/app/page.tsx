/**
 * @packageDocumentation
 * @module pages/home
 * @since 1.0.0
 * @author zkali
 * @tags [page, home, site-clone]
 * @description 首页 - A足球（Server Component）
 * @path src/app/page.tsx
 */

import { mokeExperts, mokeFeed, mokeFooter, mokeNavigation, mokeQuickEntry, SITE_META } from '@/moke';
import '@/static/home.css';
import { RankBanner } from '@/components/sections/rank-banner';
import { ExpertGrid } from '@/components/sections/expert-grid';
import { LiveSection } from '@/components/sections/live-section';
import { FeedSection } from '@/components/sections/feed-section';
import { RightRail } from '@/components/sections/right-rail';
import { DownloadBar } from '@/components/sections/download-bar';

/**
 * @function HomePage
 * @description 应用首页
 * @returns {JSX.Element}
 */
export default function HomePage() {
  const now = new Date();
  const currentDate = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  /**
   * @function resolveRecommendationStatus
   * @description 根据比赛日期自动收口推荐状态
   * @param {string} rawStatus 原始状态文案
   * @param {string | undefined} matchDate 比赛日期，格式 MM-DD
   * @returns {string} 展示状态文案
   */
  const resolveRecommendationStatus = (rawStatus: string, matchDate?: string): string => {
    if (!matchDate) {
      return rawStatus;
    }

    return matchDate < currentDate ? '已结束' : rawStatus;
  };

  const expertMap = new Map(mokeExperts.experts.map((expert) => [expert.id, expert]));

  const feedDisplayItems = mokeFeed.items.map((item) => {
    const expert = expertMap.get(item.expert_id);
    const recentTotal = expert?.recent_total ?? 0;
    const recentHit = expert?.recent_hit ?? 0;
    const winRate = recentTotal > 0 ? `${Math.round((recentHit / recentTotal) * 100)}%` : '0%';

    return {
      ...item,
      author: expert?.name ?? '未知专家',
      avatar: expert?.avatar ?? 'https://i.pravatar.cc/150?img=1',
      record: `近${recentTotal}中${recentHit}`,
      role: '足球分析师',
      speciality: expert?.specialities ? `擅长${expert.specialities.join('、')}` : undefined,
      win_rate: winRate,
    };
  });

  const hotRanking = feedDisplayItems.slice(0, 3);
  const liveRecommendations = mokeQuickEntry.recommendations.map((item) => ({
    ...item,
    status: resolveRecommendationStatus(item.status, item.match_date),
  }));

  return (
    <main id="main-content" aria-label="A足球首页" className="hc-page">
      <div className="hc-shell">
        <div className="hc-main">
          <RankBanner
            bannerImage={mokeExperts.banner_image}
            title={mokeExperts.title}
            topTabs={mokeNavigation.top_tabs}
          />
          <ExpertGrid experts={mokeExperts.experts} />
          <LiveSection
            recommendations={liveRecommendations}
            entryCards={mokeQuickEntry.entry_cards}
          />
          <FeedSection items={feedDisplayItems} filters={mokeQuickEntry.filters} />
          <DownloadBar text={mokeFooter.download_text} />
        </div>

        <RightRail
          hotRanking={hotRanking}
          primaryColor={SITE_META.primary_color}
          backgroundColor={SITE_META.background_color}
          brandName={SITE_META.brand_name}
        />
      </div>
    </main>
  );
}

