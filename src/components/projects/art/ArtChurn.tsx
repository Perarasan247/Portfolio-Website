export function ArtChurn() {
  const COLS = 6,
    ROWS = 4;
  const atRisk = new Set(['1,1', '3,0', '4,2', '2,3', '0,2', '5,1']);
  const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
  const out = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${col},${row}`;
      const risk = atRisk.has(key);
      const cx = 32 + col * 26;
      const cy = 24 + row * 26;
      if (risk) {
        out.push(
          <circle
            key={`${key}-r`}
            cx={cx}
            cy={cy}
            r="10"
            fill="none"
            stroke="rgba(245,165,36,0.4)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />,
        );
      }
      out.push(
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={risk ? 6 : 4.5}
          fill={risk ? 'rgba(245,165,36,0.9)' : 'rgba(255,255,255,0.10)'}
          stroke={risk ? 'rgba(245,165,36,1)' : 'rgba(255,255,255,0.35)'}
          strokeWidth={risk ? 1.4 : 1}
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 240 140" preserveAspectRatio="xMidYMid meet" className="art-svg">
      {out}
      <g>
        <rect
          x="200"
          y="18"
          width="26"
          height="116"
          rx="4"
          fill="rgba(7,6,17,0.55)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
        <rect x="203" y="53" width="20" height="78" rx="3" fill="rgba(245,165,36,0.45)" />
        <line x1="200" y1="53" x2="226" y2="53" stroke="rgba(245,165,36,0.95)" strokeWidth="1.2" />
        <text
          x="213"
          y="13"
          fontFamily={mono}
          fontSize="7"
          fill="rgba(255,255,255,0.6)"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          RECALL
        </text>
        <text
          x="213"
          y="48"
          fontFamily={mono}
          fontSize="9"
          fill="rgba(245,165,36,0.95)"
          textAnchor="middle"
          fontWeight="700"
        >
          82%
        </text>
      </g>
    </svg>
  );
}
