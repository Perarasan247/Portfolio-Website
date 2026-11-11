import type { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

/** Infinite horizontal loop: the content renders twice and the pair slides by one copy. */
export function Marquee({ children, speed = 40, reverse, className }: MarqueeProps) {
  return (
    <div
      className={'marquee' + (reverse ? ' reverse' : '') + (className ? ' ' + className : '')}
      style={{ ['--speed' as string]: speed + 's' }}
    >
      <div className="marquee-track">{children}</div>
      <div className="marquee-track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
