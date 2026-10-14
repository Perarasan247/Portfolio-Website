export function ArtDataAgent() {
  const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace';
  return (
    <svg viewBox="0 0 260 220" preserveAspectRatio="xMidYMid meet" className="art-svg">
      <defs>
        <marker
          id="da-arr-c"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L9,5 L0,10 z" fill="rgba(92,200,240,0.85)" />
        </marker>
        <marker
          id="da-arr-v"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L9,5 L0,10 z" fill="rgba(180,240,90,0.85)" />
        </marker>
        <marker
          id="da-arr-o"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0,0 L9,5 L0,10 z" fill="rgba(245,165,36,0.9)" />
        </marker>
        <filter id="da-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Top-left: CSV file input */}
      <g>
        <path
          d="M 12 14 L 56 14 L 64 22 L 64 50 L 12 50 Z"
          fill="rgba(7,6,17,0.65)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        <path
          d="M 56 14 L 56 22 L 64 22"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        <text
          x="38"
          y="32"
          fontFamily={mono}
          fontSize="8"
          fill="rgba(255,255,255,0.85)"
          textAnchor="middle"
        >
          data.csv
        </text>
        <text
          x="38"
          y="43"
          fontFamily={mono}
          fontSize="6"
          fill="rgba(180,240,90,0.85)"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          7,043 ROWS
        </text>
      </g>

      {/* Top-right: question bubble */}
      <g>
        <rect
          x="160"
          y="14"
          width="92"
          height="36"
          rx="18"
          fill="rgba(180,240,90,0.14)"
          stroke="rgba(180,240,90,0.7)"
          strokeWidth="1"
        />
        <text
          x="206"
          y="32"
          fontFamily={mono}
          fontSize="9"
          fill="rgba(255,255,255,0.9)"
          textAnchor="middle"
        >
          "avg sales by
        </text>
        <text
          x="206"
          y="42"
          fontFamily={mono}
          fontSize="9"
          fill="rgba(255,255,255,0.9)"
          textAnchor="middle"
        >
          region?"
        </text>
      </g>

      {/* Input arrows down to agent */}
      <g stroke="rgba(180,240,90,0.55)" strokeWidth="1" fill="none" strokeDasharray="3 3">
        <path d="M 40 52 Q 60 85 105 102" markerEnd="url(#da-arr-v)" />
        <path d="M 210 52 Q 195 85 155 102" markerEnd="url(#da-arr-v)" />
      </g>

      {/* Center: Agent node */}
      <g>
        <circle
          cx="130"
          cy="116"
          r="32"
          fill="rgba(180,240,90,0.22)"
          stroke="rgba(180,240,90,0.95)"
          strokeWidth="1.6"
          filter="url(#da-glow)"
        />
        <circle
          cx="130"
          cy="116"
          r="22"
          fill="none"
          stroke="rgba(180,240,90,0.45)"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <text
          x="130"
          y="114"
          fontFamily={mono}
          fontSize="11"
          fill="white"
          textAnchor="middle"
          fontWeight="700"
        >
          AGENT
        </text>
        <text
          x="130"
          y="126"
          fontFamily={mono}
          fontSize="6.5"
          fill="rgba(255,255,255,0.55)"
          textAnchor="middle"
          letterSpacing="0.18em"
        >
          LANGGRAPH
        </text>
      </g>

      {/* Tool nodes */}
      <g fill="rgba(7,6,17,0.6)" stroke="rgba(92,200,240,0.7)" strokeWidth="1">
        <rect x="12" y="100" width="50" height="32" rx="4" />
        <rect x="198" y="100" width="50" height="32" rx="4" />
      </g>
      <g
        fontFamily={mono}
        fontSize="11"
        fill="rgba(92,200,240,0.95)"
        textAnchor="middle"
        fontWeight="700"
      >
        <text x="37" y="120">
          SQL
        </text>
        <text x="223" y="120">
          PY
        </text>
      </g>
      <g
        fontFamily={mono}
        fontSize="6"
        fill="rgba(92,200,240,0.6)"
        textAnchor="middle"
        letterSpacing="0.1em"
      >
        <text x="37" y="129">
          DUCKDB
        </text>
        <text x="223" y="129">
          SANDBOX
        </text>
      </g>

      {/* Agent ↔ tools */}
      <g stroke="rgba(92,200,240,0.6)" strokeWidth="1" fill="none">
        <line x1="98" y1="116" x2="68" y2="116" markerEnd="url(#da-arr-c)" />
        <line x1="162" y1="116" x2="192" y2="116" markerEnd="url(#da-arr-c)" />
      </g>

      {/* Retry loop arc */}
      <g stroke="rgba(245,165,36,0.75)" strokeWidth="1.2" fill="none" strokeDasharray="3 3">
        <path d="M 222 134 Q 250 168 210 180 Q 170 178 162 142" markerEnd="url(#da-arr-o)" />
      </g>
      <text
        x="246"
        y="158"
        fontFamily={mono}
        fontSize="8"
        fill="rgba(245,165,36,0.92)"
        letterSpacing="0.08em"
        textAnchor="end"
      >
        ↺ RETRY
      </text>

      {/* Output: answer chart card */}
      <g>
        <rect
          x="80"
          y="166"
          width="100"
          height="40"
          rx="6"
          fill="rgba(7,6,17,0.65)"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
        />
        <text
          x="88"
          y="180"
          fontFamily={mono}
          fontSize="7"
          fill="rgba(255,255,255,0.55)"
          letterSpacing="0.15em"
        >
          ANSWER
        </text>
        {/* Tiny bar chart */}
        <g fill="rgba(180,240,90,0.85)">
          <rect x="90" y="195" width="6" height="8" rx="1" />
          <rect x="100" y="190" width="6" height="13" rx="1" />
          <rect x="110" y="186" width="6" height="17" rx="1" />
          <rect x="120" y="192" width="6" height="11" rx="1" />
          <rect x="130" y="188" width="6" height="15" rx="1" />
        </g>
        <text
          x="172"
          y="200"
          fontFamily={mono}
          fontSize="9"
          fill="rgba(92,200,240,0.95)"
          textAnchor="end"
          fontWeight="700"
        >
          $42k
        </text>
      </g>

      {/* Agent → answer arrow */}
      <line
        x1="130"
        y1="148"
        x2="130"
        y2="162"
        stroke="rgba(180,240,90,0.7)"
        strokeWidth="1"
        markerEnd="url(#da-arr-v)"
      />
    </svg>
  );
}
