import type { NavigationTab } from '@/moke';

export interface RankBannerProps {
  readonly bannerImage: string;
  readonly title: string;
  readonly topTabs: readonly NavigationTab[];
}
