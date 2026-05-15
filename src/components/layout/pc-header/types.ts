import type { NavigationTab } from '@/moke';

export interface PcHeaderProps {
  readonly brand: string;
  readonly bottomTabs: readonly NavigationTab[];
}
