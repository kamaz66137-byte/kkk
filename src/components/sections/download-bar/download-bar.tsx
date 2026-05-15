/**
 * @packageDocumentation
 * @module components/sections/download-bar
 * @description 底部下载提示条
 */

import type { DownloadBarProps } from './types';

export function DownloadBar({ text }: DownloadBarProps) {
  return (
    <section className="hc-download" aria-label="下载提示">
      <p className="hc-download-text">{text}</p>
    </section>
  );
}
