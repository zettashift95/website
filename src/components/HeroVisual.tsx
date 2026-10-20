"use client";

/**
 * HeroVisual — pure CSS animated graphic.
 * A large ambient orb with soft gradients, floating geometric rings,
 * and a subtle mesh grid. Zero canvas, zero HUD, zero debug text.
 * Inspired by Linear / Vercel / Stripe hero aesthetics.
 */
export default function HeroVisual() {
  return (
    <div
      className="relative w-full h-full min-h-[520px] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── base gradient background ──────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFF] via-[#F0F4FF] to-[#EBF5F5]" />

      {/* ── subtle dot grid ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #CBD5E8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── main orb glow ─────────────────────────────────────────── */}
      <div
        className="absolute rounded-full"
        style={{
          width: "520px",
          height: "520px",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at 38% 38%, rgba(0,102,255,0.18) 0%, rgba(0,102,255,0.07) 40%, rgba(0,212,178,0.06) 65%, transparent 80%)",
          filter: "blur(2px)",
          animation: "orbFloat 9s ease-in-out infinite",
        }}
      />

      {/* ── secondary neon bloom ──────────────────────────────────── */}
      <div
        className="absolute rounded-full"
        style={{
          width: "320px",
          height: "320px",
          top: "62%",
          left: "68%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,212,178,0.15) 0%, rgba(0,212,178,0.04) 55%, transparent 75%)",
          filter: "blur(1px)",
          animation: "orbFloat 12s ease-in-out infinite reverse",
        }}
      />

      {/* ── ring 1 — large outer ──────────────────────────────────── */}
      <div
        className="absolute rounded-full border border-[#0066FF]/[0.10]"
        style={{
          width: "460px",
          height: "460px",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          animation: "ringRotate 40s linear infinite",
        }}
      />

      {/* ── ring 2 — tilted medium ────────────────────────────────── */}
      <div
        className="absolute rounded-full border border-[#0066FF]/[0.07]"
        style={{
          width: "330px",
          height: "330px",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%) rotate(32deg)",
          animation: "ringRotate 28s linear infinite reverse",
        }}
      />

      {/* ── ring 3 — tight inner ──────────────────────────────────── */}
      <div
        className="absolute rounded-full border border-[#00D4B2]/[0.12]"
        style={{
          width: "210px",
          height: "210px",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          animation: "ringRotate 18s linear infinite",
        }}
      />

      {/* ── orbit dot on ring 1 ───────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          width: "460px",
          height: "460px",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          animation: "ringRotate 40s linear infinite",
        }}
      >
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-[#0066FF]"
          style={{
            top: "-5px",
            left: "50%",
            marginLeft: "-5px",
            boxShadow: "0 0 12px rgba(0,102,255,0.6)",
          }}
        />
      </div>

      {/* ── orbit dot on ring 2 ───────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          width: "330px",
          height: "330px",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%) rotate(32deg)",
          animation: "ringRotate 28s linear infinite reverse",
        }}
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-[#00D4B2]"
          style={{
            top: "-4px",
            left: "50%",
            marginLeft: "-4px",
            boxShadow: "0 0 10px rgba(0,212,178,0.7)",
          }}
        />
      </div>

      {/* ── center solid orb core ─────────────────────────────────── */}
      <div
        className="absolute rounded-full"
        style={{
          width: "80px",
          height: "80px",
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle at 38% 38%, #5599FF 0%, #0066FF 60%, #004ACC 100%)",
          boxShadow:
            "0 0 0 1px rgba(0,102,255,0.3), 0 0 32px rgba(0,102,255,0.25), 0 0 80px rgba(0,102,255,0.12)",
          animation: "orbPulse 6s ease-in-out infinite",
        }}
      />

      {/* ── small floating accent dots ────────────────────────────── */}
      {[
        { size: 6, top: "22%", left: "28%", color: "#0066FF", delay: "0s", dur: "7s" },
        { size: 4, top: "70%", left: "32%", color: "#00D4B2", delay: "1.5s", dur: "9s" },
        { size: 5, top: "35%", left: "78%", color: "#00D4B2", delay: "0.8s", dur: "8s" },
        { size: 3, top: "80%", left: "72%", color: "#0066FF", delay: "2s",   dur: "6s" },
        { size: 4, top: "15%", left: "62%", color: "#0066FF", delay: "3s",   dur: "10s" },
        { size: 3, top: "58%", left: "22%", color: "#00D4B2", delay: "0.3s", dur: "8s" },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            background: dot.color,
            opacity: 0.5,
            boxShadow: `0 0 ${dot.size * 3}px ${dot.color}80`,
            animation: `floatDot ${dot.dur} ease-in-out ${dot.delay} infinite`,
          }}
        />
      ))}

      {/* ── thin connector lines (SVG) ────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <line x1="165" y1="132" x2="330" y2="300" stroke="#0066FF" strokeWidth="0.5" strokeOpacity="0.12" />
        <line x1="468" y1="210" x2="330" y2="300" stroke="#0066FF" strokeWidth="0.5" strokeOpacity="0.10" />
        <line x1="192" y1="420" x2="330" y2="300" stroke="#00D4B2" strokeWidth="0.5" strokeOpacity="0.12" />
        <line x1="432" y1="480" x2="330" y2="300" stroke="#00D4B2" strokeWidth="0.5" strokeOpacity="0.10" />
        <line x1="372" y1="90"  x2="330" y2="300" stroke="#0066FF" strokeWidth="0.5" strokeOpacity="0.08" />
        <line x1="132" y1="348" x2="330" y2="300" stroke="#0066FF" strokeWidth="0.5" strokeOpacity="0.08" />
      </svg>

      {/* ── keyframes ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33%       { transform: translate(-50%, -52%) scale(1.03); }
          66%       { transform: translate(-48%, -50%) scale(0.98); }
        }
        @keyframes orbPulse {
          0%, 100% { box-shadow: 0 0 0 1px rgba(0,102,255,0.3), 0 0 32px rgba(0,102,255,0.25), 0 0 80px rgba(0,102,255,0.12); transform: translate(-50%,-50%) scale(1); }
          50%       { box-shadow: 0 0 0 1px rgba(0,102,255,0.4), 0 0 48px rgba(0,102,255,0.35), 0 0 110px rgba(0,102,255,0.18); transform: translate(-50%,-50%) scale(1.06); }
        }
        @keyframes ringRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50%       { transform: translateY(-10px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
