import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../../data/profile';
import { asset } from '../../utils/asset';

const BACK = [
  { b: 'ML Engineer', s: 'Alai Labs · CV · LLMs · RAG' },
  { b: 'M.Sc Applied Data Science', s: 'SRM · CGPA 9.15' },
  { b: 'Medical AI builder', s: 'BoneVision for SRM Medical College' },
  { b: 'Agent engineer', s: 'LangGraph · Google ADK · MCP' },
  { b: 'On-device GenAI', s: 'Offline RAG with Gemma on a phone' },
];

// Fixed barcode pattern so it doesn't change between renders.
const BARS = [1, 2, 1, 3, 1, 1, 2, 1, 2, 1, 3, 1, 1, 2, 1, 2, 1, 3, 1, 1, 2, 1, 2, 1, 3, 1, 1, 2];

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = () => window.matchMedia('(hover: none)').matches;

/**
 * An ID card hanging from a lanyard. It sways like a damped pendulum, gets
 * flicked by fast pointer movement, tilts toward the cursor, and flips over
 * on hover (or tap / Enter on touch and keyboard).
 */
export function IdCard() {
  const stageRef = useRef<HTMLDivElement>(null);
  const pendRef = useRef<HTMLDivElement>(null);
  const touch = useRef(false);
  const [flipped, setFlipped] = useState(false);
  const [touchHint, setTouchHint] = useState(false);

  useEffect(() => {
    touch.current = isTouch();
    setTouchHint(touch.current);
    if (prefersReducedMotion()) return;

    const pend = pendRef.current;
    const stage = stageRef.current;
    if (!pend || !stage) return;

    let angle = 0;
    let vel = 0;
    let raf = 0;
    let last = performance.now();
    const t0 = last;
    let lastX: number | null = null;
    let tilt = 0;
    let tiltTarget = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const rest = 0.8 * Math.sin((now - t0) / 1600); // gentle idle sway
      vel += (-38 * (angle - rest) - 2.6 * vel) * dt;
      angle += vel * dt;
      tilt += (tiltTarget - tilt) * 0.08;
      pend.style.transform = `rotate(${angle.toFixed(3)}deg) rotateY(${tilt.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (lastX !== null) vel += Math.max(-60, Math.min(60, (e.clientX - lastX) * 0.9));
      lastX = e.clientX;
      const r = stage.getBoundingClientRect();
      tiltTarget = ((e.clientX - (r.left + r.width / 2)) / r.width) * 16;
    };
    const onLeave = () => {
      lastX = null;
      tiltTarget = 0;
    };
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(stage);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const [first, ...rest] = PROFILE.name.toUpperCase().split(' ');
  const initials = PROFILE.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase();
  const strap = `${PROFILE.name.toUpperCase()} · ${PROFILE.role.toUpperCase()} · `;

  return (
    <div className="idc-stage" ref={stageRef}>
      <div className="idc-pend" ref={pendRef}>
        <div className="idc-strap" aria-hidden="true">
          <span>{strap.repeat(4)}</span>
        </div>
        <div className="idc-clip" aria-hidden="true">
          <i />
        </div>
        <div
          className={'idc' + (flipped ? ' is-flipped' : '')}
          tabIndex={0}
          role="button"
          aria-pressed={flipped}
          aria-label={`ID card of ${PROFILE.name}. Press to turn it over.`}
          onMouseEnter={() => !touch.current && setFlipped(true)}
          onMouseLeave={() => !touch.current && setFlipped(false)}
          onClick={() => touch.current && setFlipped((f) => !f)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFlipped((f) => !f);
            }
          }}
        >
          <div className="idc-inner">
            <div className="idc-face idc-front">
              <span className="idc-slot" aria-hidden="true" />
              <div className="idc-band">
                <span className="idc-logo">{initials}</span>
                <span className="idc-org">
                  <b>ENGINEER ID</b>
                  <span>Portfolio · {new Date().getFullYear()}</span>
                </span>
              </div>
              <div className="idc-photo">
                <span className="idc-photo-in">
                  <img
                    src={asset('assets/portrait.webp')}
                    alt=""
                    width={480}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </div>
              <div className="idc-name">
                {first} {rest.join(' ')}
              </div>
              <div className="idc-role">{PROFILE.role} · Alai Labs</div>
              <dl className="idc-rows">
                <div>
                  <dt>Dept.</dt>
                  <dd>AI / ML</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>Chennai</dd>
                </div>
                <div>
                  <dt>M.Sc</dt>
                  <dd>9.15</dd>
                </div>
              </dl>
              <div className="idc-foot" aria-hidden="true">
                <span className="idc-bars">
                  {BARS.map((w, i) => (
                    <i key={i} style={{ width: w }} />
                  ))}
                </span>
                <span className="idc-holo" />
              </div>
            </div>

            <div className="idc-face idc-back">
              <span className="idc-slot" aria-hidden="true" />
              <div className="idc-back-head">What I am</div>
              <ul className="idc-list">
                {BACK.map((r) => (
                  <li key={r.b}>
                    <span className="idc-tick" aria-hidden="true">
                      ✓
                    </span>
                    <span>
                      <b>{r.b}</b>
                      <span>{r.s}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="idc-sign serif">{PROFILE.name.split(' ')[0]}</div>
              <div className="idc-found">
                If found, say hello
                <br />
                {PROFILE.email}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="idc-hint mono">
        {touchHint ? 'Tap the card to turn it over' : 'Hover the card to turn it over'}
      </p>
    </div>
  );
}
