import { useEffect, useRef, useState } from 'react';
import { AVATAR_VIDEO, PROFILE } from '../../data/profile';
import { asset } from '../../utils/asset';

type SoundState = 'on' | 'off' | 'blocked';

interface TalkingAvatarProps {
  /** Pause the avatar (e.g. while the intro modal is playing its own audio). */
  suspended?: boolean;
}

/**
 * Hero portrait that speaks: a looping, pre-rendered talking-avatar video.
 *
 * Browsers block unmuted autoplay until the visitor interacts with the page,
 * so we try to play with sound, fall back to muted playback, and unmute on the
 * first click / key / touch anywhere. The video pauses when the hero scrolls
 * out of view. If the video file is missing, the static portrait is shown.
 */
export function TalkingAvatar({ suspended = false }: TalkingAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantSound = useRef(true); // visitor's preference
  const blocked = useRef(false); // browser refused unmuted autoplay
  const visible = useRef(true);
  const suspendedRef = useRef(suspended);
  const [sound, setSound] = useState<SoundState>('on');
  const [failed, setFailed] = useState(false);

  const sync = () => setSound(blocked.current ? 'blocked' : wantSound.current ? 'on' : 'off');
  const canPlay = () => visible.current && !suspendedRef.current;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Respect reduced motion: don't autoplay; the sound button starts it.
      wantSound.current = false;
      sync();
    } else {
      v.muted = false;
      v.play()
        .then(() => {
          blocked.current = false;
          sync();
        })
        .catch(() => {
          blocked.current = true;
          v.muted = true;
          v.play().catch(() => {});
          sync();
        });
    }

    const unlock = () => {
      if (!blocked.current) return;
      blocked.current = false;
      v.muted = !wantSound.current;
      if (canPlay()) v.play().catch(() => {});
      sync();
    };
    const opts = { once: false, passive: true } as const;
    window.addEventListener('pointerdown', unlock, opts);
    window.addEventListener('keydown', unlock, opts);
    window.addEventListener('touchend', unlock, opts);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.intersectionRatio > 0.35;
        if (canPlay() && !v.ended) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    io.observe(v);

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchend', unlock);
      io.disconnect();
      v.pause();
    };
  }, [failed]);

  useEffect(() => {
    suspendedRef.current = suspended;
    const v = videoRef.current;
    if (!v) return;
    if (suspended) v.pause();
    else if (visible.current && sound !== 'off') v.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suspended]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // don't let the global unlock handler run first
    const v = videoRef.current;
    if (!v) return;
    if (blocked.current) {
      blocked.current = false;
      wantSound.current = true;
    } else {
      wantSound.current = !wantSound.current;
    }
    v.muted = !wantSound.current;
    if (wantSound.current && canPlay()) v.play().catch(() => {});
    sync();
  };

  const portrait = asset('assets/portrait.webp');

  if (failed) {
    return (
      <img
        src={portrait}
        alt={'Portrait of ' + PROFILE.name}
        width={768}
        height={1376}
        fetchPriority="high"
      />
    );
  }

  const label = sound === 'on' ? 'Mute my voice' : 'Play my voice';

  return (
    <>
      <video
        ref={videoRef}
        className="avatar-video"
        poster={portrait}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={`Talking avatar of ${PROFILE.name} giving a short introduction`}
        onError={() => setFailed(true)}
      >
        <source src={asset(AVATAR_VIDEO + '.webm')} type="video/webm" />
        <source
          src={asset(AVATAR_VIDEO + '.mp4')}
          type="video/mp4"
          onError={() => setFailed(true)}
        />
      </video>
      <button
        type="button"
        className={'avatar-sound' + (sound === 'blocked' ? ' is-hint' : '')}
        onClick={toggle}
        aria-label={label}
        aria-pressed={sound === 'on'}
        title={label}
        data-cursor={sound === 'on' ? 'Mute' : 'Sound'}
      >
        {sound === 'on' ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path
              d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path
              d="M16.5 9.5l5 5M21.5 9.5l-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}
