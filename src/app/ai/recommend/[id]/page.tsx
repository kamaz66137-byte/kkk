/**
 * @packageDocumentation
 * @module app/ai/recommend/[id]/page
 * @description AI推荐详情页
 */

import { notFound } from 'next/navigation';
import { mokeAi, mokeAiRecommend, mokeFeed } from '@/moke';
import styles from './ai-recommend.module.css';

/**
 * @interface AiRecommendDetailPageProps
 * @description AI推荐详情页参数
 */
interface AiRecommendDetailPageProps {
  readonly params: Promise<{ id: string }>;
}

/**
 * @function AiRecommendDetailPage
 * @description AI推荐详情页
 * @param {AiRecommendDetailPageProps} props 页面参数
 * @returns {Promise<JSX.Element>}
 */
export default async function AiRecommendDetailPage({ params }: AiRecommendDetailPageProps) {
  const { id } = await params;
  const feedItem = mokeFeed.items.find((item) => item.id === id);

  if (!feedItem) {
    notFound();
  }

  const aiMoke = mokeAiRecommend.items.find((item) => item.feed_id === feedItem.id);

  if (!aiMoke) {
    notFound();
  }

  const aiModel = mokeAi.items.find((item) => item.id === aiMoke.ai_id);

  if (!aiModel) {
    notFound();
  }

  const riskScore = aiMoke.score;
  const riskLevel = aiMoke.risk;
  const sampleSize = aiMoke.sample_size;
  const modelWindow = aiMoke.window;
  const featureCluster = aiMoke.feature_cluster;
  const modelSignal = aiMoke.signal;
  const execution = aiMoke.execution;
  const finalPick = aiMoke.final_pick;
  const teamAName = aiMoke.team_a_name;
  const teamBName = aiMoke.team_b_name;
  const pickWinRate = aiMoke.pick_win_rate;
  const isPickTeamA = finalPick.includes(teamAName);
  const teamAWinRate = isPickTeamA ? pickWinRate : 100 - pickWinRate;
  const teamBWinRate = isPickTeamA ? 100 - pickWinRate : pickWinRate;

  const playTypeText = feedItem.play_types.join(' / ');
  const modelVersion = `${aiModel.name} ${aiModel.version}`;

  return (
    <main className={styles.page}>
      <section className={styles.wrap} aria-label="AI推荐详情">
        <header className={styles.hero}>
          <div className={styles.heroTop}>
            <p className={styles.badge}>AI推荐详情 · {playTypeText}</p>
          </div>

          <h1 className={styles.title}>{feedItem.title}</h1>
          <p className={styles.summary}>{feedItem.match}</p>

          <div className={styles.heroMeta}>
            <p className={styles.heroTag}>{feedItem.league}</p>
            <p className={styles.heroTag}>风险等级 {riskLevel}</p>
            <p className={styles.heroTag}>样本 {sampleSize}</p>
          </div>
        </header>

        <section className={styles.layout}>
          <div className={styles.mainCol}>
            <section className={styles.card} aria-label="AI模型结论">
              <h2 className={styles.cardTitle}>AI模型结论</h2>

              <div className={styles.pickBox}>
                <p className={styles.pickLabel}>推荐方向</p>
                <p className={styles.pickText}>{finalPick}（主推 {playTypeText}）</p>
                <div className={styles.winRateGrid}>
                  <p className={styles.winRateRow}><span>{teamAName}</span><strong>{teamAWinRate}%</strong></p>
                  <p className={styles.winRateRow}><span>{teamBName}</span><strong>{teamBWinRate}%</strong></p>
                </div>
                <p className={styles.pickMeta}>风险等级：{riskLevel}</p>
              </div>

              <div className={styles.infoGrid}>
                <p><span>联赛</span>{feedItem.league}</p>
                <p><span>比赛日期</span>{feedItem.date}</p>
                <p><span>发布时间</span>{feedItem.published}</p>
                <p><span>订阅价格</span>{feedItem.price}</p>
              </div>
            </section>

            <section className={styles.card} aria-label="模型依据">
              <h2 className={styles.cardTitle}>模型依据</h2>

              <ul className={styles.reasonList}>
                <li>近 {modelWindow} 走势波动可控，趋势偏向连续稳定区间。</li>
                <li>{feedItem.league} 对阵样本中，本场匹配到 {featureCluster} 个相似特征簇。</li>
                <li>玩法 {playTypeText} 在当前盘口区间具备更优回撤表现。</li>
                <li>核心信号：{modelSignal}。</li>
              </ul>

              <p className={styles.riskNote}>
                风险提示：临场首发、突发伤停和盘口异动会影响模型输出，建议开赛前 30 分钟复核。
              </p>
            </section>
          </div>

          <aside className={styles.sideCol} aria-label="AI摘要">
            <section className={styles.sideCard}>
              <h2 className={styles.sideTitle}>模型参数</h2>
              <div className={styles.sideGrid}>
                <p><span>模型版本</span>{modelVersion}</p>
                <p><span>模型定位</span>{aiModel.tagline}</p>
                <p><span>刷新频率</span>每 {aiModel.refresh_minutes} 分钟</p>
                <p><span>擅长方向</span>{aiModel.focus_directions.join(' / ')}</p>
                <p><span>覆盖比赛</span>{aiModel.focus_matches.join(' / ')}</p>
                <p><span>训练集规模</span>{aiModel.training_samples.toLocaleString()} 场</p>
                <p><span>训练周期</span>{aiModel.training_period}</p>
                <p><span>覆盖联赛</span>{aiModel.leagues_covered_count} 个</p>
                <p><span>样本窗口</span>{modelWindow}</p>
                <p><span>特征簇数</span>{featureCluster}</p>
                <p><span>当前评分</span>{riskScore}</p>
              </div>
            </section>

            <section className={styles.sideCard}>
              <h2 className={styles.sideTitle}>AI介绍</h2>
              <p className={styles.riskNote}>{aiModel.intro}</p>
              <p className={styles.riskNote}>数据来源：{aiModel.data_sources.join(' / ')}</p>
            </section>

            <section className={styles.sideCard}>
              <h2 className={styles.sideTitle}>执行建议</h2>
              <ul className={styles.tipList}>
                {execution.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>

          </aside>
        </section>
      </section>
    </main>
  );
}
