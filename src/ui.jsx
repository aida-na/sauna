// ui.jsx — shared Haven primitives + minimal animated charts
import { useState, useEffect, useRef } from 'react';
import { Icon } from './icons.jsx';

/* ---------- Toggle ---------- */
export function Toggle({ on, onChange }) {
  return (
    <div className={'toggle' + (on ? ' on' : '')} onClick={() => onChange(!on)} role="switch" aria-checked={on}>
      <div className="knob" />
    </div>
  );
}

/* ---------- Chip ---------- */
export function Chip({ icon, label, sel, onClick }) {
  return (
    <button className={'chip' + (sel ? ' sel' : '')} onClick={onClick}>
      {icon && <Icon name={icon} size={17} sw={1.8} />}
      {label}
    </button>
  );
}

/* ---------- Source badge (Apple Health / Garmin / Whoop) ---------- */
export function SourceBadge({ label, on = true }) {
  return (
    <div className={'source' + (on ? ' on' : '')}>
      <span className="dot">{on && <Icon name="check" size={11} sw={2.6} />}</span>
      {label}
    </div>
  );
}

/* ---------- Delta pill ---------- */
export function Delta({ dir = 'up', value, calm = false }) {
  return (
    <span className={'delta ' + (calm ? 'calm' : 'up')}>
      <Icon name={dir === 'up' ? 'arrow-up' : 'arrow-down'} size={13} sw={2.4} />
      {value}
    </span>
  );
}

/* ---------- Bottom nav ---------- */
export function BottomNav({ tab, onTab }) {
  const items = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'ritual', icon: 'ritual', label: 'Ritual' },
    { id: 'insights', icon: 'insights', label: 'Insights' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];
  return (
    <div className="nav">
      <div className="nav-inner">
        {items.map(it => (
          <div key={it.id} className={'nav-item' + (tab === it.id ? ' active' : '')} onClick={() => onTab(it.id)}>
            <Icon name={it.icon} size={23} sw={tab === it.id ? 2 : 1.7} />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- big formatted number ---------- */
export function Stat({ value, unit, color }) {
  return (
    <span className="tnum" style={{ color: color || 'var(--t1)' }}>
      {value}{unit && <span className="unit">{unit}</span>}
    </span>
  );
}

/* =========================================================
   Charts — minimal, lots of negative space, ember accent
   ========================================================= */

// build a smooth path through points
export function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const t = 0.18;
    const c1x = p1.x + (p2.x - p0.x) * t;
    const c1y = p1.y + (p2.y - p0.y) * t;
    const c2x = p2.x - (p3.x - p1.x) * t;
    const c2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function LineChart({
  data, width = 320, height = 120, color = 'var(--accent)',
  fill = true, dashed = false, markers = [], pad = 8, strokeW = 2.4,
  min, max, animate = true, gridY = 0,
}) {
  const lo = (min !== undefined ? min : Math.min(...data)) - 0.0001;
  const hi = (max !== undefined ? max : Math.max(...data)) + 0.0001;
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: pad + (1 - (v - lo) / (hi - lo)) * (height - pad * 2),
  }));
  const dLine = smoothPath(pts);
  const dArea = `${dLine} L ${pts[pts.length - 1].x} ${height - pad} L ${pts[0].x} ${height - pad} Z`;
  const gid = 'g' + Math.round((width + height + data[0]) * 97).toString(36);
  // estimate path length for the draw-on animation (so base state stays visible)
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  L = Math.round(L * 1.12);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.22" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[...Array(gridY)].map((_, i) => {
        const y = pad + (i / (gridY - 1)) * (height - pad * 2);
        return <line key={i} x1={pad} y1={y} x2={width - pad} y2={y} stroke="var(--hair)" strokeWidth="1" />;
      })}
      {fill && <path d={dArea} fill={`url(#${gid})`} />}
      <path d={dLine} fill="none" stroke={color} strokeWidth={strokeW}
        className={animate && !dashed ? 'draw-line' : undefined}
        style={animate && !dashed ? { strokeDasharray: L, '--len': L + 'px' } : undefined}
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? '2 6' : undefined} />
      {markers.map((m, i) => (
        <g key={i}>
          <circle cx={pts[m].x} cy={pts[m].y} r="5.5" fill="var(--bg-1)" stroke={color} strokeWidth="2.4" />
        </g>
      ))}
    </svg>
  );
}

export function BarChart({ data, labels = [], width = 320, height = 120, color = 'var(--accent)', highlight = -1, pad = 8 }) {
  const hi = Math.max(...data) * 1.15;
  const n = data.length;
  const gap = 8;
  const bw = (width - pad * 2 - gap * (n - 1)) / n;
  const baseY = height - pad - (labels.length ? 16 : 0);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {data.map((v, i) => {
        const h = (v / hi) * (baseY - pad);
        const x = pad + i * (bw + gap);
        const isHi = i === highlight;
        return (
          <g key={i}>
            <rect x={x} y={baseY - h} width={bw} height={h} rx={Math.min(bw / 2, 6)}
              fill={isHi ? color : 'var(--surface-3)'}
              className="grow-bar" style={{ animationDelay: `${i * 0.06}s` }} />
            {labels[i] && (
              <text x={x + bw / 2} y={height - 3} textAnchor="middle"
                fontSize="10" fontWeight="600" fill="var(--t3)" fontFamily="'Hanken Grotesk',sans-serif">{labels[i]}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* small inline sparkline (bars) like the website's Sauna card */
export function SparkBars({ data, width = 110, height = 44, color = 'var(--accent)', peak = -1 }) {
  const hi = Math.max(...data);
  const n = data.length;
  const gap = 2.5;
  const bw = (width - gap * (n - 1)) / n;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {data.map((v, i) => {
        const h = Math.max(3, (v / hi) * height);
        return <rect key={i} x={i * (bw + gap)} y={height - h} width={bw} height={h} rx={bw / 2}
          fill={i === peak ? color : 'var(--surface-3)'} />;
      })}
    </svg>
  );
}

/* ---------- circular progress ring ---------- */
export function Ring({ size = 64, value = 0.5, sw = 5, color = 'var(--accent)', track = 'var(--surface-3)', children }) {
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value)}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
}
