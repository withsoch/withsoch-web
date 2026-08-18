"use client";

import { useEffect, useRef } from "react";

export function HeroNetworkDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0,
      H = 0,
      DPR = 1,
      isMobile = false;

    const NODES_DESKTOP = [
      { id: 0, x: 0.1, y: 0.14, side: "in" },
      { id: 1, x: 0.07, y: 0.24, side: "in" },
      { id: 2, x: 0.1, y: 0.34, side: "in" },
      { id: 3, x: 0.07, y: 0.44, side: "in" },
      { id: 4, x: 0.1, y: 0.54, side: "in" },
      { id: 5, x: 0.07, y: 0.64, side: "in" },
      { id: 6, x: 0.44, y: 0.34, side: "core" },
      { id: 7, x: 0.88, y: 0.14, side: "out" },
      { id: 8, x: 0.88, y: 0.3, side: "out" },
      { id: 9, x: 0.88, y: 0.46, side: "out" },
      { id: 10, x: 0.88, y: 0.62, side: "out" },
    ];

    const NODES_MOBILE = [
      { id: 0, x: 0.08, y: 0.02, side: "in" }, // CRM
      { id: 1, x: 0.08, y: 0.18, side: "in" }, // EMAILS
      { id: 2, x: 0.08, y: 0.26, side: "in" }, // SLACK
      { id: 3, x: 0.14, y: 0.32, side: "in" }, // AD DATA
      { id: 4, x: 0.84, y: 0.4, side: "out" }, // TICKETS
      { id: 5, x: 0.88, y: 0.48, side: "out" }, // FORMS
      { id: 6, x: 0.46, y: 0.22, side: "core" },
      { id: 7, x: 0.82, y: 0.04, side: "out" }, // PIPELINE BUILT
      { id: 8, x: 0.88, y: 0.14, side: "out" }, // TEAM NOTIFIED
      { id: 9, x: 0.88, y: 0.24, side: "out" }, // DATA ENRICHED
      { id: 10, x: 0.88, y: 0.32, side: "out" }, // BOARD READY
    ];

    const ICONS_BY_ID = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const LABELS_BY_ID = [
      "CRM",
      "EMAILS",
      "SLACK",
      "AD DATA",
      "TICKETS",
      "FORMS",
      "",
      "PIPELINE BUILT",
      "TEAM NOTIFIED",
      "DATA ENRICHED",
      "BOARD READY",
    ];

    let nodes: any[] = [];
    let channels: any[] = [];
    const S = 80;

    function cb(t: number, cp: number[][]) {
      const u = 1 - t,
        tt = t * t,
        uu = u * u,
        uuu = uu * u,
        ttt = tt * t;
      return {
        x: uuu * cp[0][0] + 3 * uu * t * cp[1][0] + 3 * u * tt * cp[2][0] + ttt * cp[3][0],
        y: uuu * cp[0][1] + 3 * uu * t * cp[1][1] + 3 * u * tt * cp[2][1] + ttt * cp[3][1],
      };
    }

    function poc(ch: any, t: number) {
      const t2 = Math.max(0, Math.min(1, t)),
        idx = t2 * S,
        lo = Math.floor(idx),
        hi = Math.min(S, lo + 1),
        f = idx - lo;
      return {
        x: ch.points[lo].x * (1 - f) + ch.points[hi].x * f,
        y: ch.points[lo].y * (1 - f) + ch.points[hi].y * f,
      };
    }

    function buildLayout() {
      const layout = isMobile ? NODES_MOBILE : NODES_DESKTOP;
      nodes = layout.map((n, i) => ({
        ...n,
        icon: ICONS_BY_ID[i],
        label: LABELS_BY_ID[i],
        activation: 0,
      }));

      function makeChannel(f: number, t: number, c1x: number, c1y: number, c2x: number, c2y: number) {
        const fn = nodes[f],
          tn = nodes[t];
        return {
          fromId: f,
          toId: t,
          cp: [
            [fn.x, fn.y],
            [c1x, c1y],
            [c2x, c2y],
            [tn.x, tn.y],
          ],
          points: [] as { x: number; y: number }[],
          heat: 0,
        };
      }

      if (isMobile) {
        channels = [
          makeChannel(0, 6, 0.18, 0.04, 0.34, 0.13), // CRM
          makeChannel(1, 6, 0.2, 0.18, 0.34, 0.18), // EMAILS
          makeChannel(2, 6, 0.2, 0.25, 0.34, 0.2), // SLACK
          makeChannel(3, 6, 0.24, 0.31, 0.36, 0.24), // AD DATA
          makeChannel(6, 7, 0.58, 0.14, 0.72, 0.05), // PIPELINE BUILT
          makeChannel(6, 8, 0.6, 0.17, 0.74, 0.14), // TEAM NOTIFIED
          makeChannel(6, 9, 0.6, 0.21, 0.74, 0.24), // DATA ENRICHED
          makeChannel(6, 10, 0.6, 0.25, 0.74, 0.32), // BOARD READY
          makeChannel(6, 4, 0.62, 0.3, 0.74, 0.4), // TICKETS
          makeChannel(6, 5, 0.62, 0.32, 0.76, 0.48), // FORMS
        ];
      } else {
        channels = [
          makeChannel(0, 6, 0.22, 0.15, 0.33, 0.22),
          makeChannel(1, 6, 0.2, 0.25, 0.31, 0.27),
          makeChannel(2, 6, 0.22, 0.34, 0.33, 0.34),
          makeChannel(3, 6, 0.2, 0.44, 0.31, 0.4),
          makeChannel(4, 6, 0.22, 0.52, 0.33, 0.42),
          makeChannel(5, 6, 0.2, 0.62, 0.33, 0.46),
          makeChannel(6, 7, 0.56, 0.3, 0.74, 0.16),
          makeChannel(6, 8, 0.58, 0.32, 0.76, 0.3),
          makeChannel(6, 9, 0.58, 0.36, 0.76, 0.46),
          makeChannel(6, 10, 0.56, 0.38, 0.74, 0.6),
        ];
      }

      channels.forEach((ch) => {
        ch.points = [];
        for (let i = 0; i <= S; i++) ch.points.push(cb(i / S, ch.cp));
      });
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      W = rect.width || 1;
      H = rect.height || 1;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      isMobile = W < 640;
      buildLayout();
    }

    function px(x: number) {
      return x * W;
    }
    function py(y: number) {
      return y * H;
    }

    const INK = "28,43,38";
    const BRAND = "255,92,53";
    const LINE = "231,226,215";

    const pulses: any[] = [];
    const completions: any[] = [];
    const emitQueue: any[] = [];
    const coreRipples: any[] = [];
    const dust: any[] = [];
    let lastRun = -2200,
      runInterval = 3800,
      aiFlash = 0,
      lastAmbient = 0;

    for (let i = 0; i < 55; i++)
      dust.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00003,
        vy: (Math.random() - 0.5) * 0.00003,
        size: 0.3 + Math.random() * 0.8,
        baseOpacity: 0.022 + Math.random() * 0.078,
        fp: Math.random() * Math.PI * 2,
        fs: 0.0003 + Math.random() * 0.0007,
      });

    function emitPulse(ci: number, color?: string, intensity?: number) {
      channels[ci].heat = Math.min(1, (channels[ci].heat || 0) + (intensity || 1) * 0.88);
      pulses.push({
        channelIdx: ci,
        t: 0,
        speed: 0.00052 + Math.random() * 0.0001,
        length: 0.13 + Math.random() * 0.06,
        color: color || "cream",
        intensity: intensity == null ? 1 : intensity,
        arrived: false,
      });
    }
    function spawnCompletion(nid: number, color?: string) {
      completions.push({ nodeId: nid, born: performance.now(), life: 1500, color: color || "cream" });
    }
    function startRun(now: number) {
      const color = Math.random() > 0.6 ? "coral" : "cream";
      const count = 2 + Math.floor(Math.random() * 3);
      const inputNodes = isMobile ? [0, 1, 2, 3] : [0, 1, 2, 3, 4, 5];
      inputNodes
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .forEach((ch, i) => {
          emitQueue.push({ fireAt: now + i * 70, chIdx: ch, color, intensity: 1.0, activateNode: channels[ch].fromId });
        });
      const t2 = 1100;
      emitQueue.push({ fireAt: now + t2, aiProcess: true, color });
      const outChannels = isMobile ? [4, 5, 6, 7, 8, 9] : [6, 7, 8, 9];
      const oc = 2 + Math.floor(Math.random() * 2);
      outChannels
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, oc)
        .forEach((ch, i) => {
          emitQueue.push({ fireAt: now + t2 + 60 + i * 90, chIdx: ch, color, intensity: 1.0, activateNode: null });
        });
    }

    function rrp(x: number, y: number, w: number, h: number, r: number) {
      ctx!.moveTo(x + r, y);
      ctx!.lineTo(x + w - r, y);
      ctx!.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx!.lineTo(x + w, y + h - r);
      ctx!.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx!.lineTo(x + r, y + h);
      ctx!.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx!.lineTo(x, y + r);
      ctx!.quadraticCurveTo(x, y, x + r, y);
    }

    function drawIcon(type: number, x: number, y: number, size: number, alpha: number, flash: number) {
      const a = Math.max(0, Math.min(1, alpha));
      const f = Math.max(0, Math.min(1, flash || 0));
      ctx!.strokeStyle = `rgba(${INK[0] === "2" ? INK : INK},${a})`;
      // interpolate ink -> brand based on flash
      const inkParts = INK.split(",").map(Number);
      const brandParts = BRAND.split(",").map(Number);
      const r = Math.round(inkParts[0] + (brandParts[0] - inkParts[0]) * f);
      const g = Math.round(inkParts[1] + (brandParts[1] - inkParts[1]) * f);
      const b = Math.round(inkParts[2] + (brandParts[2] - inkParts[2]) * f);
      ctx!.strokeStyle = `rgba(${r},${g},${b},${a})`;
      ctx!.fillStyle = "rgba(0,0,0,0)";
      ctx!.lineWidth = 1.5;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      if (type === 0) {
        ctx!.beginPath();
        ctx!.arc(x, y - size * 0.58, size * 0.3, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x - size * 0.62, y - size * 0.12);
        ctx!.bezierCurveTo(x - size * 0.62, y - size * 0.48, x + size * 0.62, y - size * 0.48, x + size * 0.62, y - size * 0.12);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x - size * 0.48, y + size * 0.12);
        ctx!.lineTo(x - size * 0.16, y + size * 0.75);
        ctx!.lineTo(x + size * 0.16, y + size * 0.75);
        ctx!.lineTo(x + size * 0.48, y + size * 0.12);
        ctx!.stroke();
      } else if (type === 1) {
        const w = size * 1.6,
          h = size;
        ctx!.beginPath();
        rrp(x - w / 2, y - h / 2, w, h, 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x - w / 2 + 1.5, y - h / 2 + 1.5);
        ctx!.lineTo(x, y + h / 6);
        ctx!.lineTo(x + w / 2 - 1.5, y - h / 2 + 1.5);
        ctx!.stroke();
      } else if (type === 2) {
        const gp = size * 0.38;
        ctx!.beginPath();
        ctx!.moveTo(x - gp * 0.5, y - gp * 1.05);
        ctx!.lineTo(x - gp * 0.5, y + gp * 1.05);
        ctx!.moveTo(x + gp * 0.5, y - gp * 1.05);
        ctx!.lineTo(x + gp * 0.5, y + gp * 1.05);
        ctx!.moveTo(x - gp * 1.05, y - gp * 0.5);
        ctx!.lineTo(x + gp * 1.05, y - gp * 0.5);
        ctx!.moveTo(x - gp * 1.05, y + gp * 0.5);
        ctx!.lineTo(x + gp * 1.05, y + gp * 0.5);
        ctx!.stroke();
      } else if (type === 3) {
        const bw = size * 0.28,
          gap = size * 0.14,
          base = y + size * 0.65;
        [[size * 0.45], [size * 0.78], [size * 1.18]].forEach(([h], i) => {
          ctx!.beginPath();
          ctx!.rect(x - size * 0.56 + i * (bw + gap), base - h, bw, h);
          ctx!.stroke();
        });
      } else if (type === 4) {
        ctx!.beginPath();
        ctx!.arc(x, y - size * 0.08, size * 0.68, Math.PI, 0);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(x - size * 0.68, y + size * 0.16, size * 0.22, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(x + size * 0.68, y + size * 0.16, size * 0.22, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x + size * 0.68, y + size * 0.38);
        ctx!.quadraticCurveTo(x + size * 0.68, y + size * 0.72, x + size * 0.44, y + size * 0.72);
        ctx!.arc(x + size * 0.44, y + size * 0.72, size * 0.13, 0, Math.PI * 2);
        ctx!.stroke();
      } else if (type === 5) {
        const w = size * 1.2,
          h = size * 1.4;
        ctx!.beginPath();
        rrp(x - w / 2, y - h / 2 + size * 0.14, w, h - size * 0.14, 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.rect(x - size * 0.32, y - h / 2, size * 0.64, size * 0.28);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x - w / 2 + 3, y - h * 0.08);
        ctx!.lineTo(x + w / 2 - 3, y - h * 0.08);
        ctx!.moveTo(x - w / 2 + 3, y + h * 0.12);
        ctx!.lineTo(x + w / 2 - 3, y + h * 0.12);
        ctx!.moveTo(x - w / 2 + 3, y + h * 0.32);
        ctx!.lineTo(x + w * 0.05, y + h * 0.32);
        ctx!.stroke();
      } else if (type === 6) {
        const coreR = isMobile ? 24 : 38;
        ctx!.save();
        ctx!.fillStyle = `rgba(${BRAND},${a})`;
        ctx!.beginPath();
        ctx!.arc(x, y, coreR, 0, Math.PI * 2);
        ctx!.fill();
        const fs = size * 1.1;
        ctx!.font = `500 ${fs}px -apple-system,sans-serif`;
        ctx!.fillStyle = `rgba(255,255,255,${a})`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText("AI", x, y);
        const lw = coreR * 0.9,
          ly = y + fs * 0.62;
        ctx!.strokeStyle = `rgba(255,255,255,${a * 0.6})`;
        ctx!.lineWidth = 1.1;
        ctx!.beginPath();
        ctx!.moveTo(x - lw / 2, ly);
        ctx!.lineTo(x + lw / 2, ly);
        ctx!.stroke();
        ctx!.restore();
      } else if (type === 7) {
        const bw = size * 0.28,
          gap = size * 0.14,
          base = y + size * 0.65;
        [[size * 0.46], [size * 0.8], [size * 1.22]].forEach(([h], i) => {
          ctx!.beginPath();
          ctx!.rect(x - size * 0.56 + i * (bw + gap), base - h, bw, h);
          ctx!.stroke();
        });
        ctx!.beginPath();
        ctx!.moveTo(x - size * 0.64, base + 0.5);
        ctx!.lineTo(x + size * 0.64, base + 0.5);
        ctx!.stroke();
      } else if (type === 8) {
        ctx!.beginPath();
        ctx!.arc(x, y - size * 0.8, 1.6, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x - size * 0.62, y + size * 0.3);
        ctx!.bezierCurveTo(x - size * 0.62, y - size * 0.44, x + size * 0.62, y - size * 0.44, x + size * 0.62, y + size * 0.3);
        ctx!.lineTo(x + size * 0.8, y + size * 0.48);
        ctx!.lineTo(x - size * 0.8, y + size * 0.48);
        ctx!.closePath();
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(x, y + size * 0.66, 1.8, 0, Math.PI * 2);
        ctx!.stroke();
      } else if (type === 9) {
        ctx!.beginPath();
        ctx!.ellipse(x, y - size * 0.5, size * 0.62, size * 0.22, 0, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.ellipse(x, y + size * 0.5, size * 0.62, size * 0.22, 0, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x - size * 0.62, y - size * 0.5);
        ctx!.lineTo(x - size * 0.62, y + size * 0.5);
        ctx!.moveTo(x + size * 0.62, y - size * 0.5);
        ctx!.lineTo(x + size * 0.62, y + size * 0.5);
        ctx!.stroke();
      } else if (type === 10) {
        const w = size * 1.15,
          h = size * 1.45,
          fold = size * 0.3;
        ctx!.beginPath();
        ctx!.moveTo(x - w / 2, y - h / 2);
        ctx!.lineTo(x + w / 2 - fold, y - h / 2);
        ctx!.lineTo(x + w / 2, y - h / 2 + fold);
        ctx!.lineTo(x + w / 2, y + h / 2);
        ctx!.lineTo(x - w / 2, y + h / 2);
        ctx!.closePath();
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.moveTo(x + w / 2 - fold, y - h / 2);
        ctx!.lineTo(x + w / 2 - fold, y - h / 2 + fold);
        ctx!.lineTo(x + w / 2, y - h / 2 + fold);
        ctx!.stroke();
        const lx1 = x - w / 2 + 3,
          lx2 = x + w / 2 - 4;
        ctx!.beginPath();
        ctx!.moveTo(lx1, y - h * 0.08);
        ctx!.lineTo(lx2 - fold * 0.55, y - h * 0.08);
        ctx!.moveTo(lx1, y + h * 0.14);
        ctx!.lineTo(lx2, y + h * 0.14);
        ctx!.moveTo(lx1, y + h * 0.34);
        ctx!.lineTo(x + w * 0.12, y + h * 0.34);
        ctx!.stroke();
      }
    }

    let startTime = performance.now(),
      lastFrame = startTime;
    let rafId = 0;

    function draw(now: number) {
      const t = now - startTime,
        dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      ctx!.globalCompositeOperation = "source-over";
      // Transparent clear (not an opaque fillRect) so the dot-grid texture
      // painted behind the canvas via CSS shows through.
      ctx!.clearRect(0, 0, W, H);

      const aiCore = nodes[6];
      const cx = px(aiCore.x),
        cy = py(aiCore.y);

      // dampen contrast in the middle vertical band (where the hero text sits),
      // full width — keeps icons/pulses/AI core untouched, only lines + dust soften
      const bandHalf = 0.24;
      function centerDamp(yFrac: number) {
        const d = Math.abs(yFrac - 0.5) / bandHalf;
        return d < 1 ? 0.55 + 0.45 * d : 1;
      }

      for (const d of dust) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -0.02) d.x = 1.02;
        if (d.x > 1.02) d.x = -0.02;
        if (d.y < -0.02) d.y = 1.02;
        if (d.y > 1.02) d.y = -0.02;
        ctx!.fillStyle = `rgba(${INK},${0.03 * centerDamp(d.y)})`;
        ctx!.beginPath();
        ctx!.arc(d.x * W, d.y * H, d.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const ch of channels) {
        ch.heat = Math.max(0, ch.heat - 0.0015 * (dt / 16));
        const midY = ch.points[Math.floor(S / 2)].y;
        const damp = centerDamp(midY);
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.moveTo(px(ch.points[0].x), py(ch.points[0].y));
        for (let i = 1; i <= S; i++) ctx!.lineTo(px(ch.points[i].x), py(ch.points[i].y));
        ctx!.strokeStyle = `rgba(${LINE},${(0.5 + ch.heat * 0.4) * damp})`;
        ctx!.stroke();
      }

      if (t - lastRun > runInterval) {
        startRun(now);
        lastRun = t;
        runInterval = 3200 + Math.random() * 1600;
      }
      if (now - lastAmbient > 420 + Math.random() * 500) {
        emitPulse(Math.floor(Math.random() * channels.length), "cream", 0.26);
        lastAmbient = now;
      }

      for (let i = emitQueue.length - 1; i >= 0; i--) {
        const q = emitQueue[i];
        if (now < q.fireAt) continue;
        if (q.aiProcess) {
          aiFlash = 1;
          coreRipples.push({ born: now, color: q.color, life: 1600 });
        } else {
          emitPulse(q.chIdx, q.color, q.intensity);
          if (q.activateNode != null) nodes[q.activateNode].activation = 1;
        }
        emitQueue.splice(i, 1);
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed * dt;
        if (!p.arrived && p.t >= 0.96) {
          const dest = nodes[channels[p.channelIdx].toId];
          dest.activation = Math.max(dest.activation, p.intensity);
          if (dest.side === "out" && p.intensity > 0.6) spawnCompletion(channels[p.channelIdx].toId, p.color);
          p.arrived = true;
        }
        if (p.t - p.length > 1.05) pulses.splice(i, 1);
      }
      nodes.forEach((n) => {
        n.activation = Math.max(0, n.activation - (n.side === "out" ? 0.005 : 0.01) * (dt / 16));
      });
      aiFlash = Math.max(0, aiFlash - 0.01 * (dt / 16));

      for (const p of pulses) {
        const ch = channels[p.channelIdx],
          cs = p.color === "coral" ? BRAND : BRAND;
        if (p.t >= 0 && p.t <= 1) {
          const pt = poc(ch, p.t);
          const x = px(pt.x),
            y = py(pt.y);
          let env = 1;
          if (p.t < 0.04) env = p.t / 0.04;
          else if (p.t > 0.96) env = (1 - p.t) / 0.04;
          const alpha = env * p.intensity;
          // tail: a few smaller circles behind the head, descending opacity
          const tailSteps = 4;
          for (let i = tailSteps; i >= 1; i--) {
            const tt = p.t - (p.length * i) / (tailSteps + 1);
            if (tt < 0 || tt > 1) continue;
            const tpt = poc(ch, tt);
            const tx = px(tpt.x),
              ty = py(tpt.y);
            const tAlpha = alpha * (1 - i / (tailSteps + 1)) * 0.6;
            const tRadius = 3.5 * (1 - i / (tailSteps + 1.5));
            ctx!.fillStyle = `rgba(${cs},${tAlpha})`;
            ctx!.beginPath();
            ctx!.arc(tx, ty, Math.max(0.5, tRadius), 0, Math.PI * 2);
            ctx!.fill();
          }
          ctx!.fillStyle = `rgba(${cs},${alpha})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      for (let i = coreRipples.length - 1; i >= 0; i--) {
        const r = coreRipples[i],
          age = Math.max(0, now - r.born);
        if (age > r.life) {
          coreRipples.splice(i, 1);
          continue;
        }
        const lt = Math.min(1, age / r.life),
          rad = Math.max(0.1, 140 * (1 - Math.pow(1 - lt, 3))),
          al = (1 - lt) * 0.5;
        ctx!.beginPath();
        ctx!.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${BRAND},${al})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      nodes.forEach((n) => {
        const nx = px(n.x),
          ny = py(n.y);
        const isCore = n.side === "core",
          isOut = n.side === "out";
        const flash = isCore ? Math.max(n.activation, aiFlash) : n.activation;
        const ia = Math.min(1, (isCore ? 0.85 : isOut ? 0.64 : 0.56) + (isCore ? Math.max(n.activation, aiFlash) * 0.18 : n.activation * 0.3));
        const sz = isCore ? (isMobile ? 13 : 20) : isMobile ? 7 : 10;
        drawIcon(n.icon, nx, ny, sz, ia, flash);
        if (isOut) {
          const bx = nx + sz * 0.72,
            by = ny - sz * 0.72,
            br = isMobile ? 4.5 : 6;
          ctx!.save();
          ctx!.beginPath();
          ctx!.arc(bx, by, br, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${BRAND},1)`;
          ctx!.fill();
          ctx!.beginPath();
          ctx!.moveTo(bx - br * 0.5, by);
          ctx!.lineTo(bx - br * 0.1, by + br * 0.4);
          ctx!.lineTo(bx + br * 0.55, by - br * 0.4);
          ctx!.strokeStyle = "rgba(255,255,255,1)";
          ctx!.lineWidth = isMobile ? 1.1 : 1.3;
          ctx!.lineCap = "round";
          ctx!.lineJoin = "round";
          ctx!.stroke();
          ctx!.restore();
        }
        if (n.label) {
          const ld = isCore ? (isMobile ? 22 : 32) : isOut ? (isMobile ? 14 : 22) : isMobile ? 12 : 20;
          const la = (isCore ? 0.58 : isOut ? 0.4 : 0.32) + n.activation * 0.3;
          ctx!.font = `${isCore ? (isMobile ? 8 : 11) : isMobile ? 6 : 8}px -apple-system,sans-serif`;
          ctx!.fillStyle = `rgba(${INK},${la})`;
          ctx!.textAlign = "center";
          ctx!.textBaseline = "top";
          ctx!.fillText(n.label, nx, ny + ld);
        }
      });

      for (const cmp of completions) {
        const age = now - cmp.born,
          lt = age / cmp.life;
        const nd = nodes[cmp.nodeId],
          nx = px(nd.x),
          ny = py(nd.y);
        let ba;
        if (lt < 0.12) ba = lt / 0.12;
        else if (lt < 0.7) ba = 1;
        else ba = Math.max(0, 1 - (lt - 0.7) / 0.3);
        const pop = lt < 0.12 ? 0.6 + (lt / 0.12) * 0.4 : 1;
        const sz = 5 * pop;
        ctx!.save();
        ctx!.beginPath();
        ctx!.arc(nx + 13, ny - 13, sz + 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${BRAND},${ba * 0.95})`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.moveTo(nx + 13 - sz * 0.55, ny - 13 - sz * 0.05);
        ctx!.lineTo(nx + 13 - sz * 0.1, ny - 13 + sz * 0.45);
        ctx!.lineTo(nx + 13 + sz * 0.6, ny - 13 - sz * 0.4);
        ctx!.strokeStyle = `rgba(255,255,255,${ba * 0.95})`;
        ctx!.lineWidth = 1.7;
        ctx!.lineCap = "round";
        ctx!.stroke();
        ctx!.restore();
      }

      for (let i = completions.length - 1; i >= 0; i--) {
        if (now - completions[i].born > completions[i].life) completions.splice(i, 1);
      }

      rafId = requestAnimationFrame(draw);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resize();
    window.addEventListener("resize", resize);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    }

    if (prefersReducedMotion) {
      draw(performance.now());
    } else {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
