"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────── */
interface WFNode {
  id: string;
  x: number;       // 0–1 relative
  y: number;       // 0–1 relative
  label: string;
  sublabel: string;
  icon: string;    // emoji / symbol
  color: string;   // accent color
  state: "idle" | "active" | "processing" | "done";
  pulsePhase: number;
}

interface WFEdge {
  from: string;
  to: string;
  progress: number;   // 0–1 along the edge
  active: boolean;
  speed: number;
  color: string;
  id: string;
}

/* ─────────────────────────────────────────────────────────────────────────
   WORKFLOW DEFINITION  (positions are 0-1 fractions of canvas size)
───────────────────────────────────────────────────────────────────────── */
const NODE_DEFS: WFNode[] = [
  { id: "trigger",  x: 0.10, y: 0.42, label: "Trigger",      sublabel: "Webhook event",      icon: "⚡", color: "#0066FF", state: "active",     pulsePhase: 0 },
  { id: "ai1",      x: 0.30, y: 0.22, label: "AI Agent",     sublabel: "GPT-4o router",      icon: "🤖", color: "#0066FF", state: "processing",  pulsePhase: 1.2 },
  { id: "ai2",      x: 0.30, y: 0.62, label: "AI Agent",     sublabel: "Data extractor",     icon: "🤖", color: "#0066FF", state: "idle",        pulsePhase: 2.1 },
  { id: "classify", x: 0.52, y: 0.12, label: "Classifier",   sublabel: "Intent analysis",    icon: "🧠", color: "#00D4B2", state: "done",        pulsePhase: 0.5 },
  { id: "crm",      x: 0.52, y: 0.40, label: "CRM Update",   sublabel: "HubSpot sync",       icon: "📊", color: "#0066FF", state: "processing",  pulsePhase: 0.8 },
  { id: "email",    x: 0.52, y: 0.70, label: "Send Email",   sublabel: "Personalized reply", icon: "✉️", color: "#00D4B2", state: "idle",        pulsePhase: 1.8 },
  { id: "memory",   x: 0.74, y: 0.25, label: "Memory Store", sublabel: "Vector DB write",    icon: "🗄️", color: "#627D98", state: "done",        pulsePhase: 2.5 },
  { id: "notify",   x: 0.74, y: 0.55, label: "Notify",       sublabel: "Slack + Teams",      icon: "🔔", color: "#00D4B2", state: "processing",  pulsePhase: 1.0 },
  { id: "log",      x: 0.90, y: 0.42, label: "Audit Log",    sublabel: "Write & archive",    icon: "📋", color: "#627D98", state: "active",      pulsePhase: 3.1 },
];

const EDGE_DEFS = [
  { from: "trigger",  to: "ai1",      color: "#0066FF", speed: 0.006 },
  { from: "trigger",  to: "ai2",      color: "#0066FF", speed: 0.005 },
  { from: "ai1",      to: "classify", color: "#0066FF", speed: 0.007 },
  { from: "ai1",      to: "crm",      color: "#0066FF", speed: 0.006 },
  { from: "ai2",      to: "email",    color: "#00D4B2", speed: 0.005 },
  { from: "ai2",      to: "crm",      color: "#00D4B2", speed: 0.004 },
  { from: "classify", to: "memory",   color: "#00D4B2", speed: 0.006 },
  { from: "crm",      to: "notify",   color: "#0066FF", speed: 0.007 },
  { from: "email",    to: "notify",   color: "#00D4B2", speed: 0.005 },
  { from: "notify",   to: "log",      color: "#0066FF", speed: 0.006 },
  { from: "memory",   to: "log",      color: "#627D98", speed: 0.005 },
];

/* node radius on canvas */
const NR = 28;

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef(0);
  const nodesRef  = useRef<WFNode[]>(JSON.parse(JSON.stringify(NODE_DEFS)));
  const edgesRef  = useRef<WFEdge[]>(
    EDGE_DEFS.map((e, i) => ({
      ...e,
      id: `e${i}`,
      progress: Math.random(),
      active: true,
    }))
  );

  /* state cycling — advance node states on interval */
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      const states: WFNode["state"][] = ["idle", "active", "processing", "done"];
      nodesRef.current = nodesRef.current.map((n) => ({
        ...n,
        state: states[Math.floor(Math.random() * states.length)],
      }));
      forceUpdate((v) => v + 1);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const getNodePos = useCallback((id: string, W: number, H: number) => {
    const n = nodesRef.current.find((x) => x.id === id);
    if (!n) return { x: 0, y: 0 };
    return { x: n.x * W, y: n.y * H };
  }, []);

  const stateColor = (state: WFNode["state"]) => {
    if (state === "active")     return "#0066FF";
    if (state === "processing") return "#00D4B2";
    if (state === "done")       return "#22C55E";
    return "#E2E8F0";
  };

  const draw = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number) => {
    tRef.current += 1;
    const t = tRef.current;

    ctx.clearRect(0, 0, W, H);

    /* ── background ─────────────────────────────────────────── */
    ctx.fillStyle = "#F8F9FA";
    ctx.fillRect(0, 0, W, H);

    /* ── subtle dot grid ────────────────────────────────────── */
    const GRID = 32;
    for (let gx = 0; gx < W; gx += GRID) {
      for (let gy = 0; gy < H; gy += GRID) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10,37,64,0.06)";
        ctx.fill();
      }
    }

    /* ── draw edges ─────────────────────────────────────────── */
    edgesRef.current.forEach((edge) => {
      const from = getNodePos(edge.from, W, H);
      const to   = getNodePos(edge.to,   W, H);

      /* curved bezier control point */
      const mx  = (from.x + to.x) / 2;
      const my  = (from.y + to.y) / 2 - 28;

      /* base line */
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.quadraticCurveTo(mx, my, to.x, to.y);
      ctx.strokeStyle = "rgba(10,37,64,0.07)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* ── animated data pulse along the edge ──────────────── */
      edge.progress += edge.speed;
      if (edge.progress > 1) edge.progress = 0;

      const p = edge.progress;
      /* quadratic bezier position */
      const px = (1 - p) * (1 - p) * from.x + 2 * (1 - p) * p * mx + p * p * to.x;
      const py = (1 - p) * (1 - p) * from.y + 2 * (1 - p) * p * my + p * p * to.y;

      /* trailing glow */
      const trailGrd = ctx.createRadialGradient(px, py, 0, px, py, 14);
      const isNeon = edge.color === "#00D4B2";
      trailGrd.addColorStop(0, isNeon ? "rgba(0,212,178,0.3)" : "rgba(0,102,255,0.3)");
      trailGrd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fillStyle = trailGrd;
      ctx.fill();

      /* pulse dot */
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = edge.color;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    /* ── draw nodes ─────────────────────────────────────────── */
    nodesRef.current.forEach((node) => {
      const cx = node.x * W;
      const cy = node.y * H;
      node.pulsePhase += 0.022;
      const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
      const sc    = stateColor(node.state);

      /* outer glow ring when active/processing */
      if (node.state !== "idle") {
        const outerR = NR + 10 + pulse * 5;
        const outerGrd = ctx.createRadialGradient(cx, cy, NR, cx, cy, outerR + 8);
        outerGrd.addColorStop(0, `${sc}22`);
        outerGrd.addColorStop(1, `${sc}00`);
        ctx.beginPath();
        ctx.arc(cx, cy, outerR + 8, 0, Math.PI * 2);
        ctx.fillStyle = outerGrd;
        ctx.fill();

        /* animated ring */
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
        ctx.strokeStyle = `${sc}${Math.floor(40 + pulse * 80).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* node card shadow */
      ctx.shadowColor  = "rgba(10,37,64,0.10)";
      ctx.shadowBlur   = 16;
      ctx.shadowOffsetY = 4;

      /* node card background */
      ctx.beginPath();
      ctx.roundRect(cx - NR, cy - NR, NR * 2, NR * 2, 10);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      ctx.shadowColor = "transparent";
      ctx.shadowBlur  = 0;
      ctx.shadowOffsetY = 0;

      /* node card border */
      ctx.beginPath();
      ctx.roundRect(cx - NR, cy - NR, NR * 2, NR * 2, 10);
      ctx.strokeStyle = node.state !== "idle" ? `${sc}60` : "#E2E8F0";
      ctx.lineWidth = node.state !== "idle" ? 1.5 : 1;
      ctx.stroke();

      /* status indicator dot — top-right */
      ctx.beginPath();
      ctx.arc(cx + NR - 7, cy - NR + 7, 4, 0, Math.PI * 2);
      ctx.fillStyle = sc;
      ctx.fill();

      /* icon */
      ctx.font = "14px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.icon, cx, cy - 6);

      /* label text */
      ctx.font = "600 8px Inter, sans-serif";
      ctx.fillStyle = "#0A2540";
      ctx.fillText(node.label, cx, cy + 9);

      /* sublabel */
      ctx.font = "400 6.5px Inter, sans-serif";
      ctx.fillStyle = "#627D98";
      ctx.fillText(node.sublabel, cx, cy + 19);

      ctx.textAlign    = "left";
      ctx.textBaseline = "alphabetic";
    });

    /* ── processing shimmer on active nodes ─────────────────── */
    if (t % 2 === 0) {
      nodesRef.current
        .filter((n) => n.state === "processing")
        .forEach((node) => {
          const cx = node.x * W;
          const cy = node.y * H;
          const shimmerX = cx - NR + ((t * 2.5) % (NR * 4)) - NR;
          const shimGrd = ctx.createLinearGradient(shimmerX - 20, 0, shimmerX + 20, 0);
          shimGrd.addColorStop(0, "rgba(255,255,255,0)");
          shimGrd.addColorStop(0.5, "rgba(255,255,255,0.45)");
          shimGrd.addColorStop(1, "rgba(255,255,255,0)");
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(cx - NR + 1, cy - NR + 1, NR * 2 - 2, NR * 2 - 2, 9);
          ctx.clip();
          ctx.fillStyle = shimGrd;
          ctx.fillRect(cx - NR, cy - NR, NR * 2, NR * 2);
          ctx.restore();
        });
    }

    rafRef.current = requestAnimationFrame(() => draw(ctx, W, H));
  }, [getNodePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      W = canvas.width  = rect.width  * window.devicePixelRatio;
      H = canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width  = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    cancelAnimationFrame(rafRef.current);
    draw(ctx, W / window.devicePixelRatio, H / window.devicePixelRatio);

    const ro = new ResizeObserver(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    });
    ro.observe(canvas.parentElement!);

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [draw]);

  return (
    <div className="relative w-full h-full min-h-[520px] overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Live badge — bottom right, minimal */}
      <div className="absolute bottom-5 right-5 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-[#E2E8F0] px-3 py-1.5 rounded-full pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
        <span className="font-mono text-[0.5625rem] text-[#627D98] tracking-wide">Workflow running</span>
      </div>
    </div>
  );
}
