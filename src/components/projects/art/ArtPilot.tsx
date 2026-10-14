export function ArtPilot() {
  const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
  const cx = 130,
    cy = 108;
  const agents = [
    { name: 'ORCH', x: 130, y: 28, highlight: true },
    { name: 'BROWSER', x: 38, y: 88 },
    { name: 'DRIVE', x: 222, y: 88 },
    { name: 'AUTH', x: 38, y: 158 },
    { name: 'FS', x: 222, y: 158 },
  ];
  return (
    <svg viewBox="0 0 260 200" preserveAspectRatio="xMidYMid meet" className="art-svg">
      <defs>
        <filter id="pl-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="rgba(92,200,240,0.5)" strokeWidth="1" strokeDasharray="3 3" fill="none">
        {agents.map((a) => (
          <line key={a.name} x1={a.x} y1={a.y} x2={cx} y2={cy} />
        ))}
      </g>
      <g>
        <circle
          cx={cx}
          cy={cy}
          r="30"
          fill="rgba(180,240,90,0.22)"
          stroke="rgba(180,240,90,0.95)"
          strokeWidth="1.6"
          filter="url(#pl-glow)"
        />
        <circle
          cx={cx}
          cy={cy}
          r="20"
          fill="none"
          stroke="rgba(180,240,90,0.4)"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <text
          x={cx}
          y={cy - 1}
          fontFamily={mono}
          fontSize="11"
          fill="white"
          fontWeight="700"
          textAnchor="middle"
        >
          MCP
        </text>
        <text
          x={cx}
          y={cy + 11}
          fontFamily={mono}
          fontSize="6.5"
          fill="rgba(255,255,255,0.55)"
          letterSpacing="0.16em"
          textAnchor="middle"
        >
          FASTAPI
        </text>
      </g>
      {agents.map((a) => {
        const isOrch = a.highlight;
        const w = a.name.length * 6.5 + 18;
        return (
          <g key={a.name}>
            <rect
              x={a.x - w / 2}
              y={a.y - 13}
              width={w}
              height={26}
              rx={5}
              fill={isOrch ? 'rgba(245,165,36,0.18)' : 'rgba(7,6,17,0.65)'}
              stroke={isOrch ? 'rgba(245,165,36,0.95)' : 'rgba(92,200,240,0.7)'}
              strokeWidth="1"
            />
            <text
              x={a.x}
              y={a.y + 4}
              fontFamily={mono}
              fontSize="10"
              fill={isOrch ? 'rgba(245,165,36,0.98)' : 'rgba(92,200,240,0.95)'}
              textAnchor="middle"
              fontWeight="700"
            >
              {a.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
