/**
 * @packageDocumentation
 * @module components/layout/bottom-nav
 * @description 移动端底部固定导航栏
 */

import type { BottomNavProps } from './types';

/**
 * @function normalizeNavIconKey
 * @description 统一底部导航图标索引，兼容 nav_xx 与 bottom_xx
 * @param {string} id 导航ID
 * @returns {'01' | '02' | '03' | '04' | '05' | 'other'} 图标键
 */
function normalizeNavIconKey(id: string): '01' | '02' | '03' | '04' | '05' | 'other' {
  const hit = /(\d{2})$/.exec(id)?.[1];

  if (hit === '01' || hit === '02' || hit === '03' || hit === '04' || hit === '05') {
    return hit;
  }

  return 'other';
}

/**
 * @function BottomNavIcon
 * @description 底部导航图标
 * @param {{id: string}} props
 * @returns {JSX.Element}
 */
function BottomNavIcon({ id }: { id: string }) {
  const iconKey = normalizeNavIconKey(id);

  if (iconKey === '01') {
    return (
      <svg className="hc-bottom-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V10.5Z" />
      </svg>
    );
  }

  if (iconKey === '02') {
    return (
      <svg className="hc-bottom-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />
        <path d="M18 8h3M19.5 6.5v3" />
      </svg>
    );
  }

  if (iconKey === '03') {
    return (
      <svg className="hc-bottom-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <rect x="5" y="10" width="14" height="10" rx="3" />
        <path d="M9 14h6M9 17h4" />
      </svg>
    );
  }

  if (iconKey === '04') {
    return (
      <svg className="hc-bottom-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 2 5 13h6l-1 9 8.5-11h-6L13.5 2Z" />
      </svg>
    );
  }

  return (
    <svg className="hc-bottom-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className="hc-bottom-nav" aria-label="底部导航">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={item.href}
          className={index === 0 ? 'hc-bottom-link is-active' : 'hc-bottom-link'}
        >
          <BottomNavIcon id={item.id} />
          {item.label}
        </a>
      ))}
    </nav>
  );
}
