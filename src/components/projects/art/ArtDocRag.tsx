export function ArtDocRag() {
  const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
  return (
    <svg viewBox="0 0 240 170" preserveAspectRatio="xMidYMid meet" className="art-svg">
      <g>
        <rect
          x="36"
          y="22"
          width="98"
          height="128"
          rx="3"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        <rect
          x="28"
          y="14"
          width="98"
          height="128"
          rx="3"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
        />
        <rect
          x="20"
          y="6"
          width="98"
          height="128"
          rx="3"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
        />
      </g>
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round">
        <line x1="30" y1="22" x2="100" y2="22" />
        <line x1="30" y1="30" x2="108" y2="30" />
        <line x1="30" y1="38" x2="92" y2="38" />
        <line x1="30" y1="46" x2="104" y2="46" />
        <line x1="30" y1="54" x2="96" y2="54" />
        <line x1="30" y1="80" x2="108" y2="80" />
        <line x1="30" y1="88" x2="100" y2="88" />
        <line x1="30" y1="96" x2="106" y2="96" />
        <line x1="30" y1="104" x2="92" y2="104" />
        <line x1="30" y1="112" x2="104" y2="112" />
        <line x1="30" y1="120" x2="98" y2="120" />
      </g>
      <g>
        <rect
          x="28"
          y="60"
          width="90"
          height="12"
          rx="2"
          fill="rgba(245,165,36,0.20)"
          stroke="rgba(245,165,36,0.85)"
          strokeWidth="1"
        />
        <text
          x="124"
          y="70"
          fontFamily={mono}
          fontSize="10"
          fill="rgba(245,165,36,0.95)"
          fontWeight="700"
        >
          [1]
        </text>
      </g>
      <path
        d="M 138 68 Q 168 68 175 88"
        stroke="rgba(92,200,240,0.5)"
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
      />
      <g>
        <rect
          x="148"
          y="86"
          width="82"
          height="60"
          rx="4"
          fill="rgba(7,6,17,0.65)"
          stroke="rgba(92,200,240,0.7)"
          strokeWidth="1"
        />
        <text
          x="156"
          y="102"
          fontFamily={mono}
          fontSize="7"
          fill="rgba(92,200,240,0.9)"
          letterSpacing="0.15em"
        >
          CITATION
        </text>
        <text x="156" y="117" fontFamily={mono} fontSize="8" fill="rgba(255,255,255,0.88)">
          [1] doc.pdf
        </text>
        <text x="156" y="129" fontFamily={mono} fontSize="7" fill="rgba(255,255,255,0.55)">
          page 47 · 0.98
        </text>
        <line x1="156" y1="136" x2="222" y2="136" stroke="rgba(92,200,240,0.35)" strokeWidth="1" />
        <line x1="156" y1="141" x2="200" y2="141" stroke="rgba(92,200,240,0.35)" strokeWidth="1" />
      </g>
    </svg>
  );
}
