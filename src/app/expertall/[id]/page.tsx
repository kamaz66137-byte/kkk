/**
 * @packageDocumentation
 * @module app/expertall/[id]/page
 * @description 专家推荐列表页
 */

import Image from 'next/image';
import Link from 'next/link';
import { mokeExperts, mokeFeed } from '@/moke';
import { Pager } from '@/components/sections/pager';
import styles from './expertall.module.css';

interface ExpertAllPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function ExpertAllPage({ params, searchParams }: ExpertAllPageProps) {
  const { id } = await params;
  const { page } = await searchParams;

  const recommendationCountMap = new Map<string, number>();
  mokeFeed.items.forEach((item) => {
    recommendationCountMap.set(item.expert_id, (recommendationCountMap.get(item.expert_id) ?? 0) + 1);
  });

  const rankedExperts = mokeExperts.experts
    .map((expert) => {
      const recentTotal = expert.recent_total;
      const recentHit = expert.recent_hit;
      const winRate = recentTotal > 0 ? Math.round((recentHit / recentTotal) * 100) : 0;

      return {
        ...expert,
        recommendationCount: recommendationCountMap.get(expert.id) ?? 0,
        winRate,
      };
    })
    .sort((left, right) => right.winRate - left.winRate);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(rankedExperts.length / pageSize));
  const requestedPage = Number(page ?? '1');
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(Math.floor(requestedPage), 1), totalPages)
    : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const pageExperts = rankedExperts.slice(startIndex, startIndex + pageSize);
  const buildHref = (targetPage: number) => (targetPage <= 1 ? `/expertall/${id}` : `/expertall/${id}?page=${targetPage}`);

  return (
    <main className={styles.page}>
      <section className={styles.wrap} aria-label="专家推荐列表">
        <section className={styles.list}>
          {pageExperts.map((expert, index) => (
            <Link key={expert.id} href={`/expert/${expert.id}`} className={styles.cardLink}>
              <article className={styles.card}>
                <span className={styles.rank}>TOP {startIndex + index + 1}</span>

                <Image
                  src={expert.avatar}
                  alt={expert.name}
                  width={54}
                  height={54}
                  className={styles.avatar}
                />

                <div className={styles.main}>
                  <p className={styles.name}>{expert.name}</p>
                  <p className={styles.meta}>近{expert.recent_total}中{expert.recent_hit} · 命中率 {expert.winRate}%</p>
                  <p className={styles.tags}>
                    擅长：{expert.specialities?.length ? expert.specialities.join('、') : '待补充'}
                  </p>
                </div>

                <div className={styles.side}>
                  <p className={styles.count}>{expert.recommendationCount}</p>
                  <p className={styles.countLabel}>在售推荐</p>
                </div>
              </article>
            </Link>
          ))}
        </section>

        <footer className={styles.footer}>
          <Pager currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
        </footer>
      </section>
    </main>
  );
}
