export interface PagerProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly buildHref: (page: number) => string;
  readonly ariaLabel?: string;
}