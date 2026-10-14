import { useRef } from 'react';
import { useModal } from '../../hooks/useModal';
import type { Certificate } from '../../types';
import { asset } from '../../utils/asset';
import { getFileKind } from '../../utils/fileKind';
import { IconArrowUpRight, IconClose, IconDownload, IconFile } from '../icons/Icons';

interface CertificateModalProps {
  cert: Certificate;
  onClose: () => void;
}

export function CertificateModal({ cert, onClose }: CertificateModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModal(dialogRef, onClose);
  const { isImage, isPdf } = getFileKind(cert.cert);
  const href = asset(cert.cert);

  return (
    <div className="overlay overlay-center" onClick={onClose} role="presentation">
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-title"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-bar">
          <span className="mono sheet-crumb">
            {cert.org} <span aria-hidden="true">·</span> {cert.year}
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

        <div className="dialog-head">
          <span className="cred-ico mono" aria-hidden="true">
            {cert.ico}
          </span>
          <div>
            <h2 className="dialog-title" id="cert-title">
              {cert.title}
            </h2>
            {cert.desc && <p className="dialog-desc">{cert.desc}</p>}
          </div>
        </div>

        <div className="cert-viewer">
          {isPdf && (
            <iframe
              className="cert-frame"
              src={href + '#view=FitH&toolbar=0&navpanes=0'}
              title={cert.title + ' certificate'}
            />
          )}
          {isImage && <img className="cert-img" src={href} alt={cert.title + ' certificate'} />}
          <div className={isPdf ? 'cert-fallback pdf' : 'cert-fallback'} hidden={isImage}>
            <IconFile />
            <p>
              {isPdf
                ? 'Inline PDF preview isn’t supported on this device.'
                : 'Preview isn’t available for this file type.'}
            </p>
          </div>
        </div>

        <div className="dialog-cta">
          <a className="btn btn-primary" href={href} target="_blank" rel="noopener noreferrer">
            Open {isPdf ? 'PDF' : 'file'} <IconArrowUpRight />
          </a>
          <a className="btn btn-ghost" href={href} download>
            Download <IconDownload />
          </a>
        </div>
      </div>
    </div>
  );
}
