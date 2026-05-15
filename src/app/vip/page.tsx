import Link from 'next/link';

export default function VipPage() {
  return (
    <main className="page">
      <section className="wrap" aria-label="VIP专区">
        <header className="hero">
          <p className="kicker">VIP MEMBERSHIP</p>
          <h1 className="title">VIP专区</h1>
          <p className="desc">这里承接更高优先级的推荐、专属数据视图和临场判断入口，顶部不再只是一个标题块。</p>

          <div className="chipRow">
            <span className="chip">专属推荐</span>
            <span className="chip">临场优先</span>
            <span className="chip">数据视图</span>
          </div>

          <Link href="/" className="heroAction">返回首页</Link>
        </header>
      </section>

      <style>{`
        .page {
          min-height: 100dvh;
          padding: 16px 14px 28px;
          background:
            radial-gradient(900px 300px at 95% -10%, rgba(248, 113, 113, 0.16), transparent 60%),
            radial-gradient(680px 240px at 0% -10%, rgba(15, 23, 42, 0.12), transparent 62%),
            #f4f7fb;
        }

        .wrap {
          width: min(100%, 960px);
          margin: 0 auto;
        }

        .hero {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          padding: 22px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: linear-gradient(140deg, #0f172a 0%, #16243f 52%, #7c2d12 100%);
          color: #ffffff;
          box-shadow: 0 20px 44px rgba(15, 23, 42, 0.16);
        }

        .hero::after {
          content: '';
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 999px;
          right: -72px;
          top: -88px;
          background: rgba(248, 113, 113, 0.2);
        }

        .kicker {
          position: relative;
          z-index: 1;
          color: #fca5a5;
          font-size: 11px;
          letter-spacing: 0.18em;
          font-weight: 800;
        }

        .title {
          position: relative;
          z-index: 1;
          margin-top: 8px;
          font-size: 30px;
          line-height: 1.08;
          font-weight: 900;
        }

        .desc {
          position: relative;
          z-index: 1;
          margin-top: 10px;
          max-width: 720px;
          color: rgba(255, 255, 255, 0.84);
          font-size: 14px;
          line-height: 1.7;
        }

        .chipRow {
          position: relative;
          z-index: 1;
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          min-height: 28px;
          padding: 0 11px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.9);
          font-size: 12px;
          font-weight: 700;
        }

        .heroAction {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
          margin-top: 16px;
          padding: 0 16px;
          border-radius: 999px;
          background: #ffffff;
          color: #0f172a;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
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
        }
      `}</style>
    </main>
  );
}
