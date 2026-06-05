// screen-postsession.jsx — Post-Session Biometric Impact
import { Icon, Sunset } from './icons.jsx';
import { Delta } from './ui.jsx';

export function ScreenPost({ app }) {
  const bio = [
    { label: 'HRV', before: 52, after: 54, unit: 'ms', delta: '+4%', dir: 'up' },
    { label: 'Resting HR', before: 59, after: 58, unit: 'bpm', delta: '−1', dir: 'down' },
    { label: 'Stress', before: 58, after: 52, unit: '', delta: '−6', dir: 'down' },
  ];
  return (
    <div className="overlay">
      <div className="overlay-scroll" style={{ paddingTop: 88 }}>
        {/* header */}
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ width: 64, height: 64, borderRadius: 999, margin: '0 auto 18px',
            background: 'var(--accent-soft)', border: '0.5px solid rgba(255,90,43,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sunset size={30} color="var(--accent)" />
          </div>
          <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 10 }}>{app.goal} Session · Complete</div>
          <div className="t-display">Well done,<br />Alex</div>
        </div>

        {/* summary */}
        <div className="card card-pad fade-up d1" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex' }}>
            {[['Duration', String(app.duration), 'min'], ['Max Temp', String(app.target), '°F'], ['Rounds', String(app.rounds), `/${app.rounds}`]].map(([k, v, u], j) => (
              <div key={k} style={{ flex: 1, textAlign: 'center', borderLeft: j ? '0.5px solid var(--hair)' : 'none' }}>
                <div className="t-label" style={{ marginBottom: 7 }}>{k}</div>
                <div className="t-h1 tnum">{v}<span className="unit">{u}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* insight */}
        <div className="hero card-pad fade-up d2" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <Icon name="sparkle" size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 8 }}>Biometric impact</div>
              <div className="t-h2" style={{ lineHeight: 1.25, fontWeight: 600 }}>
                HRV ticked up <span className="accent">4%</span> overnight — a modest signal, in line with your recent average.
              </div>
            </div>
          </div>
        </div>

        {/* comparison tiles */}
        <div className="t-label fade-up d3" style={{ marginBottom: 12 }}>Before vs. after</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
          {bio.map((b, i) => (
            <div key={b.label} className={'tile fade-up d' + (i + 3)} style={{ display: 'flex', alignItems: 'center', padding: '16px 18px' }}>
              <div style={{ flex: 1 }}>
                <div className="t-h3" style={{ fontSize: 16 }}>{b.label}</div>
                <Delta dir={b.dir} value={b.delta} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ textAlign: 'right' }}>
                  <div className="t-label" style={{ fontSize: 9.5, marginBottom: 2 }}>Before</div>
                  <div className="tnum dim" style={{ fontSize: 22, fontWeight: 600 }}>{b.before}</div>
                </div>
                <Icon name="arrow-right" size={18} style={{ color: 'var(--t3)' }} />
                <div style={{ textAlign: 'right', minWidth: 52 }}>
                  <div className="t-label" style={{ fontSize: 9.5, marginBottom: 2, color: 'var(--accent)' }}>After</div>
                  <div className="tnum" style={{ fontSize: 26, fontWeight: 700 }}>{b.after}<span className="unit" style={{ fontSize: 11 }}>{b.unit}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overlay-foot">
        <button className="btn btn-primary btn-block" style={{ marginBottom: 10 }} onClick={() => { app.closePost(); app.go('insights'); }}>
          View 30-day trends <Icon name="arrow-right" size={18} />
        </button>
        <button className="btn btn-ghost btn-block" onClick={app.closePost}>Done</button>
      </div>
    </div>
  );
}
