"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  hue: string;
  pulse: number;
  alpha: number;
  orbitAngle: number;
  orbitSpeed: number;
  orbitR: number;
  orbitCx: number;
  orbitCy: number;
  type: "free" | "orbit";
}

interface DataStream {
  x: number; y: number;
  angle: number;
  speed: number;
  length: number;
  alpha: number;
  color: string;
}

interface Ring {
  cx: number; cy: number;
  r: number; maxR: number;
  alpha: number;
  speed: number;
  color: string;
}

const BLUE = "#0066FF";
const NEON  = "#00D4B2";
const MID   = "#4D94FF";

export default function HeroCanvas() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const streamsRef   = useRef<DataStream[]>([]);
  const ringsRef     = useRef<Ring[]>([]);
  const rafRef       = useRef<number>(0);
  const tRef         = useRef(0);
  const coordTLRef   = useRef<HTMLSpanElement>(null);

  const HEX_SIZE = 52;

  const hexPoints = (cx: number, cy: number, size: number) => {
    return Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return [cx + size * Math.cos(a), cy + size * Math.sin(a)];
    });
  };

  const initScene = useCallback((W: number, H: number) => {
    // Free particles
    const free: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
      hue: Math.random() < 0.3 ? NEON : BLUE,
      pulse: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.5 + 0.4,
      orbitAngle: 0, orbitSpeed: 0, orbitR: 0, orbitCx: 0, orbitCy: 0,
      type: "free",
    }));

    // Orbit clusters around 3 focal points
    const foci = [
      { cx: W * 0.25, cy: H * 0.35 },
      { cx: W * 0.75, cy: H * 0.5 },
      { cx: W * 0.5,  cy: H * 0.72 },
    ];
    const orbiters: Particle[] = foci.flatMap((f) =>
      Array.from({ length: 8 }, (_, i) => ({
        x: f.cx, y: f.cy,
        vx: 0, vy: 0,
        r: Math.random() * 1.6 + 1,
        hue: Math.random() < 0.5 ? NEON : BLUE,
        pulse: Math.random() * Math.PI * 2,
        alpha: 0.7,
        orbitAngle: (i / 8) * Math.PI * 2,
        orbitSpeed: (Math.random() * 0.004 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
        orbitR: Math.random() * 40 + 20,
        orbitCx: f.cx, orbitCy: f.cy,
        type: "orbit" as const,
      }))
    );

    particlesRef.current = [...free, ...orbiters];

    // Data streams — diagonal lines that travel across
    streamsRef.current = Array.from({ length: 18 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      angle: (Math.random() * Math.PI) / 3 + Math.PI / 8,
      speed: Math.random() * 1.2 + 0.6,
      length: Math.random() * 60 + 30,
      alpha: Math.random() * 0.12 + 0.04,
      color: Math.random() < 0.5 ? BLUE : NEON,
    }));

    ringsRef.current = [];
  }, []);

  const spawnRing = useCallback((x: number, y: number) => {
    ringsRef.current.push({
      cx: x, cy: y,
      r: 0, maxR: 80 + Math.random() * 60,
      alpha: 0.5,
      speed: 1.2 + Math.random() * 0.8,
      color: Math.random() < 0.5 ? BLUE : NEON,
    });
  }, []);

  const drawHexGrid = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
    const cols = Math.ceil(W / (HEX_SIZE * 1.73)) + 2;
    const rows = Math.ceil(H / (HEX_SIZE * 1.5)) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const cx = col * HEX_SIZE * 1.73 + (row % 2 === 0 ? 0 : HEX_SIZE * 0.866);
        const cy = row * HEX_SIZE * 1.5;

        // Subtle breathing alpha
        const breathe = Math.sin(t * 0.0008 + cx * 0.005 + cy * 0.005) * 0.5 + 0.5;
        const alpha = 0.025 + breathe * 0.018;

        const pts = hexPoints(cx, cy, HEX_SIZE - 2);
        ctx.beginPath();
        pts.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)));
        ctx.closePath();
        ctx.strokeStyle = `rgba(0,102,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }, [HEX_SIZE]);

  const drawScanBeam = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => {
    // Horizontal scan line
    const scanY = ((t * 0.04) % (H + 80)) - 40;
    const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    grad.addColorStop(0, "rgba(0,102,255,0)");
    grad.addColorStop(0.5, "rgba(0,102,255,0.04)");
    grad.addColorStop(1, "rgba(0,102,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 30, W, 60);

    // Scan line itself
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(W, scanY);
    ctx.strokeStyle = "rgba(0,102,255,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Vertical scan (slower)
    const scanX = ((t * 0.025) % (W + 80)) - 40;
    const gradV = ctx.createLinearGradient(scanX - 30, 0, scanX + 30, 0);
    gradV.addColorStop(0, "rgba(0,212,178,0)");
    gradV.addColorStop(0.5, "rgba(0,212,178,0.025)");
    gradV.addColorStop(1, "rgba(0,212,178,0)");
    ctx.fillStyle = gradV;
    ctx.fillRect(scanX - 30, 0, 60, H);
  }, []);

  const drawStreams = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number) => {
    streamsRef.current.forEach((s) => {
      // Move
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      if (s.x > W + 80 || s.y > H + 80) {
        s.x = Math.random() * W * 0.5;
        s.y = Math.random() * H * 0.5;
      }

      const ex = s.x - Math.cos(s.angle) * s.length;
      const ey = s.y - Math.sin(s.angle) * s.length;
      const g = ctx.createLinearGradient(ex, ey, s.x, s.y);
      g.addColorStop(0, `rgba(${s.color === BLUE ? "0,102,255" : "0,212,178"},0)`);
      g.addColorStop(1, `rgba(${s.color === BLUE ? "0,102,255" : "0,212,178"},${s.alpha})`);
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = g;
      ctx.lineWidth = 0.75;
      ctx.stroke();
    });
  }, []);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, mx: number, my: number) => {
    const pts = particlesRef.current;
    const DIST = 100;
    const MOUSE_DIST = 130;

    for (let i = 0; i < pts.length; i++) {
      // Particle to particle
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          const a = (1 - d / DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,102,255,${a})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      // Mouse connections
      const dx = mx - pts[i].x, dy = my - pts[i].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_DIST) {
        const a = (1 - d / MOUSE_DIST) * 0.4;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = `rgba(0,212,178,${a})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, mx: number, my: number) => {
    const PULL = 140;
    particlesRef.current.forEach((p) => {
      p.pulse += 0.018;

      if (p.type === "orbit") {
        p.orbitAngle += p.orbitSpeed;
        p.x = p.orbitCx + Math.cos(p.orbitAngle) * p.orbitR;
        p.y = p.orbitCy + Math.sin(p.orbitAngle) * p.orbitR;
      } else {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < PULL && dist > 0) {
          const f = (1 - dist / PULL) * 0.02;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }
        p.vx *= 0.991; p.vy *= 0.991;
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 1.4) { p.vx = (p.vx / sp) * 1.4; p.vy = (p.vy / sp) * 1.4; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      }

      const pr = p.r + Math.sin(p.pulse) * 0.7;
      const isNeon = p.hue === NEON;

      // Glow halo
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 7);
      grd.addColorStop(0, isNeon ? "rgba(0,212,178,0.15)" : "rgba(0,102,255,0.12)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, pr * 7, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
      ctx.fillStyle = p.hue;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }, []);

  const drawRings = useCallback((ctx: CanvasRenderingContext2D) => {
    ringsRef.current = ringsRef.current.filter((ring) => ring.alpha > 0.005);
    ringsRef.current.forEach((ring) => {
      ring.r += ring.speed;
      ring.alpha *= 0.965;
      ctx.beginPath();
      ctx.arc(ring.cx, ring.cy, ring.r, 0, Math.PI * 2);
      const isNeon = ring.color === NEON;
      ctx.strokeStyle = isNeon
        ? `rgba(0,212,178,${ring.alpha})`
        : `rgba(0,102,255,${ring.alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }, []);

  const drawCornerBrackets = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number) => {
    const SIZE = 18;
    const corners = [
      [0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1],
    ] as [number, number, number, number][];

    ctx.strokeStyle = "rgba(0,102,255,0.35)";
    ctx.lineWidth = 1.5;
    corners.forEach(([x, y, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(x + dx * SIZE, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * SIZE);
      ctx.stroke();
    });
  }, []);

  const drawMouseCursor = useCallback((ctx: CanvasRenderingContext2D, mx: number, my: number, W: number, H: number) => {
    if (mx < 0 || mx > W || my < 0 || my > H) return;

    // Crosshair
    ctx.strokeStyle = "rgba(0,102,255,0.25)";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(mx, 0); ctx.lineTo(mx, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, my); ctx.lineTo(W, my); ctx.stroke();
    ctx.setLineDash([]);

    // Target ring
    ctx.beginPath();
    ctx.arc(mx, my, 12, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,212,178,0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(mx, my, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,212,178,0.8)";
    ctx.fill();
  }, []);

  const frame = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number) => {
    tRef.current++;
    const t = tRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    ctx.clearRect(0, 0, W, H);

    // BG
    ctx.fillStyle = "#F8F9FA";
    ctx.fillRect(0, 0, W, H);

    // Hex grid
    drawHexGrid(ctx, W, H, t);

    // Scan beams
    drawScanBeam(ctx, W, H, t);

    // Data streams
    drawStreams(ctx, W, H);

    // Connections
    drawConnections(ctx, mx, my);

    // Particles
    drawParticles(ctx, W, H, mx, my);

    // Rings
    drawRings(ctx);

    // Orbit focal rings
    const foci = [
      { cx: W * 0.25, cy: H * 0.35 },
      { cx: W * 0.75, cy: H * 0.5 },
      { cx: W * 0.5,  cy: H * 0.72 },
    ];
    foci.forEach((f, i) => {
      const pulse = Math.sin(t * 0.015 + i * 1.8) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(f.cx, f.cy, 55 + pulse * 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,102,255,${0.06 + pulse * 0.04})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(f.cx, f.cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,178,${0.5 + pulse * 0.4})`;
      ctx.fill();
    });

    // Corner brackets
    drawCornerBrackets(ctx, W, H);

    // Mouse cursor visual
    drawMouseCursor(ctx, mx, my, W, H);

    rafRef.current = requestAnimationFrame(() => frame(ctx, W, H));
  }, [drawHexGrid, drawScanBeam, drawStreams, drawConnections, drawParticles, drawRings, drawCornerBrackets, drawMouseCursor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      W = canvas.width  = rect.width;
      H = canvas.height = rect.height;
      initScene(W, H);
    };

    resize();
    cancelAnimationFrame(rafRef.current);
    frame(ctx, W, H);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [initScene, frame]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
    if (coordTLRef.current) coordTLRef.current.textContent = `${x.toFixed(0)}, ${y.toFixed(0)}`;
  };

  const onMouseLeave = () => {
    mouseRef.current = { x: -999, y: -999 };
    if (coordTLRef.current) coordTLRef.current.textContent = "0.00, 0.00";
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spawnRing(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <div
      className="relative w-full h-full min-h-[480px] overflow-hidden cursor-crosshair select-none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* HUD overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left: coordinate display */}
        <div className="absolute top-4 left-4 font-mono text-[0.5625rem] text-[#627D98] opacity-60">
          <div className="text-[#0066FF] opacity-80 mb-0.5">CURSOR POS</div>
          <span ref={coordTLRef}>0.00, 0.00</span>
        </div>

        {/* Top-right: system status */}
        <div className="absolute top-4 right-4 font-mono text-[0.5625rem] text-right">
          <div className="flex items-center gap-1.5 justify-end mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4B2] animate-pulse" />
            <span className="text-[#00D4B2] opacity-80">SYSTEM LIVE</span>
          </div>
          <div className="text-[#627D98] opacity-50">VECTOR GRID v2.0</div>
        </div>

        {/* Bottom-left */}
        <div className="absolute bottom-4 left-4 font-mono text-[0.5625rem] text-[#627D98] opacity-40">
          ZETTASHIFT NEURAL MESH
        </div>

        {/* Bottom-right: click hint */}
        <div className="absolute bottom-4 right-4 font-mono text-[0.5625rem] text-[#627D98] opacity-40 text-right">
          CLICK TO PULSE
        </div>

        {/* Center crosshair markers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1 bg-[#0066FF] opacity-20" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-1 bg-[#0066FF] opacity-20" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-1 bg-[#0066FF] opacity-20" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-1 bg-[#0066FF] opacity-20" />
        </div>
      </div>
    </div>
  );
}
