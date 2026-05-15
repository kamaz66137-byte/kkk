'use client';

import { useEffect, useState } from 'react';

/**
 * @interface BeforeInstallPromptEvent
 * @description PWA 安装前置提示事件
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * @function PwaInstallBanner
 * @description 提供可见的 PWA 安装入口
 * @returns {JSX.Element | null}
 */
export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      window.open('/', '_blank', 'noopener,noreferrer');
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="hc-pwa-banner" role="status" aria-live="polite">
      <div className="hc-pwa-banner__content">
        <p className="hc-pwa-banner__title">安装 A足球 到手机桌面</p>
        <p className="hc-pwa-banner__desc">安装后可快速启动、全屏显示，并保留基础离线访问能力。</p>
      </div>

      <div className="hc-pwa-banner__actions">
        <button type="button" className="hc-pwa-banner__button is-primary" onClick={handleInstall}>
          立即安装
        </button>
        <button type="button" className="hc-pwa-banner__button is-secondary" onClick={handleDismiss}>
          暂不
        </button>
      </div>

      <style>{`
        .hc-pwa-banner {
          position: fixed;
          left: 12px;
          right: 12px;
          bottom: calc(88px + env(safe-area-inset-bottom, 0px));
          z-index: 40;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(15, 23, 42, 0.96);
          border: 1px solid rgba(148, 163, 184, 0.22);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.28);
          color: #ffffff;
          backdrop-filter: blur(14px);
        }

        .hc-pwa-banner__content {
          display: grid;
          gap: 4px;
        }

        .hc-pwa-banner__title {
          font-size: 15px;
          font-weight: 900;
          line-height: 1.3;
        }

        .hc-pwa-banner__desc {
          color: rgba(226, 232, 240, 0.82);
          font-size: 12px;
          line-height: 1.55;
        }

        .hc-pwa-banner__actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .hc-pwa-banner__button {
          min-height: 40px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 800;
        }

        .hc-pwa-banner__button.is-primary {
          background: #ffffff;
          color: #0f172a;
        }

        .hc-pwa-banner__button.is-secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        @media (min-width: 768px) {
          .hc-pwa-banner {
            left: auto;
            right: 20px;
            bottom: 20px;
            width: 360px;
          }
        }
      `}</style>
    </div>
  );
}
