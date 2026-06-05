// screen-active.jsx — Active Session (light, warm, minimal)
import { Icon } from './icons.jsx';

function fmt(s) {
  const m = Math.floor(s / 60), ss = s % 60;
  return `${m}:${String(ss).padStart(2, '0')}`;
}

export function ScreenActive({ app }) {
  const s = app.session;
  const total = s.roundDuration;
  const prog = 1 - s.secondsLeft / total;

  return (
    <div className="overlay" style={{ background: 'radial-gradient(120% 80% at 50% 8%, #fdf3ea 0%, #f6efe5 46%, #f0e8db 100%)' }}>
      {/* soft heat bloom */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 120, left: '50%', transform: 'translateX(-50%)', width: 360, height: 360,
          background: 'radial-gradient(circle, rgba(245,82,30,0.12), transparent 65%)', filter: 'blur(20px)',
          animation: s.paused ? 'none' : 'shimmer 5s ease-in-out infinite' }} />
      </div>

      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', padding: '112px 26px 42px' }}>
        {/* round indicator */}
        <div className="fade-in" style={{ textAlign: 'center' }}>
          <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 14 }}>{app.goal}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {[...Array(s.roundTotal)].map((_, i) => (
              <span key={i} style={{ width: i + 1 === s.round ? 24 : 7, height: 7, borderRadius: 99,
                background: i + 1 <= s.round ? 'var(--accent)' : 'var(--surface-3)', transition: 'all .4s var(--ease)' }} />
            ))}
          </div>
          <div className="t-h3" style={{ marginTop: 14, color: 'var(--t2)', fontWeight: 500 }}>Round {s.round} of {s.roundTotal}</div>
        </div>

        {/* timer ring */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 300, height: 300 }}>
            <div style={{ position: 'absolute', inset: 24, borderRadius: 999,
              background: 'radial-gradient(circle, rgba(245,82,30,0.08), transparent 70%)',
              animation: s.paused ? 'none' : 'breathe 3.2s ease-in-out infinite' }} />
            <svg width="300" height="300" style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}>
              <circle cx="150" cy="150" r="134" fill="none" stroke="var(--surface-3)" strokeWidth="6" />
              <circle cx="150" cy="150" r="134" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 134} strokeDashoffset={2 * Math.PI * 134 * (1 - prog)}
                style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="t-label" style={{ marginBottom: 8 }}>{s.paused ? 'Paused' : 'Remaining'}</div>
              <div className="tnum" style={{ fontSize: 74, fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 0.9 }}>{fmt(s.secondsLeft)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 16, color: 'var(--accent)' }}>
                <Icon name="flame" size={16} /> <span className="tnum" style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)' }}>{app.temp}°F</span>
              </div>
            </div>
          </div>
        </div>

        {/* pause */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <button className="icon-btn" style={{ width: 64, height: 64 }} onClick={() => app.setSession({ paused: !s.paused })}>
            <Icon name={s.paused ? 'play' : 'pause'} size={25} />
          </button>
        </div>

        {/* controls */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => app.setSession({ secondsLeft: s.secondsLeft + 300 })}>
            <Icon name="plus" size={18} /> Extend 5
          </button>
          <button className="btn" style={{ flex: 1, height: 56, background: 'var(--accent-soft)', color: 'var(--accent)' }} onClick={app.endSession}>
            <Icon name="stop" size={18} /> End
          </button>
        </div>
      </div>
    </div>
  );
}
