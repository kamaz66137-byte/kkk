/**
 * @packageDocumentation
 * @module layout
 * @since 1.0.0
 * @author zkali
 * @tags [layout, root]
 * @description 应用根布局，配置全局元数据与字体
 * @path src/app/layout.tsx
 */

import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import './layout-nav.css';
import { BottomNav } from '@/components/layout/bottom-nav';
import { MobileHeader } from '@/components/layout/mobile-header';
import { PcHeader } from '@/components/layout/pc-header';
import { mokeFooter, mokeNavigation } from '@/moke';
import { PwaInstallBanner } from './pwa-install-banner';

export const metadata: Metadata = {
  title: 'A足球 - 专业足球赛事分析平台',
  description: '汇聚专家推荐、AI预测、赛事数据，为您精准推荐足球红单，助您把握每一场胜局',
  keywords: '足球红单,足球推荐,足球预测,专家推荐,AI分析,赛事分析',
  manifest: '/manifest.webmanifest',
  authors: [{ name: 'zkali' }],
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    title: 'A足球',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'A足球 - 专业足球赛事分析平台',
    description: '汇聚专家推荐、AI预测、赛事数据',
    type: 'website',
    locale: 'zh_CN',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07090f',
};

/**
 * @interface RootLayoutProps
 * @description 根布局组件 Props
 * @property {React.ReactNode} children - 子节点
 */
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

/**
 * @function RootLayout
 * @description 应用根布局
 * @param {RootLayoutProps} props
 * @returns {JSX.Element}
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <PcHeader brand={mokeNavigation.brand} bottomTabs={mokeNavigation.bottom_tabs} />
        <MobileHeader brand={mokeNavigation.brand} />

        <div className="hc-app-content">{children}</div>

        <BottomNav items={mokeFooter.bottom_nav} />
        <PwaInstallBanner />
        <Script id="pwa-register" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) { window.addEventListener('load', function () { navigator.serviceWorker.register('/sw.js').catch(function () {}); }); }`}
        </Script>
      </body>
    </html>
  );
}
