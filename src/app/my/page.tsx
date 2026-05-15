/**
 * @packageDocumentation
 * @module app/my/page
 * @description 个人中心页面
 */

import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * @constant metadata
 * @description 个人中心页面 SEO 元信息
 */
export const metadata: Metadata = {
  title: '我的 - A足球',
  description: '集中管理你的收藏、浏览历史、订阅内容与会员权益，一站式个人中心。',
  openGraph: {
    title: '我的 - A足球',
    description: '集中管理收藏、历史、订阅、会员与设置。',
    type: 'website',
  },
};

const heroStats = [
  { label: '收藏', value: '12', hint: '关注的专家与推荐' },
  { label: '历史', value: '28', hint: '最近浏览的内容' },
  { label: '订阅', value: '6', hint: '正在追踪的提醒' },
] as const;

const actionCards = [
  {
    title: '我的收藏',
    desc: '查看你已经保存的专家、推荐和重点赛事。',
    href: '/expertall/1',
    tag: '收藏',
  },
  {
    title: '浏览历史',
    desc: '回到最近访问过的资讯、比赛和分析页。',
    href: '/hot',
    tag: '历史',
  },
  {
    title: '会员中心',
    desc: '查看会员权益、到期时间和订阅状态。',
    href: '/vip',
    tag: 'VIP',
  },
  {
    title: '账号设置',
    desc: '管理头像、昵称、偏好和通知开关。',
    href: '/',
    tag: '设置',
  },
] as const;

const recentItems = [
  { title: '收藏了 3 位专家', meta: '今天 10:24', href: '/expertall/1' },
  { title: '浏览了 5 条热点资讯', meta: '今天 09:15', href: '/hot' },
  { title: '查看了 AI 推荐列表', meta: '昨天 22:08', href: '/ai' },
] as const;

const preferenceItems = [
  { title: '推送偏好', desc: '仅接收重点赛事与 AI 推荐提醒。' },
  { title: '内容偏好', desc: '优先显示专家推荐和热点资讯。' },
  { title: '账号状态', desc: '当前为未登录状态，登录后可同步数据。' },
] as const;

export default function MyPage() {
  return (
    <main className="page">
      <section className="shell" aria-label="个人中心">
        <header className="hero">
          <div className="heroTop">
            <div className="avatar" aria-hidden="true">A</div>
            <div className="heroText">
              <p className="eyebrow">ACCOUNT CENTER</p>
              <h1 className="title">我的</h1>
              <p className="desc">集中管理收藏、历史、订阅、会员与设置。这里不做花哨装饰，只保留清晰可用的个人中心内容。</p>
            </div>
          </div>

          <div className="badgeRow" aria-label="账号状态">
            <span className="badge badgeSoft">未登录</span>
            <span className="badge">普通会员</span>
            <span className="badge badgeSoft">偏好已保存</span>
          </div>

          <div className="heroStats" aria-label="个人数据概览">
            {heroStats.map((item) => (
              <article key={item.label} className="metricCard">
                <p className="metricLabel">{item.label}</p>
                <p className="metricValue">{item.value}</p>
                <p className="metricHint">{item.hint}</p>
              </article>
            ))}
          </div>

          <div className="heroActions">
            <Link href="/vip" className="primaryAction">开通会员</Link>
            <Link href="/ai" className="secondaryAction">查看订阅内容</Link>
          </div>
        </header>

        <section className="panel" aria-label="我的功能">
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">我的功能</h2>
              <p className="sectionSub">只放真正属于个人中心的入口</p>
            </div>
            <Link href="/" className="sectionLink">首页</Link>
          </div>

          <div className="actionGrid">
            {actionCards.map((item) => (
              <Link key={item.title} href={item.href} className="actionCard">
                <span className="actionTag">{item.tag}</span>
                <span className="actionTitle">{item.title}</span>
                <span className="actionDesc">{item.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="panel" aria-label="最近动态">
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">最近动态</h2>
              <p className="sectionSub">你最近看过和收藏过的内容</p>
            </div>
          </div>

          <div className="timeline">
            {recentItems.map((item) => (
              <Link key={item.title} href={item.href} className="timelineItem">
                <div className="timelineDot" aria-hidden="true" />
                <div className="timelineBody">
                  <p className="timelineTitle">{item.title}</p>
                  <p className="timelineMeta">{item.meta}</p>
                </div>
                <span className="arrow" aria-hidden="true">›</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="panel" aria-label="偏好设置">
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">偏好设置</h2>
              <p className="sectionSub">让首页和提醒更符合你的习惯</p>
            </div>
          </div>

          <div className="preferenceList">
            {preferenceItems.map((item) => (
              <article key={item.title} className="preferenceCard">
                <p className="preferenceTitle">{item.title}</p>
                <p className="preferenceDesc">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <style>{`
        .page {
          min-height: 100dvh;
          padding: 16px 14px 28px;
          background:
            radial-gradient(940px 360px at 100% -12%, rgba(59, 130, 246, 0.18), transparent 58%),
            radial-gradient(720px 260px at 0% -10%, rgba(16, 185, 129, 0.10), transparent 56%),
            #f5f7fb;
        }

        .shell {
          width: min(100%, 960px);
          margin: 0 auto;
          display: grid;
          gap: 12px;
        }

        .hero,
        .panel {
          border: 1px solid rgba(148, 163, 184, 0.22);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.10);
        }

        .hero {
          position: relative;
          overflow: hidden;
          padding: 18px;
          border-radius: 24px;
          background:
            radial-gradient(460px 220px at 100% 0%, rgba(96, 165, 250, 0.24), transparent 58%),
            linear-gradient(145deg, #0f172a 0%, #172554 56%, #0f766e 100%);
          color: #ffffff;
        }

        .hero::after {
          content: '';
          position: absolute;
          right: -52px;
          top: -60px;
          width: 184px;
          height: 184px;
          border-radius: 999px;
          background: rgba(96, 165, 250, 0.16);
          pointer-events: none;
        }

        .heroTop {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #60a5fa 0%, #22c55e 100%);
          color: #ffffff;
          font-size: 22px;
          font-weight: 900;
          box-shadow: 0 14px 28px rgba(15, 23, 42, 0.22);
        }

        .heroText {
          min-width: 0;
        }

        .eyebrow {
          color: #93c5fd;
          font-size: 11px;
          letter-spacing: 0.16em;
          font-weight: 800;
        }

        .title {
          margin-top: 4px;
          font-size: 31px;
          line-height: 1.08;
          font-weight: 900;
        }

        .desc {
          margin-top: 8px;
          max-width: 680px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 14px;
          line-height: 1.7;
        }

        .badgeRow {
          position: relative;
          z-index: 1;
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .badge {
          min-height: 28px;
          padding: 0 11px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.92);
          font-size: 12px;
          font-weight: 700;
        }

        .badgeSoft {
          background: rgba(255, 255, 255, 0.18);
        }

        .heroStats {
          position: relative;
          z-index: 1;
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .metricCard {
          padding: 12px;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.24);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
        }

        .metricLabel {
          color: rgba(226, 232, 240, 0.80);
          font-size: 11px;
        }

        .metricValue {
          margin-top: 6px;
          color: #ffffff;
          font-size: 22px;
          font-weight: 900;
        }

        .metricHint {
          margin-top: 4px;
          color: rgba(226, 232, 240, 0.72);
          font-size: 11px;
          line-height: 1.45;
        }

        .heroActions {
          position: relative;
          z-index: 1;
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .primaryAction,
        .secondaryAction,
        .sectionLink,
        .actionCard,
        .timelineItem {
          text-decoration: none;
        }

        .primaryAction,
        .secondaryAction {
          min-height: 42px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
        }

        .primaryAction {
          background: #ffffff;
          color: #0f172a;
        }

        .secondaryAction {
          background: rgba(255, 255, 255, 0.10);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .panel {
          padding: 16px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(10px);
        }

        .sectionHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
        }

        .sectionTitle {
          color: #0f172a;
          font-size: 17px;
          line-height: 1.2;
          font-weight: 900;
        }

        .sectionSub {
          margin-top: 4px;
          color: #64748b;
          font-size: 12px;
          line-height: 1.5;
        }

        .sectionLink {
          min-height: 30px;
          padding: 0 12px;
          border-radius: 999px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
        }

        .actionGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .actionCard {
          min-height: 108px;
          padding: 14px;
          border-radius: 18px;
          background: linear-gradient(168deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
          color: #0f172a;
          display: grid;
          gap: 7px;
        }

        .actionTag {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          min-height: 24px;
          padding: 0 10px;
          border-radius: 999px;
          background: #e0f2fe;
          color: #0369a1;
          font-size: 12px;
          font-weight: 800;
        }

        .actionTitle {
          font-size: 15px;
          font-weight: 900;
        }

        .actionDesc {
          color: #64748b;
          font-size: 12px;
          line-height: 1.55;
        }

        .timeline,
        .preferenceList {
          display: grid;
          gap: 10px;
        }

        .timelineItem {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px;
          border-radius: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0f172a;
        }

        .timelineDot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(180deg, #38bdf8 0%, #0ea5e9 100%);
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.10);
          flex: 0 0 auto;
        }

        .timelineBody {
          min-width: 0;
          flex: 1 1 auto;
        }

        .timelineTitle,
        .preferenceTitle {
          font-size: 14px;
          font-weight: 800;
        }

        .timelineMeta,
        .preferenceDesc {
          margin-top: 4px;
          color: #64748b;
          font-size: 12px;
          line-height: 1.55;
        }

        .preferenceCard {
          padding: 12px 12px 12px 14px;
          border-radius: 16px;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
        }

        .arrow {
          color: #94a3b8;
          font-size: 28px;
          line-height: 1;
          flex: 0 0 auto;
        }

        @media (min-width: 1024px) {
          .page {
            padding: 22px 20px 32px;
          }

          .shell {
            gap: 14px;
          }

          .hero,
          .panel {
            border-radius: 24px;
          }

          .hero {
            padding: 24px;
          }

          .panel {
            padding: 20px;
          }

          .title {
            font-size: 35px;
          }

          .actionGrid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      `}</style>
    </main>
  );
}
