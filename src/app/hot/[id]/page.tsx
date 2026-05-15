/**
 * @packageDocumentation
 * @module app/hot/[id]/page
 * @description 热点资讯详情页
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mokeHot } from '@/moke';
import { resolveHotCategoryLabel } from '@/moke/hot';
import styles from '../hot.module.css';

/**
 * @interface HotDetailPageProps
 * @description 热点资讯详情页参数
 */
interface HotDetailPageProps {
  readonly params: Promise<{ id: string }>;
}

/**
 * @function generateMetadata
 * @description 生成热点资讯详情页 SEO 元信息
 * @param {HotDetailPageProps} props 页面参数
 * @returns {Promise<Metadata>} SEO 元信息
 */
export async function generateMetadata({ params }: HotDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = mokeHot.items.find((entry) => entry.id === id);

  if (!item) {
    return { title: '资讯不存在 - A足球' };
  }

  const categoryLabel = resolveHotCategoryLabel(item.category);

  return {
    title: `${item.title} - ${categoryLabel} - A足球`,
    description: item.summary,
    openGraph: {
      title: `${item.title} - A足球`,
      description: item.summary,
      type: 'article',
    },
  };
}


export default async function HotDetailPage({ params }: HotDetailPageProps) {
  const { id } = await params;
  const item = mokeHot.items.find((entry) => entry.id === id);

  if (!item) {
    notFound();
  }

  const relatedItems = mokeHot.items.filter((entry) => entry.id !== item.id).slice(0, 3);
  const bodyBlocks = [...item.content];

  return (
    <main className={styles.page}>
      <section className={styles.wrap} aria-label="热点资讯详情">
        <article className={styles.detailCard}>
          <header className={styles.detailHero}>
            <span className={styles.detailBadge}>{resolveHotCategoryLabel(item.category)}</span>
            <h1 className={styles.detailTitle}>{item.title}</h1>

            <div className={styles.detailMeta}>
              <span className={styles.detailMetaTag}>{item.source}</span>
              {item.league ? <span className={styles.detailMetaTag}>{item.league}</span> : null}
              <span className={styles.detailMetaTag}>{item.publishedAt}</span>
              <span className={styles.detailMetaTag}>{item.readingTime}</span>
              <span className={styles.detailMetaTag}>{item.views.toLocaleString()} 阅读</span>
            </div>

            <div className={styles.detailTags} aria-label="关键标签">
              {item.tags.map((tag) => (
                <span key={tag} className={styles.highlight}>{tag}</span>
              ))}
            </div>
          </header>

          <div className={styles.detailBody}>
            <section className={styles.article} aria-label="正文摘要">
              <h2 className={styles.articleTitle}>正文内容</h2>
              {bodyBlocks.map((block, index) => {
                if (typeof block === 'string') {
                  return <p key={`p-${index}-${block.slice(0, 12)}`} className={styles.articleText}>{block}</p>;
                }

                return (
                  <figure key={`img-${index}-${block.src}`} className={styles.articleMedia}>
                    <img src={block.src} alt={block.alt} className={styles.articleImage} loading="lazy" decoding="async" />
                    {block.caption ? <figcaption className={styles.articleCaption}>{block.caption}</figcaption> : null}
                  </figure>
                );
              })}
            </section>

            <section className={styles.article} aria-label="同类内容">
              <h2 className={styles.articleTitle}>相关资讯</h2>
              <div className={styles.sideGrid}>
                {relatedItems.map((relatedItem) => (
                  <Link key={relatedItem.id} href={`/hot/${relatedItem.id}`} className={styles.itemLink}>
                    <article className={styles.item}>
                      <div className={styles.itemTop}>
                        <span className={styles.badge}>{resolveHotCategoryLabel(relatedItem.category)}</span>
                        {relatedItem.league ? <span className={styles.league}>{relatedItem.league}</span> : null}
                      </div>
                      <h3 className={styles.itemTitle}>{relatedItem.title}</h3>
                      <p className={styles.itemSummary}>{relatedItem.summary}</p>
                      <div className={styles.itemFooter}>
                        <span>{relatedItem.source} · {relatedItem.publishedAt}</span>
                        <span>{relatedItem.readingTime}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>

        <aside className={styles.sideGrid} aria-label="详情侧栏">
          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}>关键信息</h2>
            <p className={styles.sideText}>
              来源：{item.source}
              <br />
              发布时间：{item.publishedAt}
              <br />
              阅读量：{item.views.toLocaleString()}
              <br />
              关键词：{item.tags.join(' / ')}
            </p>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}>返回导航</h2>
            <p className={styles.sideText}>你可以直接回到热点列表，继续浏览其他资讯条目。</p>
            <div className={styles.backActions}>
              <Link href="/hot" className={styles.backBtn}>返回列表</Link>
              <Link href="/" className={styles.primaryBtn}>返回首页</Link>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}