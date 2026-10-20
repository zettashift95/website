"use client";

// Static SVG — animations handled in CSS/SMIL, no JS needed
export default function NeuralSVG() {
  const layers: [number, number][] = [
    [60, 50], [60, 100], [60, 150],
    [150, 40], [150, 80], [150, 120], [150, 160],
    [240, 70], [240, 100], [240, 130],
  ];

  const connects: [number, number][] = [
    [0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],
    [3,7],[3,8],[4,7],[4,8],[4,9],[5,8],[5,9],[6,9],
  ];

  return (
    <svg
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#00D4B2" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00D4B2" stopOpacity="0"   />
        </radialGradient>
      </defs>

      {/* Connection lines */}
      {connects.map(([a, b], i) => (
        <line
          key={i}
          x1={layers[a][0]} y1={layers[a][1]}
          x2={layers[b][0]} y2={layers[b][1]}
          stroke="#00D4B2"
          strokeWidth="0.75"
          opacity="0.3"
        />
      ))}

      {/* Nodes with ripple rings */}
      {layers.map(([x, y], i) => (
        <g key={i}>
          {/* Ripple ring */}
          <circle cx={x} cy={y} r={0} fill="none" stroke="#00D4B2" strokeWidth="0.75">
            <animate
              attributeName="r"
              from="4" to="18"
              dur="2.5s"
              begin={`${i * 0.22}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.5" to="0"
              dur="2.5s"
              begin={`${i * 0.22}s`}
              repeatCount="indefinite"
            />
          </circle>
          {/* Core node */}
          <circle
            cx={x} cy={y}
            r={i === 0 || i === 9 ? 5 : 4}
            fill="#00D4B2"
            opacity="0.9"
          />
        </g>
      ))}
    </svg>
  );
}
