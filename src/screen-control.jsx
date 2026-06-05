// screen-control.jsx — Sauna Control (draggable temp arc, steam, timer, lock)
import { useRef, useEffect } from 'react';
import { Icon } from './icons.jsx';
import { Toggle } from './ui.jsx';

const TEMP_MIN = 100, TEMP_MAX = 220;
const ARC_START = 135, ARC_SWEEP = 270;

function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function arcPath(cx, cy, r, startDeg, endDeg) {
  const s = polar(cx, cy, r, startDeg);
  const e = polar(cx, cy, r, endDeg);
  const large = (endDeg - startDeg) % 360 > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}
const tempToAngle = (t) => ARC_START + ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * ARC_SWEEP;

function TempDial({ target, current, onChange, locked }) {
  const size = 286, cx = size / 2, cy = size / 2, R = 116;
  const ref = useRef(null);
  const drag = (e) => {
    if (locked || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left - rect.width / 2;
    const py = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top - rect.height / 2;
    let m = (Math.atan2(py, px) * 180) / Math.PI;
    if (m < 0) m += 360;
    let delta = (m - ARC_START + 360) % 360;
    if (delta > ARC_SWEEP) { delta = delta < (ARC_SWEEP + 360) / 2 ? ARC_SWEEP : 0; }
    const t = Math.round(TEMP_MIN + (delta / ARC_SWEEP) * (TEMP_MAX - TEMP_MIN));
    onChange(Math.max(TEMP_MIN, Math.min(TEMP_MAX, t)));
  };
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let active = false;
    const down = (e) => { active = true; drag(e); e.preventDefault(); };
    const move = (e) => { if (active) drag(e); };
    const up = () => { active = false; };
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => { el.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  });

  const tAng = tempToAngle(target);
  const cAng = tempToAngle(Math.min(current, target));
  const knob = polar(cx, cy, R, tAng);
  const curMark = polar(cx, cy, R, cAng);

  return (
    <div ref={ref} style={{ width: size, height: size, position: 'relative', margin: '0 auto', touchAction: 'none', cursor: locked ? 'default' : 'grab' }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="dialGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#c9572f" />
            <stop offset="0.6" stopColor="var(--accent)" />
            <stop offset="1" stopColor="#ffb27a" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>
        {/* tick marks */}
        {[...Array(25)].map((_, i) => {
          const a = ARC_START + (i / 24) * ARC_SWEEP;
          const o = polar(cx, cy, R + 16, a), inn = polar(cx, cy, R + 10, a);
          const on = tempToAngle(target) >= a - 0.1;
          return <line key={i} x1={inn.x} y1={inn.y} x2={o.x} y2={o.y} stroke={on ? 'var(--accent)' : 'var(--hair-2)'} strokeWidth="2" strokeLinecap="round" opacity={on ? 0.9 : 1} />;
        })}
        {/* track */}
        <path d={arcPath(cx, cy, R, ARC_START, ARC_START + ARC_SWEEP)} fill="none" stroke="var(--surface-3)" strokeWidth="14" strokeLinecap="round" />
        {/* filled */}
        <path d={arcPath(cx, cy, R, ARC_START, tAng)} fill="none" stroke="url(#dialGrad)" strokeWidth="14" strokeLinecap="round" filter="url(#glow)" opacity="0.55" />
        <path d={arcPath(cx, cy, R, ARC_START, tAng)} fill="none" stroke="url(#dialGrad)" strokeWidth="14" strokeLinecap="round" />
        {/* current temp marker */}
        <circle cx={curMark.x} cy={curMark.y} r="4" fill="var(--t1)" />
        {/* knob */}
        <circle cx={knob.x} cy={knob.y} r="15" fill="#fff" stroke="var(--accent)" strokeWidth="3" style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.5))' }} />
        <circle cx={knob.x} cy={knob.y} r="4.5" fill="var(--accent)" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <div className="t-label" style={{ marginBottom: 4 }}>Target</div>
        <div className="tnum" style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.9 }}>
          {target}<span style={{ fontSize: 26, color: 'var(--t2)', fontWeight: 600, verticalAlign: 'top' }}>°F</span>
        </div>
        <div className="t-sm" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--t1)' }} />
          Now {current}°F
        </div>
      </div>
    </div>
  );
}

function ControlRow({ icon, title, sub, children }) {
  return (
    <div className="tile" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px' }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wood)', flexShrink: 0 }}>
        <Icon name={icon} size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="t-h3" style={{ fontSize: 16 }}>{title}</div>
        {sub && <div className="t-sm" style={{ marginTop: 1 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

export function ScreenControl({ app }) {
  return (
    <div className="overlay">
      <div className="topbar">
        <button className="icon-btn" onClick={app.closeControl}><Icon name="chevron-down" size={22} /></button>
        <div className="t-label" style={{ color: 'var(--t2)' }}>Sauna · Living Room</div>
        <button className={'icon-btn'} style={app.safetyLock ? { background: 'var(--accent-soft)', color: 'var(--accent)', borderColor: 'var(--accent)' } : {}} onClick={() => app.set({ safetyLock: !app.safetyLock })}>
          <Icon name={app.safetyLock ? 'lock' : 'unlock'} size={19} />
        </button>
      </div>

      <div className="overlay-scroll" style={{ paddingTop: 104 }}>
        <TempDial target={app.target} current={app.temp} locked={app.safetyLock} onChange={(t) => app.set({ target: t })} />

        {/* heating status */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 22px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '9px 16px', borderRadius: 999, background: 'var(--accent-soft)', border: '0.5px solid rgba(255,90,43,0.3)' }}>
            <Icon name="flame" size={17} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>Heating · Ready in <b>12 min</b></span>
          </div>
        </div>

        {app.safetyLock && (
          <div className="t-sm fade-in" style={{ textAlign: 'center', color: 'var(--accent)', marginBottom: 16, marginTop: -8 }}>
            Controls locked. Tap the lock to adjust.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ControlRow icon="steam" title="Steam" sub={app.steam ? 'Humidity 45%' : 'Dry heat'}>
            <Toggle on={app.steam} onChange={(v) => !app.safetyLock && app.set({ steam: v })} />
          </ControlRow>

          {/* timer */}
          <div className="tile" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wood)' }}>
                  <Icon name="timer" size={20} />
                </div>
                <div className="t-h3" style={{ fontSize: 16 }}>Duration</div>
              </div>
              <div className="t-sm">{app.rounds} rounds</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button className="step" onClick={() => !app.safetyLock && app.set({ duration: Math.max(5, app.duration - 5) })}><Icon name="minus" size={22} /></button>
              <div style={{ textAlign: 'center' }}>
                <div className="tnum" style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{app.duration}</div>
                <div className="t-label" style={{ marginTop: 2 }}>minutes</div>
              </div>
              <button className="step" onClick={() => !app.safetyLock && app.set({ duration: Math.min(60, app.duration + 5) })}><Icon name="plus" size={22} /></button>
            </div>
          </div>

          <ControlRow icon="shield" title="Safety lock" sub="Prevents accidental changes">
            <Toggle on={app.safetyLock} onChange={(v) => app.set({ safetyLock: v })} />
          </ControlRow>
        </div>
      </div>

      <div className="overlay-foot">
        <button className="btn btn-primary btn-block" onClick={app.startSession}>
          <Icon name="play" size={18} /> Start Session
        </button>
      </div>
    </div>
  );
}
