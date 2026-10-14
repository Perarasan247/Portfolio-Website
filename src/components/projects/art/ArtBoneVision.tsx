export function ArtBoneVision() {
  const boneFill = 'rgba(255,255,255,0.06)';
  const boneStroke = 'rgba(255,255,255,0.32)';
  const hiFill = 'rgba(245,165,36,0.22)';
  const hiStroke = 'rgba(245,165,36,0.95)';
  return (
    <svg viewBox="0 0 240 300" preserveAspectRatio="xMidYMid meet" className="art-svg">
      <defs>
        <filter id="bv-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft hand silhouette behind */}
      <path
        d="M 75 30 Q 70 100 78 145 L 60 165 Q 50 185 56 210 L 58 248 Q 60 275 100 280 L 160 280 Q 195 275 200 245 L 200 200 Q 200 180 188 165 L 162 145 Q 168 100 165 50 Q 158 28 145 32 Q 140 38 144 50 L 144 100 L 132 100 Q 130 35 122 28 Q 113 26 110 38 L 108 100 L 96 100 Q 96 35 86 30 Z"
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* Carpals (wrist) */}
      <g fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <ellipse cx="118" cy="276" rx="48" ry="7" />
        <ellipse cx="92" cy="262" rx="9" ry="6" />
        <ellipse cx="108" cy="258" rx="10" ry="7" />
        <ellipse cx="125" cy="258" rx="10" ry="7" />
        <ellipse cx="142" cy="262" rx="9" ry="6" />
      </g>

      {/* THUMB (1st) – angled outward */}
      <g transform="rotate(-30 72 245)" fill={boneFill} stroke={boneStroke} strokeWidth="1">
        {/* 1st metacarpal */}
        <rect x="65" y="195" width="14" height="48" rx="7" />
        <ellipse cx="72" cy="195" rx="8" ry="5" />
        <ellipse cx="72" cy="243" rx="9" ry="6" />
        {/* Proximal phalanx */}
        <rect x="66" y="160" width="12" height="32" rx="6" />
        <ellipse cx="72" cy="159" rx="7" ry="5" />
        {/* Distal phalanx */}
        <rect x="67" y="128" width="10" height="28" rx="5" />
        <ellipse cx="72" cy="127" rx="6" ry="4" />
      </g>

      {/* 2nd FINGER (HIGHLIGHTED METACARPAL) */}
      <g fill={hiFill} stroke={hiStroke} strokeWidth="1.5" filter="url(#bv-glow)">
        <rect x="80" y="160" width="14" height="86" rx="7" />
        <ellipse cx="87" cy="160" rx="8" ry="5" />
        <ellipse cx="87" cy="246" rx="9" ry="6" />
      </g>
      <g fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <rect x="81" y="108" width="12" height="48" rx="6" />
        <ellipse cx="87" cy="108" rx="7" ry="5" />
        <rect x="82" y="72" width="10" height="32" rx="5" />
        <ellipse cx="87" cy="72" rx="6" ry="4" />
        <rect x="83" y="42" width="8" height="26" rx="4" />
        <ellipse cx="87" cy="41" rx="5" ry="3" />
      </g>

      {/* 3rd FINGER (HIGHLIGHTED METACARPAL, longest) */}
      <g fill={hiFill} stroke={hiStroke} strokeWidth="1.5" filter="url(#bv-glow)">
        <rect x="111" y="152" width="14" height="94" rx="7" />
        <ellipse cx="118" cy="152" rx="8" ry="5" />
        <ellipse cx="118" cy="246" rx="9" ry="6" />
      </g>
      <g fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <rect x="112" y="96" width="12" height="52" rx="6" />
        <ellipse cx="118" cy="96" rx="7" ry="5" />
        <rect x="113" y="58" width="10" height="34" rx="5" />
        <ellipse cx="118" cy="58" rx="6" ry="4" />
        <rect x="114" y="24" width="8" height="30" rx="4" />
        <ellipse cx="118" cy="23" rx="5" ry="3" />
      </g>

      {/* 4th FINGER (HIGHLIGHTED METACARPAL) */}
      <g fill={hiFill} stroke={hiStroke} strokeWidth="1.5" filter="url(#bv-glow)">
        <rect x="141" y="158" width="14" height="88" rx="7" />
        <ellipse cx="148" cy="158" rx="8" ry="5" />
        <ellipse cx="148" cy="246" rx="9" ry="6" />
      </g>
      <g fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <rect x="142" y="104" width="12" height="50" rx="6" />
        <ellipse cx="148" cy="104" rx="7" ry="5" />
        <rect x="143" y="68" width="10" height="32" rx="5" />
        <ellipse cx="148" cy="68" rx="6" ry="4" />
        <rect x="144" y="38" width="8" height="26" rx="4" />
        <ellipse cx="148" cy="37" rx="5" ry="3" />
      </g>

      {/* 5th FINGER (PINKY) – tilted outward */}
      <g transform="rotate(12 175 250)" fill={boneFill} stroke={boneStroke} strokeWidth="1">
        <rect x="168" y="180" width="13" height="68" rx="6" />
        <ellipse cx="174.5" cy="180" rx="7" ry="5" />
        <ellipse cx="174.5" cy="248" rx="8" ry="5" />
        <rect x="169" y="138" width="11" height="38" rx="5" />
        <ellipse cx="174.5" cy="138" rx="6" ry="4" />
        <rect x="170" y="108" width="9" height="26" rx="4" />
        <ellipse cx="174.5" cy="108" rx="5" ry="3" />
        <rect x="171" y="82" width="7" height="22" rx="3" />
      </g>

      {/* Length-measurement guide on 3rd metacarpal */}
      <g stroke="rgba(245,165,36,0.75)" strokeWidth="1">
        <line x1="131" y1="152" x2="139" y2="152" />
        <line x1="131" y1="246" x2="139" y2="246" />
        <line x1="135" y1="152" x2="135" y2="246" strokeDasharray="3 3" opacity="0.65" />
      </g>

      {/* Bone labels */}
      <g
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="9"
        fill="rgba(245,165,36,0.9)"
        textAnchor="middle"
        letterSpacing="0.05em"
      >
        <text x="87" y="295">
          MC2
        </text>
        <text x="118" y="295">
          MC3
        </text>
        <text x="148" y="295">
          MC4
        </text>
      </g>
    </svg>
  );
}
