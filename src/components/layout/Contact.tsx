import { useEffect, useState } from 'react';
import { PROFILE } from '../../data/profile';
import { asset } from '../../utils/asset';
import { vars } from '../../utils/cssVars';
import { IconCheck, IconCopy, IconDownload } from '../icons/Icons';
import { IconEmail, IconGitHub, IconLinkedIn, IconTwitterX } from '../icons/SocialIcons';

type CopyState = 'idle' | 'copied' | 'failed';

const RESPONSE = [
  { k: 'name', v: PROFILE.name },
  { k: 'status', v: 'available' },
  { k: 'location', v: PROFILE.location },
];

const SOCIALS = [
  { href: PROFILE.socials.github, label: 'GitHub', Icon: IconGitHub },
  { href: PROFILE.socials.linkedin, label: 'LinkedIn', Icon: IconLinkedIn },
  { href: PROFILE.socials.twitter, label: 'X / Twitter', Icon: IconTwitterX },
];

export function Contact() {
  const [copy, setCopy] = useState<CopyState>('idle');

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
    <footer className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="stage reveal">
            <b>07</b> contact · inference
          </p>
          <h2 className="contact-title reveal" id="contact-title">
            Got a hard ML problem or a role I&rsquo;d love?{' '}
            <span className="hl-accent">Let&rsquo;s talk.</span>
          </h2>
          <div className="contact-cta reveal">
            <a className="btn btn-primary" href={'mailto:' + PROFILE.email}>
              <IconEmail /> Email me
            </a>
            <a
              className="btn btn-ghost"
              href={asset('assets/Resume_PD.pdf')}
              download="Perarasan_D_Resume.pdf"
            >
              <IconDownload /> Résumé (PDF)
            </a>
          </div>
          <ul className="socials reveal">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="terminal" data-reveal role="group" aria-label="Contact details">
          <div className="terminal-bar mono">
            <span className="terminal-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>POST /v1/hire</span>
            <span className="terminal-ok">200 OK</span>
          </div>
          <div className="terminal-body mono">
            <div className="t-line t-dim" style={vars({ '--i': 0 })} aria-hidden="true">
              # request
            </div>
            <div className="t-line" style={vars({ '--i': 1 })} aria-hidden="true">
              {'{ '}
              <span className="t-key">"role"</span>: <span className="t-str">"ML Engineer"</span>,{' '}
              <span className="t-key">"type"</span>: <span className="t-str">"full-time"</span>
              {' }'}
            </div>
            <div className="t-line t-dim t-gap" style={vars({ '--i': 2 })} aria-hidden="true">
              # response
            </div>
            <div className="t-line" style={vars({ '--i': 3 })} aria-hidden="true">
              {'{'}
            </div>
            {RESPONSE.map((r, i) => (
              <div
                className="t-line t-indent"
                key={r.k}
                style={vars({ '--i': 4 + i })}
                aria-hidden="true"
              >
                <span className="t-key">"{r.k}"</span>: <span className="t-str">"{r.v}"</span>,
              </div>
            ))}
            <div className="t-line t-indent terminal-email" style={vars({ '--i': 7 })}>
              <span className="terminal-email-value">
                <span className="t-key" aria-hidden="true">
                  "email"
                </span>
                <span aria-hidden="true">: </span>
                <a href={'mailto:' + PROFILE.email}>{PROFILE.email}</a>
              </span>
              <button type="button" className="copy-btn" onClick={copyEmail}>
                {copy === 'copied' ? <IconCheck /> : <IconCopy />}
                <span>
                  {copy === 'copied' ? 'Copied' : copy === 'failed' ? 'Copy failed' : 'Copy'}
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
            <div className="t-line" style={vars({ '--i': 8 })} aria-hidden="true">
              {'}'}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-row">
          <span>© 2026 {PROFILE.name}</span>
          <span className="mono">built with React · TypeScript · Vite</span>
        </div>
      </div>
    </footer>
  );
}
