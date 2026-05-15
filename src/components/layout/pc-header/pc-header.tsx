/**
 * @packageDocumentation
 * @module components/layout/pc-header
 * @description PC 端顶部导航栏（>=1024px 显示）
 */

import type { PcHeaderProps } from './types';
import Link from 'next/link';

export function PcHeader({ brand, bottomTabs }: PcHeaderProps) {
  return (
    <header className="hc-pc-header" role="banner">
      <div className="hc-pc-header-inner">
        <Link href="/" className="hc-pc-logo" aria-label={`${brand}首页`}>
          <span className="hc-pc-logo-mark">A足</span>
          <span className="hc-pc-logo-text">{brand}</span>
        </Link>
        <nav className="hc-pc-nav" aria-label="站点导航">
          {bottomTabs.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              className={index === 0 ? 'hc-pc-nav-link is-active' : 'hc-pc-nav-link'}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hc-pc-header-actions">
          <Link href="/vip" className="hc-pc-vip-btn">开通 VIP</Link>
        </div>
      </div>
    </header>
  );
}

