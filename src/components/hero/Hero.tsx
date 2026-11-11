import { useEffect, useState } from 'react';
import { FOCUS_AREAS, HIGHLIGHTS, PROFILE } from '../../data/profile';
import { asset } from '../../utils/asset';
import { vars } from '../../utils/cssVars';
import { CountUp } from '../common/CountUp';
import { SplitText } from '../common/SplitText';
import { NeuralCanvas } from '../fx/NeuralCanvas';
import { IconArrowDown, IconArrowRight, IconPlay } from '../icons/Icons';

interface HeroProps {
  onPlayIntro: () => void;
}

function Rotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => window.clearInterval(t);
  }, [words.length]);
  return (
    <span className="rotator" aria-live="off">
      {words.map((w, n) => (
        <span
          key={w}
          className={
            n === i
              ? 'rot-word on'
              : n === (i - 1 + words.length) % words.length
                ? 'rot-word out'
                : 'rot-word'
          }
          aria-hidden={n !== i}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

export function Hero({ onPlayIntro }: HeroProps) {
  const [first, ...rest] = PROFILE.name.split(' ');

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <NeuralCanvas />
        <div className="hero-grid-lines" />
        <div className="hero-vignette" />
      </div>

      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="hero-status reveal">
            <span className="status-dot" aria-hidden="true" />
            <span>{PROFILE.status}</span>
          </p>

          <h1 className="hero-title" id="hero-title">
            <SplitText text={first} className="hero-line" delay={1} />
            <SplitText
              text={[{ t: rest.join(' ') }, { t: '.', className: 'accent' }]}
              className="hero-line hero-line-2"
              delay={2}
            />
          </h1>

          <p className="hero-role reveal" style={vars({ '--i': 4 })}>
            <span className="hero-role-title">{PROFILE.role}</span>
            <span className="hero-role-sep" aria-hidden="true" />
            <span className="hero-role-build">
              building <Rotator words={FOCUS_AREAS} />
            </span>
          </p>

          <p className="hero-tagline reveal" style={vars({ '--i': 5 })}>
            {PROFILE.tagline}
          </p>

          <div className="hero-cta reveal" style={vars({ '--i': 6 })}>
            <a className="btn btn-primary" href="#projects" data-magnetic>
              View my work <IconArrowRight />
            </a>
            <a className="btn btn-ghost" href="#contact" data-magnetic>
              Get in touch
            </a>
          </div>
        </div>

        <figure className="portrait reveal" data-anim="clip" style={vars({ '--i': 3 })}>
          <div className="portrait-tilt" data-tilt="8">
            <div className="portrait-glow" aria-hidden="true" />
            <div className="portrait-frame">
              <img
                src={asset('assets/portrait.webp')}
                alt={'Portrait of ' + PROFILE.name}
                width={768}
                height={1376}
                fetchPriority="high"
              />
              <div className="portrait-scan" aria-hidden="true" />
              <span className="corner tl" aria-hidden="true" />
              <span className="corner tr" aria-hidden="true" />
              <span className="corner bl" aria-hidden="true" />
              <span className="corner br" aria-hidden="true" />
              <button type="button" className="intro-btn" onClick={onPlayIntro} data-cursor="Play">
                <span className="intro-btn-icon" aria-hidden="true">
                  <IconPlay />
                </span>
                Watch my intro
              </button>
            </div>
          </div>
          <figcaption className="portrait-meta mono">
            <span>{PROFILE.location}</span>
            <span>@ Alai Labs</span>
          </figcaption>
        </figure>
      </div>

      <div className="container hero-foot">
        <dl className="highlights">
          {HIGHLIGHTS.map((h, i) => (
            <div className="highlight reveal" key={h.label} style={vars({ '--i': 6 + i })}>
              <dt>{h.label}</dt>
              <dd className="tabular">
                <CountUp value={h.value} />
              </dd>
            </div>
          ))}
        </dl>
        <a className="scroll-cue reveal" href="#about" style={vars({ '--i': 9 })}>
          <span className="scroll-cue-track" aria-hidden="true">
            <IconArrowDown />
          </span>
          <span className="mono">Scroll</span>
        </a>
      </div>
    </section>
  );
}
