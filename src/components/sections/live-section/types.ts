export interface Recommendation {
  readonly id: string;
  readonly tag: string;
  readonly status: string;
  readonly home: string;
  readonly home_logo: string;
  readonly home_score: string;
  readonly away: string;
  readonly away_logo: string;
  readonly away_score: string;
}

export interface EntryCard {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
}

export interface LiveSectionProps {
  readonly recommendations: readonly Recommendation[];
  readonly entryCards: readonly EntryCard[];
}
