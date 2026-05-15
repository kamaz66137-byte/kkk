/**
 * @packageDocumentation
 * @module components/sections/expert-grid
 * @description 红人榜专家头像网格
 */

import type { ExpertGridProps } from './types';
import Image from 'next/image';
import Link from 'next/link';

export function ExpertGrid({ experts }: ExpertGridProps) {
  return (
    <section className="hc-experts" aria-label="红人榜">
      <div className="hc-experts-grid">
        {experts.map((expert, index) => (
            <Link key={expert.id} href={`/expert/${expert.id}`} className="hc-expert-card">
              <Image
                src={expert.avatar}
                alt={expert.name}
                className="hc-avatar"
                width={44}
                height={44}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <span>{expert.name}</span>
            </Link>
          ))}
      </div>
    </section>
  );
}
