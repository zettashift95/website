"use client";

import { useState } from "react";

const DATA: [number, number][] = [
  [55, 148], [90, 142], [120, 130], [150, 112],
  [180, 90], [210, 65], [240, 45], [265, 35],
];

const LINE_D = DATA.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
const AREA_D = LINE_D + " L265,160 L55,160 Z";

export default function ChartSVG() {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <defs>
        <linearGradient id="chart-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#00D4B2" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00D4B2" stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      <line x1="40" y1="30"  x2="40"  y2="160" stroke="#E2E8F0" strokeWidth="0.5" />
      <line x1="40" y1="160" x2="275" y2="160" stroke="#E2E8F0" strokeWidth="0.5" />
      {[130, 100, 70, 40].map((y) => (
        <line key={y} x1="40" y1={y} x2="275" y2={y} stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="3,3" />
      ))}

      {/* Y-axis labels */}
      {[
        { y: 163, label: "0"    },
        { y: 133, label: "25K"  },
        { y: 103, label: "50K"  },
        { y:  73, label: "75K"  },
        { y:  43, label: "100K" },
      ].map(({ y, label }) => (
        <text
          key={y} x="33" y={y}
          textAnchor="end"
          fontFamily="JetBrains Mono, monospace"
          fontSize="6"
          fill="#627D98"
        >
          {label}
        </text>
      ))}

      {/* Fill area */}
      <path d={AREA_D} fill="url(#chart-fill)" />

      {/* Chart line */}
      <path
        d={LINE_D}
        fill="none"
        stroke="#00D4B2"
        strokeWidth={hovered ? 2.5 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke-width 300ms cubic-bezier(0.16,1,0.3,1)" }}
      />

      {/* Pulsing data dots */}
      {DATA.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="none" stroke="#00D4B2" strokeWidth="1">
            <animate attributeName="r" from="3" to="10" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r="3" fill="#00D4B2" />
        </g>
      ))}

      {/* Annotation */}
      <text x="255" y="38" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#00D4B2" fontWeight="600">
        +218%
      </text>
      <text x="255" y="48" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill="#627D98">
        YoY Growth
      </text>
    </svg>
  );
}
