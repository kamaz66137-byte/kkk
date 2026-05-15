/**
 * @packageDocumentation
 * @module app/expert/[id]/page
 * @description 专家详情页
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mokeExperts, mokeFeed } from '@/moke';
import styles from './expert.module.css';

/**
 * @interface ExpertDetailPageProps
 * @description 专家详情页参数
 */
interface ExpertDetailPageProps {
  readonly params: Promise<{ id: string }>;
}

/**
 * @function generateMetadata
 * @description 生成专家详情页 SEO 元信息
 * @param {ExpertDetailPageProps} props 页面参数
 * @returns {Promise<Metadata>} SEO 元信息
 */
export async function generateMetadata({ params }: ExpertDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const expert = mokeExperts.experts.find((item) => item.id === id);

  if (!expert) {
    return { title: '专家不存在 - A足球' };
  }

  const winRate = expert.recent_total > 0
    ? Math.round((expert.recent_hit / expert.recent_total) * 100)
    : 0;
  const specialities = expert.specialities?.join('、') ?? '足球分析';

  return {
    title: `${expert.name} - 专家推荐 - A足球`,
    description: `${expert.name}，擅长${specialities}，近${expert.recent_total}中${expert.recent_hit}，命中率${winRate}%。查看最新推荐方案。`,
    openGraph: {
      title: `${expert.name} - 专家推荐 - A足球`,
      description: `近${expert.recent_total}中${expert.recent_hit}，命中率${winRate}%，擅长${specialities}。`,
      type: 'profile',
    },
  };
}

/**
 * @function ExpertDetailPage
 * @description 渲染专家详情页和该专家的推荐列表
 * @param {ExpertDetailPageProps} props 页面参数
 * @returns {Promise<JSX.Element>} 页面元素
 */
export default async function ExpertDetailPage({ params }: ExpertDetailPageProps) {
  const { id } = await params;
  const expert = mokeExperts.experts.find((item) => item.id === id);

  if (!expert) {
    notFound();
  }

  const expertFeeds = mokeFeed.items.filter((item) => item.expert_id === id);
  const fallbackFeeds = mokeFeed.items.slice(0, 3);
  const displayFeeds = expertFeeds.length > 0 ? expertFeeds : fallbackFeeds;
  const winRate = expert.recent_total > 0 ? Math.round((expert.recent_hit / expert.recent_total) * 100) : 0;
  const confidenceLevel = winRate >= 70 ? '高' : winRate >= 50 ? '中' : '谨慎';
  const specialityList = expert.specialities?.length ? expert.specialities.slice(0, 3) : ['暂未标注'];

  return (
    <main className={styles.page}>
      <section className={styles.wrap} aria-label="专家详情">
        <header className={styles.hero}>
          <Image
            src={expert.avatar}
            alt={expert.name}
            width={72}
            height={72}
            className={styles.avatar}
          />

          <div className={styles.heroMain}>
            <h1 className={styles.name}>{expert.name}</h1>
            <p className={styles.meta}>近{expert.recent_total}中{expert.recent_hit} · 命中率 {winRate}% · 信心 {confidenceLevel}</p>
            <div className={styles.tags} aria-label="擅长领域">
              {specialityList.map((speciality) => (
                <span key={speciality} className={styles.tagPill}>{speciality}</span>
              ))}
            </div>
          </div>
        </header>

        <section className={styles.section} aria-label="专家推荐">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>专家推荐</h2>
            <p className={styles.sectionSub}>共 {displayFeeds.length} 条</p>
          </div>

          <ul className={styles.list}>
            {displayFeeds.map((item) => (
              <li key={item.id}>
                <Link href={`/recommend/${item.id}`} className={styles.itemLink}>
                  <article className={styles.item}>
                    <div className={styles.itemMain}>
                      <p className={styles.itemTitle}>{item.title}</p>
                      <p className={styles.itemMeta}>{item.league} · {item.match}</p>
                      <p className={styles.itemExtra}>{item.date} · {item.published} · {item.price}</p>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.actions}>
          <Link href="/expertall/1" className={styles.ghostBtn}>返回专家列表</Link>
          <Link href="/" className={styles.primaryBtn}>返回首页</Link>
        </footer>
      </section>
    </main>
  );
}
