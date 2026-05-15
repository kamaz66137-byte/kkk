/**
 * @packageDocumentation
 * @module components/sections/pager
 * @description 复用分页导航组件
 */

import Link from 'next/link';
import type { PagerProps } from './types';
import styles from './pager.module.css';

export function Pager({ currentPage, totalPages, buildHref, ariaLabel = '分页导航' }: PagerProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);
  const prevHref = buildHref(prevPage);
  const nextHref = buildHref(nextPage);

  return (
    <nav className={styles.pager} aria-label={ariaLabel}>
      {isFirstPage ? (
        <span className={`${styles.pagerBtn} ${styles.isDisabled}`} aria-disabled="true">‹ 上一页</span>
      ) : (
        <Link href={prevHref} className={styles.pagerBtn}>‹ 上一页</Link>
      )}

      <p className={styles.pagerStat} aria-live="polite">第 {currentPage} / {totalPages} 页</p>

      {isLastPage ? (
        <span className={`${styles.pagerBtn} ${styles.isDisabled}`} aria-disabled="true">下一页 ›</span>
      ) : (
        <Link href={nextHref} className={styles.pagerBtn}>下一页 ›</Link>
      )}
    </nav>
  );
}