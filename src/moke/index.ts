/**
 * @packageDocumentation
 * @module moke/index
 * @since 1.0.0
 * @author zkali
 * @tags [moke, extracted-site-data]
 * @description A足球首页提取数据导出
 * @path src/moke/index.ts
 */

import navigation from './navigation.json';
import experts from './experts.json';
import quickEntry from './quick-entry.json';
import feed from './feed.json';
import footer from './footer.json';
import ai from './ai/ai.json';
import aiRecommend from './ai/ai-recommend.json';

/**
 * @interface MokeMeta
 * @description 站点提取元信息
 */
export interface MokeMeta {
  readonly source_url: string;
  readonly source_section: string;
  readonly extraction_confidence: 'CONFIRMED' | 'PARTIAL' | 'INFERRED' | 'NOT_PRESENT';
  readonly last_extracted?: string;
  readonly item_count_verified?: boolean;
  readonly content_language?: string;
}

/**
 * @interface NavigationTab
 * @description 导航项
 */
export interface NavigationTab {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

/**
 * @interface ExpertItem
 * @description 红人榜专家项
 */
export interface ExpertItem {
  readonly id: string;
  readonly name: string;
  readonly specialities?: readonly string[];
  readonly recent_total: number;
  readonly recent_hit: number;
  readonly avatar: string;
}

/**
 * @interface FeedItem
 * @description 推荐信息流项
 */
export interface FeedItem {
  readonly id: string;
  readonly expert_id: string;
  readonly play_types: readonly ('单场' | '串关' | '比分')[];
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly league: string;
  readonly match: string;
  readonly published: string;
  readonly price: string;
}

/**
 * @interface AiRecommendItem
 * @description AI推荐模型项
 */
export interface AiRecommendItem {
  readonly feed_id: string;
  readonly ai_id: string;
  readonly final_pick: string;
  readonly team_a_name: string;
  readonly team_b_name: string;
  readonly pick_win_rate: number;
  readonly score: number;
  readonly risk: '低' | '中' | '高';
  readonly signal: string;
  readonly sample_size: number;
  readonly window: string;
  readonly feature_cluster: number;
  readonly execution: readonly string[];
}

export interface AiModelItem {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly refresh_minutes: number;
  readonly tagline: string;
  readonly intro: string;
  readonly focus_directions: readonly string[];
  readonly focus_matches: readonly string[];
  readonly training_samples: number;
  readonly training_period: string;
  readonly leagues_covered_count: number;
  readonly data_sources: readonly string[];
}

export const mokeNavigation = navigation as {
  readonly _meta: MokeMeta;
  readonly brand: string;
  readonly top_tabs: readonly NavigationTab[];
  readonly bottom_tabs: readonly NavigationTab[];
};

export const mokeExperts = experts as {
  readonly _meta: MokeMeta;
  readonly title: string;
  readonly banner_image: string;
  readonly experts: readonly ExpertItem[];
};

export const mokeQuickEntry = quickEntry as {
  readonly _meta: MokeMeta;
  readonly recommendations: readonly {
    readonly id: string;
    readonly tag: string;
    readonly match_date?: string;
    readonly status: string;
    readonly home: string;
    readonly home_logo: string;
    readonly home_score: string;
    readonly away: string;
    readonly away_logo: string;
    readonly away_score: string;
  }[];
  readonly entry_cards: readonly {
    readonly id: string;
    readonly title: string;
    readonly subtitle: string;
  }[];
  readonly filters: readonly string[];
};

export const mokeFeed = feed as {
  readonly _meta: MokeMeta;
  readonly items: readonly FeedItem[];
};

export const mokeFooter = footer as {
  readonly _meta: MokeMeta;
  readonly download_text: string;
  readonly bottom_nav: readonly NavigationTab[];
};

export const mokeAi = ai as {
  readonly _meta: MokeMeta;
  readonly items: readonly AiModelItem[];
};

export const mokeAiRecommend = aiRecommend as {
  readonly _meta: MokeMeta;
  readonly items: readonly AiRecommendItem[];
};

export { mokeHot } from './hot';

/**
 * @const SITE_META
 * @description 站点提取摘要
 */
export const SITE_META = {
  source_url: 'https://wap.hongcai.163.com/#/',
  brand_name: 'A足球',
  page_type: 'mobile-feed',
  primary_color: '#FE4144',
  background_color: '#F3F5F7',
  extracted_at: '2026-05-12T21:26:30.687Z',
} as const;
