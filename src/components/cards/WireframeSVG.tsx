"use client";

import { useState, useEffect } from "react";

const DIMS = ["W:1440 H:900", "W:1280 H:800", "W:390 H:844", "W:768 H:1024", "W:2560 H:1440"];

export default function WireframeSVG() {
  const [dimIdx, setDimIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setDimIdx((i) => (i + 1) % DIMS.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <svg
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Browser chrome */}
      <rect x="30" y="25" width="240" height="155" fill="none" stroke="#0066FF" strokeWidth="0.75" opacity="0.4" />
      <rect x="30" y="25" width="240" height="22" fill="rgba(0,102,255,0.06)" stroke="#0066FF" strokeWidth="0.75" opacity="0.5" />

      {/* Traffic lights */}
      <circle cx="45" cy="36" r="3.5" fill="#0066FF" opacity="0.25" />
      <circle cx="57" cy="36" r="3.5" fill="#0066FF" opacity="0.25" />
      <circle cx="69" cy="36" r="3.5" fill="#0066FF" opacity="0.25" />

      {/* URL bar */}
      <rect x="82" y="30" width="130" height="12" rx="1" fill="none" stroke="#0066FF" strokeWidth="0.5" opacity="0.3" />

      {/* Skeleton rows */}
      <rect x="45" y="60"  width="120" height="7" rx="0.5" fill="#0066FF" opacity="0.15" />
      <rect x="45" y="75"  width="90"  height="5" rx="0.5" fill="#0066FF" opacity="0.10" />
      <rect x="45" y="88"  width="210" height="4" rx="0.5" fill="#0066FF" opacity="0.08" />
      <rect x="45" y="98"  width="190" height="4" rx="0.5" fill="#0066FF" opacity="0.08" />
      <rect x="45" y="108" width="200" height="4" rx="0.5" fill="#0066FF" opacity="0.08" />

      {/* Card boxes — highlight on hover */}
      {[45, 119, 193].map((x, i) => (
        <rect
          key={i}
          x={x} y={122} width="62" height="44"
          fill="none"
          stroke="#0066FF"
          strokeWidth="0.5"
          opacity={hovered ? 0.7 : 0.3}
          style={{ transition: "opacity 300ms cubic-bezier(0.16,1,0.3,1)" }}
        />
      ))}

      {/* Pixel dimension readout */}
      <text
        x="150" y="18"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="5"
        fill="#0066FF"
        opacity="0.5"
        style={{ transition: "all 300ms ease" }}
      >
        {DIMS[dimIdx]}
      </text>
    </svg>
  );
}
