import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hot: boolean;
  phase: number;
}

const LINK = 150;
const MOUSE_R = 200;

/**
 * Drifting neural-network field: nodes connect when close, "hot" nodes pulse
 * crimson, and the pointer pulls nearby nodes and lights up their links.
 * Pauses offscreen / in background tabs; draws a single static frame under
 * reduced motion.
 */
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.max(28, Math.round((w * h) / 13000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        hot: Math.random() < 0.14,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_R && d > 0.1) {
            const f = (1 - d / MOUSE_R) * 0.025;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
          n.vx += (Math.random() - 0.5) * 0.012;
          n.vy += (Math.random() - 0.5) * 0.012;
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const d = Math.sqrt(d2);
          let alpha = (1 - d / LINK) * 0.22;
          const mx = (a.x + b.x) / 2 - mouse.x;
          const my = (a.y + b.y) / 2 - mouse.y;
          const md = Math.hypot(mx, my);
          const near = md < MOUSE_R;
          if (near) alpha += (1 - md / MOUSE_R) * 0.45;
          ctx.strokeStyle =
            near || (a.hot && b.hot)
              ? `rgba(238, 90, 80, ${alpha})`
              : `rgba(200, 214, 205, ${alpha * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        if (n.hot) {
          const pulse = reduce ? 0.6 : (Math.sin(time / 600 + n.phase) + 1) / 2;
          ctx.fillStyle = `rgba(163, 28, 27, ${0.15 + pulse * 0.25})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3 + pulse * 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ee5a50';
        } else {
          ctx.fillStyle = 'rgba(243, 239, 233, 0.55)';
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!frame && !reduce) frame = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) draw(0);
    else start();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };
    const onVisibility = () => !document.hidden && start();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas className="neural" ref={ref} aria-hidden="true" />;
}
