export function ArtTomato() {
  return (
    <svg viewBox="0 0 240 175" preserveAspectRatio="xMidYMid meet" className="art-svg">
      <defs>
        <filter id="tm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <path
        d="M 120 8 C 80 12 52 44 48 86 C 44 131 76 164 120 168 C 164 164 196 131 192 86 C 188 44 160 12 120 8 Z"
        fill="rgba(120,220,140,0.14)"
        stroke="rgba(120,220,140,0.75)"
        strokeWidth="1.5"
      />
      <line x1="120" y1="10" x2="120" y2="166" stroke="rgba(120,220,140,0.5)" strokeWidth="1.2" />
      <g stroke="rgba(120,220,140,0.4)" strokeWidth="1" fill="none">
        <path d="M 120 41 Q 95 46 70 64" />
        <path d="M 120 41 Q 145 46 170 64" />
        <path d="M 120 76 Q 88 81 60 101" />
        <path d="M 120 76 Q 152 81 180 101" />
        <path d="M 120 111 Q 92 116 72 131" />
        <path d="M 120 111 Q 148 116 168 131" />
      </g>
      <g fill="rgba(245,165,36,0.55)" stroke="rgba(245,165,36,0.95)" strokeWidth="0.8">
        <circle cx="82" cy="66" r="6" />
        <circle cx="95" cy="116" r="5" />
        <circle cx="145" cy="128" r="4" />
        <circle cx="105" cy="91" r="3" />
        <circle cx="155" cy="84" r="8" filter="url(#tm-glow)" />
      </g>
      <g stroke="rgba(245,165,36,0.95)" strokeWidth="1" fill="none">
        <circle cx="155" cy="84" r="14" strokeDasharray="3 3" />
        <line x1="135" y1="84" x2="143" y2="84" />
        <line x1="167" y1="84" x2="175" y2="84" />
        <line x1="155" y1="64" x2="155" y2="72" />
        <line x1="155" y1="96" x2="155" y2="104" />
      </g>
    </svg>
  );
}
