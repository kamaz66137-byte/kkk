/**
 * @packageDocumentation
 * @module app/ai/models/page
 * @description AI介绍专属页面
 */

import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * @constant metadata
 * @description AI模型介绍页面 SEO 元信息
 */
export const metadata: Metadata = {
  title: 'AI模型介绍 - A足球',
  description: '查看所有接入模型的定位、擅长方向、训练集规模与覆盖联赛，了解每个AI的核心能力边界。',
  openGraph: {
    title: 'AI模型介绍 - A足球',
    description: '查看所有AI模型的定位、训练集规模与覆盖联赛。',
    type: 'website',
  },
};
import { mokeAi } from '@/moke';

/**
 * @function AiModelsPage
 * @description 展示AI模型完整介绍
 * @returns {JSX.Element}
 */
export default function AiModelsPage() {
  const modelCount = mokeAi.items.length;
  const sampleTotal = mokeAi.items.reduce((sum, item) => sum + item.training_samples, 0);
  const leagueTotal = mokeAi.items.reduce((sum, item) => sum + item.leagues_covered_count, 0);

  return (
    <main className="page">
      <section className="wrap" aria-label="AI介绍专属页面">
        <header className="hero">
          <p className="kicker">AI PROFILE CENTER</p>
          <h1 className="title">AI介绍</h1>
          <p className="desc">每个AI模型的定位、擅长方向、覆盖比赛和训练数据都在这里完整展示。</p>
          <div className="heroMeta" aria-label="模型概览">
            <div className="heroStat">
              <span className="heroStatLabel">模型数量</span>
              <strong className="heroStatValue">{modelCount}</strong>
            </div>
            <div className="heroStat">
              <span className="heroStatLabel">覆盖联赛</span>
              <strong className="heroStatValue">{leagueTotal}</strong>
            </div>
            <div className="heroStat">
              <span className="heroStatLabel">训练样本</span>
              <strong className="heroStatValue">{sampleTotal.toLocaleString()}</strong>
            </div>
          </div>
          <Link href="/ai" className="backLink">返回AI推荐</Link>
        </header>

        <section className="grid" aria-label="AI模型卡片列表">
          {mokeAi.items.map((item) => (
            <article key={item.id} className="card">
              <div className="cardHead">
                <p className="name">{item.name}</p>
                <p className="version">{item.version}</p>
              </div>

              <p className="tagline">{item.tagline}</p>
              <p className="intro">{item.intro}</p>

              <div className="metaGrid">
                <p><span>擅长方向</span>{item.focus_directions.join(' / ')}</p>
                <p><span>覆盖比赛</span>{item.focus_matches.join(' / ')}</p>
                <p><span>覆盖联赛</span>{item.leagues_covered_count} 个</p>
                <p><span>刷新频率</span>每 {item.refresh_minutes} 分钟</p>
                <p><span>训练周期</span>{item.training_period}</p>
                <p><span>训练集规模</span>{item.training_samples.toLocaleString()} 场</p>
                <p><span>数据来源</span>{item.data_sources.join(' / ')}</p>
              </div>
            </article>
          ))}
        </section>
      </section>

      <style>{`
        .page {
          min-height: 100dvh;
          padding: 16px 14px 28px;
          background:
            radial-gradient(1000px 360px at 100% -20%, rgba(20, 184, 166, 0.18), transparent 60%),
            radial-gradient(900px 320px at 0% -10%, rgba(14, 165, 233, 0.18), transparent 60%),
            #f4f8fb;
          font-family: 'Space Grotesk', 'Noto Sans SC', 'PingFang SC', sans-serif;
        }

        .wrap {
          width: min(100%, 1160px);
          margin: 0 auto;
          display: grid;
          gap: 14px;
        }

        .hero {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          padding: 22px;
          background: linear-gradient(140deg, #0f172a 0%, #17315c 45%, #03667c 100%);
          box-shadow: 0 20px 44px rgba(15, 23, 42, 0.2);
          border: 1px solid rgba(148, 163, 184, 0.22);
          display: grid;
          gap: 10px;
          color: #f8fafc;
        }

        .hero::after {
          content: '';
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 999px;
          right: -72px;
          top: -88px;
          background: rgba(56, 189, 248, 0.2);
        }

        .kicker {
          position: relative;
          z-index: 1;
          color: #7dd3fc;
          font-size: 11px;
          letter-spacing: 0.18em;
          font-weight: 800;
        }

        .title {
          position: relative;
          z-index: 1;
          color: #ffffff;
          font-size: 30px;
          line-height: 1.1;
          font-weight: 900;
        }

        .desc {
          position: relative;
          z-index: 1;
          color: rgba(241, 245, 249, 0.86);
          font-size: 14px;
          line-height: 1.6;
          max-width: 760px;
        }

        .heroMeta {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 4px;
        }

        .heroStat {
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.24);
          background: rgba(15, 23, 42, 0.24);
          backdrop-filter: blur(6px);
          padding: 12px;
          display: grid;
          gap: 4px;
        }

        .heroStatLabel {
          color: rgba(226, 232, 240, 0.82);
          font-size: 11px;
          font-weight: 700;
        }

        .heroStatValue {
          color: #ffffff;
          font-size: 20px;
          line-height: 1.1;
          font-weight: 900;
        }

        .backLink {
          position: relative;
          z-index: 1;
          width: fit-content;
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(186, 230, 253, 0.5);
          background: rgba(14, 165, 233, 0.18);
          color: #bae6fd;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
        }

        .grid {
          display: grid;
          gap: 12px;
        }

        .card {
          border-radius: 16px;
          border: 1px solid #dbe7f0;
          background: linear-gradient(160deg, #ffffff 0%, #f8fcff 100%);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.1);
          padding: 14px;
          display: grid;
          gap: 8px;
        }

        .cardHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .name {
          color: #0f172a;
          font-size: 18px;
          font-weight: 900;
        }

        .version {
          display: inline-flex;
          align-items: center;
          min-height: 24px;
          padding: 0 8px;
          border-radius: 999px;
          border: 1px solid #7dd3fc;
          background: #e0f2fe;
          color: #0369a1;
          font-size: 11px;
          font-weight: 700;
        }

        .tagline {
          color: #0f766e;
          font-size: 13px;
          font-weight: 800;
        }

        .intro {
          color: #475569;
          font-size: 13px;
          line-height: 1.65;
        }

        .metaGrid {
          display: grid;
          gap: 8px;
          margin-top: 2px;
        }

        .metaGrid p {
          display: grid;
          grid-template-columns: 90px minmax(0, 1fr);
          gap: 8px;
          color: #0f172a;
          font-size: 13px;
          line-height: 1.6;
        }

        .metaGrid p span {
          color: #64748b;
        }

        @media (min-width: 1024px) {
          .page {
            padding: 22px 20px 32px;
          }

          .hero {
            padding: 26px;
          }

          .title {
            font-size: 34px;
          }

          .heroMeta {
            max-width: 680px;
          }

          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </main>
  );
}
