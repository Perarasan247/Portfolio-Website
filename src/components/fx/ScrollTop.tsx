import { IconArrowRight } from '../icons/Icons';

interface ScrollTopProps {
  progress: number;
}

const R = 25;
const C = 2 * Math.PI * R;

/** Floating back-to-top button whose ring fills with page scroll progress. */
export function ScrollTop({ progress }: ScrollTopProps) {
  return (
    <a
      href="#top"
      className={progress > 0.08 ? 'to-top show' : 'to-top'}
      aria-label="Back to top"
      data-magnetic
    >
      <svg className="ring" viewBox="0 0 54 54" aria-hidden="true">
        <circle className="track" cx="27" cy="27" r={R} />
        <circle
          className="bar"
          cx="27"
          cy="27"
          r={R}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <IconArrowRight className="arrow" />
    </a>
  );
}
