/**
 * @packageDocumentation
 * @module types/index
 * @since 1.0.0
 * @author zkali
 * @tags [types, models]
 * @description 全局类型定义 - 赛事、专家、AI预测、新闻
 * @path src/types/index.ts
 */

/* ─── 赛事相关 ────────────────────────────────────────────────── */

/**
 * @interface Team
 * @description 球队信息
 */
export interface Team {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly logo: string;
  readonly rank?: number;
}

/**
 * @const MatchStatus
 * @description 赛事状态枚举
 */
export const MatchStatus = {
  UPCOMING: 'upcoming',
  LIVE: 'live',
  FINISHED: 'finished',
} as const;

export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus];

/**
 * @const RecommendType
 * @description 推荐类型
 */
export const RecommendType = {
  WIN_HOME: 'win_home',
  WIN_AWAY: 'win_away',
  DRAW: 'draw',
  OVER: 'over',
  UNDER: 'under',
  BOTH_SCORE: 'both_score',
} as const;

export type RecommendType = (typeof RecommendType)[keyof typeof RecommendType];

/**
 * @interface MatchOdds
 * @description 赔率信息
 */
export interface MatchOdds {
  readonly home: number;
  readonly draw: number;
  readonly away: number;
}

/**
 * @interface Match
 * @description 足球赛事数据
 */
export interface Match {
  readonly id: string;
  readonly league: string;
  readonly leagueLogo: string;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly matchTime: string;
  readonly status: MatchStatus;
  readonly score?: {
    readonly home: number;
    readonly away: number;
  };
  readonly odds?: MatchOdds;
  readonly recommend?: RecommendType;
  readonly confidence?: number;
  readonly isHot?: boolean;
  readonly minute?: number;
}

/* ─── 专家推荐 ────────────────────────────────────────────────── */

/**
 * @const ExpertTier
 * @description 专家等级
 */
export const ExpertTier = {
  DIAMOND: 'diamond',
  GOLD: 'gold',
  SILVER: 'silver',
} as const;

export type ExpertTier = (typeof ExpertTier)[keyof typeof ExpertTier];

/**
 * @interface Expert
 * @description 专家信息
 */
export interface Expert {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
  readonly tier: ExpertTier;
  readonly winRate: number;
  readonly totalPicks: number;
  readonly streak: number;
  readonly speciality: string;
  readonly bio: string;
}

/**
 * @interface ExpertPick
 * @description 专家红单推荐
 */
export interface ExpertPick {
  readonly id: string;
  readonly expert: Expert;
  readonly match: Pick<Match, 'id' | 'league' | 'homeTeam' | 'awayTeam' | 'matchTime'>;
  readonly recommend: RecommendType;
  readonly analysis: string;
  readonly odds: number;
  readonly confidence: number;
  readonly publishedAt: string;
  readonly isVip: boolean;
}

/* ─── AI预测 ──────────────────────────────────────────────────── */

/**
 * @interface AiPrediction
 * @description AI智能预测结果
 */
export interface AiPrediction {
  readonly id: string;
  readonly match: Pick<Match, 'id' | 'league' | 'homeTeam' | 'awayTeam' | 'matchTime'>;
  readonly recommend: RecommendType;
  readonly winProbability: number;
  readonly drawProbability: number;
  readonly lossProbability: number;
  readonly keyFactors: readonly string[];
  readonly modelAccuracy: number;
  readonly updatedAt: string;
}

/* ─── 新闻热点 ────────────────────────────────────────────────── */

/**
 * @const NewsCategory
 * @description 新闻分类
 */
export const NewsCategory = {
  INJURY: 'injury',
  LINEUP: 'lineup',
  TRANSFER: 'transfer',
  MATCH_PREVIEW: 'match_preview',
  HOT: 'hot',
} as const;

export type NewsCategory = (typeof NewsCategory)[keyof typeof NewsCategory];

/**
 * @interface NewsItem
 * @description 新闻热点数据
 */
export interface NewsItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly category: NewsCategory;
  readonly imageUrl: string;
  readonly source: string;
  readonly publishedAt: string;
  readonly views: number;
  readonly league?: string;
  readonly isBreaking?: boolean;
}

/* ─── 统计数据 ────────────────────────────────────────────────── */

/**
 * @interface PlatformStats
 * @description 平台核心数据统计
 */
export interface PlatformStats {
  readonly todayMatches: number;
  readonly activePicks: number;
  readonly winRate: number;
  readonly totalUsers: number;
}
