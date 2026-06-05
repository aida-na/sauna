// screen-home.jsx — Home / Session Status (minimal)
import { Icon, Sunset } from './icons.jsx';

export function ScreenHome({ app }) {
  const heatProgress = Math.min(1, (app.temp - 70) / (app.target - 70));
  return (
    <div className="tab-scroll">
      {/* header */}
      <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 34 }}>
        <div>
          <div className="t-label" style={{ marginBottom: 10 }}>Tuesday, June 5</div>
          <div className="t-h1">Good evening</div>
        </div>
        <Sunset size={24} color="var(--accent)" />
      </div>

      {/* tonight's ritual */}
      <div className="hero fade-up d1" style={{ padding: '26px 24px 24px', marginBottom: 16, cursor: 'pointer' }} onClick={() => app.go('weekly')}>
        <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 16 }}>Tonight</div>
        <div className="t-display" style={{ marginBottom: 20 }}>Recovery</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="tnum" style={{ fontSize: 15, fontWeight: 600, color: 'var(--t2)' }}>
            20 min &nbsp;·&nbsp; 3 rounds
          </div>
          <Icon name="arrow-right" size={20} style={{ color: 'var(--accent)' }} />
        </div>
      </div>

      {/* live status */}
      <div className="card card-pad fade-up d2" style={{ marginBottom: 24, cursor: 'pointer' }} onClick={app.openControl}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div className="t-label">Sauna</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--accent)' }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: 'var(--accent)', animation: 'breathe 1.8s ease-in-out infinite' }} />
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>Heating</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
          <div className="tnum" style={{ fontSize: 60, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.85 }}>
            {app.temp}<span style={{ fontSize: 24, color: 'var(--t2)', fontWeight: 600 }}>°F</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', paddingBottom: 4, whiteSpace: 'nowrap' }}>
            <div className="t-label">Target {app.target}°</div>
            <div className="t-sm" style={{ color: 'var(--t1)' }}>Ready in <b>12 min</b></div>
          </div>
        </div>
        {/* thin progress */}
        <div style={{ height: 5, borderRadius: 99, background: 'var(--surface-3)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: (heatProgress * 100) + '%', borderRadius: 99, background: 'var(--accent)', transition: 'width 1s var(--ease-out)' }} />
        </div>
      </div>

      <button className="btn btn-primary btn-block fade-up d3" onClick={app.openControl}>
        <Icon name="play" size={17} /> Start Session
      </button>
    </div>
  );
}
