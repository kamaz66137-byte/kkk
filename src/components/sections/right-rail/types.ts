export interface HotItem {
  readonly id: string;
  readonly author: string;
  readonly league: string;
}

export interface RightRailProps {
  readonly hotRanking: readonly HotItem[];
  readonly primaryColor: string;
  readonly backgroundColor: string;
  readonly brandName: string;
}
