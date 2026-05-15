/**
 * @packageDocumentation
 * @module app/ai/page
 * @description AI推荐页面
 */

import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * @constant metadata
 * @description AI推荐页面 SEO 元信息
 */
export const metadata: Metadata = {
  title: 'AI预测 - A足球',
  description: '融合多模型管线，输出信心分、风险分布与优先推荐，为你提供每场比赛的AI智能预测分析。',
  openGraph: {
    title: 'AI预测 - A足球',
    description: '融合多模型管线，输出信心分、风险分布与优先推荐。',
    type: 'website',
  },
};
import { mokeAi, mokeAiRecommend, mokeFeed } from '@/moke';

/**
 * @typedef {'低' | '中' | '高'} RiskLevel
 * @description 风险等级
 */
type RiskLevel = '低' | '中' | '高';

/**
 * @interface AiDisplayItem
 * @description AI推荐展示项
 */
interface AiDisplayItem {
  readonly id: string;
  readonly title: string;
  readonly aiName: string;
  readonly league: string;
  readonly match: string;
  readonly date: string;
  readonly published: string;
  readonly price: string;
  readonly score: number;
  readonly risk: RiskLevel;
  readonly modelSignal: string;
  readonly rank: number;
  readonly playTypes: readonly ('单场' | '串关' | '比分')[];
}

/**
 * @function riskClassName
 * @description 返回风险对应样式类名
 * @param {RiskLevel} risk 风险等级
 * @returns {string} 样式类名
 */
function riskClassName(risk: RiskLevel): string {
  if (risk === '低') {
    return 'riskLow';
  }

  if (risk === '中') {
    return 'riskMid';
  }

  return 'riskHigh';
}

/**
 * @function AiPage
 * @description 展示AI推荐列表
 * @returns {JSX.Element}
 */
export default function AiPage() {
  const aiMokeMap = new Map(mokeAiRecommend.items.map((item) => [item.feed_id, item]));
  const aiModelMap = new Map(mokeAi.items.map((item) => [item.id, item]));

  const aiItems: readonly AiDisplayItem[] = mokeFeed.items.slice(0, 10).map((item, index) => {
    const aiMoke = aiMokeMap.get(item.id);
    const aiModel = aiMoke ? aiModelMap.get(aiMoke.ai_id) : undefined;
    const score = aiMoke?.score ?? 70;
    const risk: RiskLevel = aiMoke?.risk ?? '中';

    return {
      id: item.id,
      title: item.title,
      aiName: aiModel?.name ?? '未命名AI',
      league: item.league,
      match: item.match,
      date: item.date,
      published: item.published,
      price: item.price,
      score,
      risk,
      modelSignal: aiMoke?.signal ?? '基础模型信号',
      rank: index + 1,
      playTypes: item.play_types,
    };
  });

  const avgScore = Math.round(aiItems.reduce((sum, item) => sum + item.score, 0) / aiItems.length);
  const lowRiskCount = aiItems.filter((item) => item.risk === '低').length;
  const midRiskCount = aiItems.filter((item) => item.risk === '中').length;
  const highRiskCount = aiItems.filter((item) => item.risk === '高').length;
  const topItems = aiItems.slice(0, 3);

  return (
    <main className="page">
      <section className="wrap" aria-label="AI推荐">
        <header className="hero">
          <p className="kicker">MULTI AI PIPELINE</p>
          <h1 className="title">AI推荐</h1>
          <p className="desc">融合联赛强度、近期状态与玩法波动，输出可直接执行的推荐优先级。</p>

          <div className="metrics">
            <article className="metricCard">
              <p className="metricLabel">平均信心分</p>
              <p className="metricValue">{avgScore}</p>
            </article>
            <article className="metricCard">
              <p className="metricLabel">低风险场次</p>
              <p className="metricValue">{lowRiskCount}</p>
            </article>
            <article className="metricCard">
              <p className="metricLabel">实时扫描</p>
              <p className="metricValue">{aiItems.length}</p>
            </article>
          </div>
        </header>

        <section className="board">
          <ul className="list">
            {aiItems.map((item) => (
              <li key={item.id}>
                <Link href={`/ai/recommend/${item.id}`} className="card">
                  <div className="cardMain">
                    <div className="cardHead">
                      <p className="rankPill">#{item.rank}</p>
                      <p className="leagueTag">{item.league}</p>
                      <p className="leagueTag">{item.aiName}</p>
                    </div>

                    <p className="cardTitle">{item.title}</p>
                    <p className="cardMeta">{item.match}</p>

                    <div className="tags">
                      {item.playTypes.map((type) => (
                        <span key={`${item.id}-${type}`} className="tag">{type}</span>
                      ))}
                      <span className={`riskTag ${riskClassName(item.risk)}`}>风险 {item.risk}</span>
                    </div>

                    <p className="extra">{item.date} · {item.published} · {item.price}</p>
                  </div>

                  <div className="cardAside">
                    <p className="scoreLabel">信心分</p>
                    <p className="scoreValue">{item.score}</p>
                    <div className="progressTrack">
                      <span className="progressBar" style={{ width: `${item.score}%` }} aria-hidden="true" />
                    </div>
                    <p className="signal">{item.aiName} · {item.modelSignal}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <aside className="sidePanel" aria-label="AI决策栏">
            <section className="sideCard">
              <h2 className="sideTitle">风险分布</h2>
              <div className="riskGrid">
                <p className="riskItem">低风险：{lowRiskCount}</p>
                <p className="riskItem">中风险：{midRiskCount}</p>
                <p className="riskItem">高风险：{highRiskCount}</p>
              </div>
            </section>

            <section className="sideCard">
              <h2 className="sideTitle">TOP3 优先推荐</h2>
              <ul className="topList">
                {topItems.map((item) => (
                  <li key={`top-${item.id}`}>
                    <Link href={`/ai/recommend/${item.id}`} className="topItem">
                      <span className="topRank">#{item.rank}</span>
                      <span className="topText">{item.match}</span>
                      <span className="topScore">{item.score}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="sideCard" aria-label="模型说明">
              <h2 className="sideTitle">模型说明</h2>
              <p className="noteItem">当前已接入 {mokeAi.items.length} 个AI模型：{mokeAi.items.map((item) => `${item.name} ${item.version}`).join(' / ')}</p>
              <p className="noteItem">低风险优先单关；中高风险建议降低投入比例</p>
              <Link href="/ai/models" className="topItem" aria-label="查看AI介绍专属页面">
                <span className="topRank">AI</span>
                <span className="topText">查看AI介绍专属页面</span>
                <span className="topScore">进入</span>
              </Link>
            </section>
          </aside>
        </section>
      </section>

      <style>{`
        .page {
          min-height: 100dvh;
          padding: 16px 14px 28px;
          background:
            radial-gradient(1200px 420px at 100% -20%, rgba(20, 184, 166, 0.2), transparent 60%),
            radial-gradient(900px 300px at 0% -10%, rgba(14, 165, 233, 0.2), transparent 60%),
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
          border-radius: 20px;
          padding: 18px;
          background: linear-gradient(140deg, #0f172a 0%, #13294b 45%, #0b6f8d 100%);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.22);
          border: 1px solid rgba(148, 163, 184, 0.22);
          color: #f8fafc;
        }

        .kicker {
          color: #7dd3fc;
          font-size: 11px;
          letter-spacing: 0.18em;
          font-weight: 800;
        }

        .title {
          margin-top: 8px;
          color: #ffffff;
          font-size: 30px;
          line-height: 1.1;
          font-weight: 900;
        }

        .desc {
          margin-top: 9px;
          color: rgba(241, 245, 249, 0.86);
          font-size: 14px;
          line-height: 1.65;
          max-width: 760px;
        }

        .metrics {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .metricCard {
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.24);
          background: rgba(15, 23, 42, 0.28);
          backdrop-filter: blur(4px);
          padding: 12px;
        }

        .metricLabel {
          color: rgba(226, 232, 240, 0.86);
          font-size: 11px;
        }

        .metricValue {
          margin-top: 4px;
          color: #ffffff;
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
        }

        .board {
          display: grid;
          gap: 12px;
        }

        .list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 12px;
        }

        .card {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 188px;
          gap: 14px;
          border-radius: 16px;
          border: 1px solid #dbe7f0;
          background: linear-gradient(160deg, #ffffff 0%, #f8fcff 100%);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.1);
          padding: 13px;
          color: #0f172a;
          text-decoration: none;
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
        }

        .card::after {
          content: '';
          position: absolute;
          inset: 0 0 auto 0;
          height: 2px;
          background: linear-gradient(90deg, #06b6d4 0%, #0ea5e9 45%, #22c55e 100%);
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(15, 23, 42, 0.15);
          border-color: #b7d4e8;
        }

        .cardHead {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .rankPill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          min-height: 24px;
          padding: 0 8px;
          border-radius: 8px;
          border: 1px solid #7dd3fc;
          background: #e0f2fe;
          color: #0369a1;
          font-size: 12px;
          font-weight: 800;
        }

        .leagueTag {
          display: inline-flex;
          align-items: center;
          min-height: 22px;
          padding: 0 8px;
          border-radius: 999px;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          color: #334155;
          font-size: 11px;
          font-weight: 700;
        }

        .cardTitle {
          margin-top: 8px;
          color: #0f172a;
          font-size: 16px;
          font-weight: 800;
          line-height: 1.48;
        }

        .cardMeta {
          margin-top: 4px;
          color: #475569;
          font-size: 13px;
          line-height: 1.5;
        }

        .tags {
          margin-top: 9px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          min-height: 23px;
          padding: 0 8px;
          border-radius: 999px;
          border: 1px solid #dbe4ec;
          background: #f8fafc;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
        }

        .riskTag {
          display: inline-flex;
          align-items: center;
          min-height: 23px;
          padding: 0 8px;
          border-radius: 999px;
          border: 1px solid transparent;
          font-size: 11px;
          font-weight: 800;
        }

        .riskLow {
          border-color: #86efac;
          background: #f0fdf4;
          color: #15803d;
        }

        .riskMid {
          border-color: #fde68a;
          background: #fffbeb;
          color: #b45309;
        }

        .riskHigh {
          border-color: #fecaca;
          background: #fef2f2;
          color: #b91c1c;
        }

        .extra {
          margin-top: 9px;
          color: #64748b;
          font-size: 11px;
        }

        .cardAside {
          border-left: 1px solid #e2e8f0;
          padding-left: 12px;
          display: grid;
          align-content: start;
          gap: 8px;
        }

        .scoreLabel {
          color: #64748b;
          font-size: 11px;
          letter-spacing: 0.08em;
        }

        .scoreValue {
          margin-top: -2px;
          color: #0f172a;
          font-size: 32px;
          line-height: 1;
          font-weight: 900;
        }

        .progressTrack {
          position: relative;
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: #dbe4ec;
          overflow: hidden;
        }

        .progressBar {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #06b6d4 0%, #0284c7 50%, #22c55e 100%);
        }

        .signal {
          color: #0f766e;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.45;
        }

        .sidePanel {
          display: grid;
          gap: 10px;
        }

        .sideCard {
          border-radius: 14px;
          border: 1px solid #dbe7f0;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
          padding: 12px;
          display: grid;
          gap: 6px;
        }

        .sideTitle {
          color: #0f172a;
          font-size: 14px;
          font-weight: 800;
        }

        .riskGrid {
          display: grid;
          gap: 6px;
        }

        .riskItem {
          color: #475569;
          font-size: 12px;
        }

        .topList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 6px;
        }

        .topItem {
          border-radius: 10px;
          border: 1px solid #dbe7f0;
          background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
          min-height: 35px;
          padding: 0 8px;
          display: grid;
          grid-template-columns: 36px minmax(0, 1fr) 44px;
          align-items: center;
          gap: 8px;
          color: #0f172a;
          text-decoration: none;
        }

        .topRank {
          color: #0369a1;
          font-size: 12px;
          font-weight: 800;
        }

        .topText {
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .topScore {
          text-align: right;
          color: #0f766e;
          font-size: 12px;
          font-weight: 800;
        }

        .noteItem {
          color: #475569;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (min-width: 1024px) {
          .page {
            padding: 22px 20px 32px;
          }

          .hero {
            padding: 22px;
          }

          .title {
            font-size: 34px;
          }

          .board {
            grid-template-columns: minmax(0, 1fr) 320px;
            align-items: start;
          }

          .sidePanel {
            position: sticky;
            top: 14px;
          }
        }

        @media (max-width: 900px) {
          .card {
            grid-template-columns: 1fr;
          }

          .cardAside {
            border-left: 0;
            border-top: 1px solid #e2e8f0;
            padding-left: 0;
            padding-top: 10px;
          }

          .scoreValue {
            font-size: 27px;
          }
        }

        @media (max-width: 560px) {
          .metrics {
            grid-template-columns: 1fr;
          }

          .title {
            font-size: 27px;
          }
        }
      `}</style>
    </main>
  );
}
