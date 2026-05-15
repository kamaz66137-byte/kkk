/**
 * @packageDocumentation
 * @module components/sections/rank-banner
 * @description 红人榜 banner 图 + 足球相关 tab 切换栏
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { RankBannerProps } from './types';

export function RankBanner({ bannerImage, title, topTabs }: RankBannerProps) {
  const slides = useMemo(
    () => [
      { id: 'banner_01', src: bannerImage, objectPosition: 'left center' },
      { id: 'banner_02', src: bannerImage, objectPosition: 'center center' },
      { id: 'banner_03', src: bannerImage, objectPosition: 'right center' },
    ],
    [bannerImage],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, [paused, slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') {
      setPaused(true);
    }
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse') {
      setPaused(false);
    }
  };

  return (
    <>
      <section
        className="hc-banner-carousel"
        aria-label={`${title}轮播`}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <div className="hc-banner-viewport">
          <div
            className="hc-banner-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <article key={slide.id} className="hc-banner-slide" aria-hidden={index !== activeIndex}>
                <Image
                  src={slide.src}
                  alt={title}
                  className="hc-rank-banner-image"
                  width={750}
                  height={310}
                  style={{ objectPosition: slide.objectPosition }}
                />
              </article>
            ))}
          </div>
        </div>

        <button type="button" className="hc-banner-control is-prev" onClick={handlePrev} aria-label="上一张">
          ‹
        </button>
        <button type="button" className="hc-banner-control is-next" onClick={handleNext} aria-label="下一张">
          ›
        </button>

        <div className="hc-banner-dots" role="tablist" aria-label="轮播切换">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`切换到第${index + 1}张`}
              className={index === activeIndex ? 'hc-banner-dot is-active' : 'hc-banner-dot'}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </section>

      <section className="hc-topbar">
        <div className="hc-tabs">
          {topTabs.slice(0, 2).map((tab) => (
            <Link key={tab.id} href={tab.href} className="hc-tab-item">
              {tab.label}
            </Link>
          ))}
          {topTabs[2] && (
            <Link href={topTabs[2].href} className="hc-more-link">
              {topTabs[2].label}
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
