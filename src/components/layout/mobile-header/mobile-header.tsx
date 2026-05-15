/**
 * @packageDocumentation
 * @module components/layout/mobile-header
 * @description 移动端顶部导航栏（<1024px 显示）
 */

import type { MobileHeaderProps } from './types';
import Link from 'next/link';

export function MobileHeader({ brand }: MobileHeaderProps) {
  return (
    <header className="hc-mobile-header" role="banner">
      <Link href="/" className="hc-mobile-logo" aria-label={`${brand}首页`}>
        <span className="hc-mobile-logo-mark">A足</span>
        <span className="hc-mobile-logo-text">{brand}</span>
      </Link>
      <div className="hc-mobile-header-right">
        <Link href="/vip" className="hc-mobile-vip-btn">VIP</Link>
      </div>
    </header>
  );
}

