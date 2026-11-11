import { useEffect, useState } from 'react';
import { NAV_SECTIONS } from '../../data/navigation';
import { PROFILE } from '../../data/profile';
import { asset } from '../../utils/asset';
import { vars } from '../../utils/cssVars';
import { Marquee } from '../common/Marquee';
import { SplitText } from '../common/SplitText';
import { IconArrowUpRight, IconCheck, IconCopy, IconDownload, IconSpark } from '../icons/Icons';
import { IconEmail, IconGitHub, IconLinkedIn, IconTwitterX } from '../icons/SocialIcons';

type CopyState = 'idle' | 'copied' | 'failed';

const SOCIALS = [
  { href: PROFILE.socials.github, label: 'GitHub', Icon: IconGitHub },
  { href: PROFILE.socials.linkedin, label: 'LinkedIn', Icon: IconLinkedIn },
  { href: PROFILE.socials.twitter, label: 'X / Twitter', Icon: IconTwitterX },
];

function useLocalTime(timeZone: string): string {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = window.setInterval(() => setTime(fmt()), 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}

export function Contact() {
  const [copy, setCopy] = useState<CopyState>('idle');
  const time = useLocalTime('Asia/Kolkata');

  useEffect(() => {
    if (copy === 'idle') return;
    const t = window.setTimeout(() => setCopy('idle'), 2400);
    return () => window.clearTimeout(t);
  }, [copy]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopy('copied');
    } catch {
      setCopy('failed');
    }
  };

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-marquee" aria-hidden="true">
        <Marquee speed={28}>
          {['Let’s work together', 'Open to roles', 'Let’s build something'].map((t) => (
            <span className="cm-item" key={t}>
              {t} <IconSpark />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container contact-main">
        <div className="contact-copy">
          <p className="eyebrow reveal">
            <b>07</b> Contact
          </p>
          <SplitText
            as="h2"
            id="contact-title"
            className="contact-title"
            by="words"
            text={[
              { t: 'Got a hard ML problem or a role I’d love? ' },
              { t: 'Let’s talk.', className: 'serif accent' },
            ]}
          />

          <div className="mail-row reveal" style={vars({ '--i': 2 })}>
            <a className="mail-big" href={'mailto:' + PROFILE.email} data-cursor="Email">
              <IconEmail />
              <span>{PROFILE.email}</span>
            </a>
            <button type="button" className="copy-btn" onClick={copyEmail} data-magnetic="0.3">
              {copy === 'copied' ? <IconCheck /> : <IconCopy />}
              <span>
                {copy === 'copied' ? 'Copied!' : copy === 'failed' ? 'Copy failed' : 'Copy'}
              </span>
            </button>
            <span className="sr-only" role="status">
              {copy === 'copied'
                ? 'Email address copied to clipboard'
                : copy === 'failed'
                  ? 'Could not copy. Select the address to copy it manually.'
                  : ''}
            </span>
          </div>

          <div className="contact-cta reveal" style={vars({ '--i': 3 })}>
            <a className="btn btn-primary" href={'mailto:' + PROFILE.email} data-magnetic>
              Start a conversation <IconArrowUpRight />
            </a>
            <a
              className="btn btn-ghost"
              href={asset('assets/Resume_PD.pdf')}
              download="Perarasan_D_Resume.pdf"
              data-magnetic
            >
              <IconDownload /> Download résumé
            </a>
          </div>
        </div>

        <aside
          className="contact-card spot spot-border reveal"
          data-anim="scale"
          style={vars({ '--i': 2 })}
        >
          <div className="cc-row">
            <span className="mono cc-k">Status</span>
            <span className="cc-v">
              <span className="status-dot" aria-hidden="true" /> Available for work
            </span>
          </div>
          <div className="cc-row">
            <span className="mono cc-k">Location</span>
            <span className="cc-v">{PROFILE.location}</span>
          </div>
          <div className="cc-row">
            <span className="mono cc-k">Local time</span>
            <span className="cc-v mono tabular">{time} IST</span>
          </div>
          <ul className="cc-socials">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" data-magnetic="0.4">
                  <Icon />
                  <span>{label}</span>
                  <IconArrowUpRight className="cc-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="container">
        <div className="footer-big reveal" aria-hidden="true">
          {PROFILE.name.split(' ')[0].split('').map((ch, i) => (
            <span key={i} style={vars({ '--d': i })}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>
        <div className="footer-row">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </span>
          <nav className="footer-nav" aria-label="Footer">
            {NAV_SECTIONS.map((s) => (
              <a key={s.id} href={'#' + s.id}>
                {s.label}
              </a>
            ))}
          </nav>
          <span className="mono">Built with React · TypeScript · Vite</span>
        </div>
      </div>
    </footer>
  );
}
