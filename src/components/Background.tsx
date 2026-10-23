import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/*
 * The animated backdrop behind the whole site:
 * drifting aurora blobs, a faint grid, and a field of particles that
 * link up into a constellation and lean away from the pointer.
 */
export function Background() {
  return (
    <div className="bg" aria-hidden>
      <div className="bg__grid" />
      <div className="bg__blob bg__blob--1" />
      <div className="bg__blob bg__blob--2" />
      <div className="bg__blob bg__blob--3" />
      <ParticleField />
      <div className="bg__noise" />
    </div>
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    const pointer = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function colour() {
      return document.documentElement.dataset.theme === "light" ? "44, 80, 160" : "160, 190, 255";
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
      }));
    }

    function draw() {
      const rgb = colour();
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          // drift gently away from the pointer
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const f = (1 - Math.sqrt(d2) / 120) * 0.8;
            p.x += (dx / Math.sqrt(d2 + 0.01)) * f;
            p.y += (dy / Math.sqrt(d2 + 0.01)) * f;
          }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${rgb}, 0.7)`;
        ctx!.fill();
      }
      // link nearby particles into a constellation
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx!.strokeStyle = `rgba(${rgb}, ${0.16 * (1 - d / 130)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    }

    function onPointer(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }

    function onVisibility() {
      cancelAnimationFrame(frame);
      if (!document.hidden) draw();
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className="bg__particles" />;
}

/* A soft glow that follows the mouse (desktop only). */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    function onMove(e: PointerEvent) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el!.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
        el!.style.opacity = "1";
      });
    }
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden />;
}
