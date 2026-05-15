export interface FeedDisplayItem {
  readonly id: string;
  readonly author: string;
  readonly record: string;
  readonly role: string;
  readonly win_rate: string;
  readonly play_types: readonly ('单场' | '串关' | '比分')[];
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly league: string;
  readonly match: string;
  readonly published: string;
  readonly price: string;
  readonly avatar: string;
  readonly speciality?: string;
}

export interface FeedSectionProps {
  readonly items: readonly FeedDisplayItem[];
  readonly filters: readonly string[];
}
