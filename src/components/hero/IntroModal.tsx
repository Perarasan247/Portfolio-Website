import { useRef, useState } from 'react';
import { INTRO_VIDEO } from '../../data/profile';
import { useModal } from '../../hooks/useModal';
import { asset } from '../../utils/asset';
import { IconClose, IconPlay } from '../icons/Icons';

interface IntroModalProps {
  onClose: () => void;
}

export function IntroModal({ onClose }: IntroModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);
  useModal(dialogRef, onClose);

  return (
    <div className="overlay overlay-center" onClick={onClose} role="presentation">
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-bar">
          <span className="mono sheet-crumb" id="intro-title">
            intro · Perarasan D
          </span>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
            data-autofocus
          >
            <IconClose />
          </button>
        </div>

        {unavailable ? (
          <div className="intro-empty">
            <IconPlay />
            <p>The intro video is coming soon.</p>
          </div>
        ) : (
          <video
            className="sheet-media"
            src={asset(INTRO_VIDEO)}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label="Introduction video"
            onError={() => setUnavailable(true)}
          />
        )}
      </div>
    </div>
  );
}
