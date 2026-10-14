import { FOCUS_AREAS, HIGHLIGHTS, PROFILE } from '../../data/profile';
import { asset } from '../../utils/asset';
import { vars } from '../../utils/cssVars';
import { CountUp } from '../common/CountUp';
import { IconArrowRight, IconPlay } from '../icons/Icons';

interface HeroProps {
  onPlayIntro: () => void;
}

export function Hero({ onPlayIntro }: HeroProps) {
  const [first, ...rest] = PROFILE.name.split(' ');

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-status reveal">
            <span className="status-dot" aria-hidden="true" />
            <span>{PROFILE.status}</span>
          </p>

          <h1 className="hero-title" id="hero-title">
            <span className="hero-line">
              <span style={vars({ '--l': 0 })}>{first}</span>
            </span>
            <span className="hero-line hero-title-last">
              <span style={vars({ '--l': 1 })}>{rest.join(' ')}</span>
            </span>
          </h1>

          <p className="hero-role reveal" style={vars({ '--i': 1 })}>
            <span className="hero-role-bar" aria-hidden="true" />
            <span className="hero-role-title">{PROFILE.role}</span>
            <span className="hero-role-meta mono">@ Alai Labs</span>
          </p>

          <p className="hero-tagline reveal" style={vars({ '--i': 2 })}>
            {PROFILE.tagline}
          </p>

          <ul className="focus reveal" style={vars({ '--i': 3 })} aria-label="Focus areas">
            {FOCUS_AREAS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <div className="hero-cta reveal" style={vars({ '--i': 4 })}>
            <a className="btn btn-primary" href="#projects">
              View projects <IconArrowRight />
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        <figure className="detect reveal" style={vars({ '--i': 2 })}>
          <div className="detect-frame">
            <img
              src={asset('assets/portrait.webp')}
              alt={'Portrait of ' + PROFILE.name}
              width={768}
              height={1376}
            />
            <div className="detect-box" aria-hidden="true">
              <span className="detect-label mono">person · 0.99</span>
            </div>
            <div className="detect-scan" aria-hidden="true" />
            <button type="button" className="intro-btn" onClick={onPlayIntro}>
              <span className="intro-btn-icon" aria-hidden="true">
                <IconPlay />
              </span>
              Click to watch my intro
            </button>
          </div>
          <figcaption className="detect-meta mono">
            <span>input · portrait</span>
            <span>{PROFILE.location}</span>
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <dl className="highlights">
          {HIGHLIGHTS.map((h, i) => (
            <div className="highlight reveal" key={h.label} style={vars({ '--i': i })}>
              <dt>{h.label}</dt>
              <dd className="mono tabular">
                <CountUp value={h.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
