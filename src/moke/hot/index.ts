/**
 * @packageDocumentation
 * @module moke/hot
 * @description 热点资讯提取数据导出
 */

import { NewsCategory, type NewsItem } from '@/types';
import hot from './hot.json';

interface MokeMeta {
  readonly source_url: string;
  readonly source_section: string;
  readonly extraction_confidence: 'CONFIRMED' | 'PARTIAL' | 'INFERRED' | 'NOT_PRESENT';
  readonly last_extracted?: string;
  readonly item_count_verified?: boolean;
  readonly content_language?: string;
}

export interface HotNewsItem extends NewsItem {
  readonly readingTime: string;
  readonly tags: readonly string[];
  readonly content: readonly (string | HotNewsImageBlock)[];
}

export interface HotNewsImageBlock {
  readonly type: 'image';
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
}

export interface HotNewsCollection {
  readonly _meta: MokeMeta;
  readonly items: readonly HotNewsItem[];
}

interface RawHotNewsItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly category: NewsItem['category'];
  readonly source: string;
  readonly publishedAt: string;
  readonly views: number;
  readonly league?: string;
  readonly isBreaking?: boolean;
  readonly tags: readonly string[];
  readonly content: readonly (string | HotNewsImageBlock)[];
  readonly imageUrl?: string;
  readonly readingTime?: string;
}

interface RawHotNewsCollection {
  readonly _meta: MokeMeta;
  readonly items: readonly RawHotNewsItem[];
}

const DEFAULT_HOT_IMAGE = '/window.svg';

function estimateReadingTime(content: readonly (string | HotNewsImageBlock)[]): string {
  const textLength = content.reduce((total, block) => {
    if (typeof block === 'string') {
      return total + block.length;
    }

    return total + block.alt.length + (block.caption?.length ?? 0);
  }, 0);

  const minutes = Math.max(3, Math.ceil(textLength / 260));

  return `${minutes} 分钟阅读`;
}

export const hotCategoryLabels = {
  [NewsCategory.INJURY]: '伤停',
  [NewsCategory.LINEUP]: '首发',
  [NewsCategory.TRANSFER]: '转会',
  [NewsCategory.MATCH_PREVIEW]: '前瞻',
  [NewsCategory.HOT]: '热点',
} as const;

export function resolveHotCategoryLabel(category: NewsItem['category']): string {
  return hotCategoryLabels[category as keyof typeof hotCategoryLabels] ?? '资讯';
}

const rawHot = hot as unknown as RawHotNewsCollection;

export const mokeHot = {
  ...rawHot,
  items: rawHot.items.map((item) => ({
    ...item,
    imageUrl: item.imageUrl ?? DEFAULT_HOT_IMAGE,
    readingTime: item.readingTime ?? estimateReadingTime(item.content),
  })),
} as HotNewsCollection;