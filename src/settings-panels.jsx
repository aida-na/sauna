// settings-panels.jsx — detail overlays for settings rows
import { Icon } from './icons.jsx';
import { Toggle } from './ui.jsx';

function PanelShell({ title, onClose, children }) {
  return (
    <div className="overlay fade">
      <div className="topbar">
        <button className="icon-btn" onClick={onClose}><Icon name="chevron-left" size={20} /></button>
        <div className="t-label" style={{ color: 'var(--t2)' }}>{title}</div>
        <div style={{ width: 44 }} />
      </div>
      <div className="overlay-scroll" style={{ paddingTop: 116 }}>{children}</div>
    </div>
  );
}

export function ProfilePanel({ onClose }) {
  return (
    <PanelShell title="Profile" onClose={onClose}>
      <div className="fade-up" style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          width: 88, height: 88, borderRadius: 999, margin: '0 auto 16px',
          background: 'linear-gradient(150deg, var(--wood-2), var(--accent-dim))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#1a0f08', fontSize: 34, fontWeight: 700,
        }}>A</div>
        <div className="t-h1" style={{ marginBottom: 6 }}>Alex Mercer</div>
        <div className="t-sm">aidana@example.com</div>
      </div>

      <div className="card fade-up d1" style={{ marginBottom: 14, overflow: 'hidden' }}>
        {[['Member since', 'Jan 2026'], ['Plan', 'Haven One'], ['Sessions', '47 total']].map(([k, v], i, arr) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '15px 18px', borderBottom: i < arr.length - 1 ? '0.5px solid var(--hair)' : 'none',
          }}>
            <span className="t-h3">{k}</span>
            <span className="t-sm">{v}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost btn-block fade-up d2">Edit profile</button>
    </PanelShell>
  );
}

export function DevicePanel({ app, onClose }) {
  return (
    <PanelShell title="Sauna" onClose={onClose}>
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <div className="t-h1" style={{ marginBottom: 6 }}>Living Room</div>
        <div className="t-sm">Haven One · Serial HVN-2847</div>
      </div>

      <div className="card fade-up d1" style={{ marginBottom: 14, overflow: 'hidden' }}>
        {[['Status', 'Connected', true], ['Firmware', 'v2.4.1', false], ['Wi-Fi', 'HomeNetwork_5G', false], ['Last sync', 'Just now', false]].map(([k, v, accent], i, arr) => (
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '15px 18px', borderBottom: i < arr.length - 1 ? '0.5px solid var(--hair)' : 'none',
          }}>
            <span className="t-h3">{k}</span>
            <span className="t-sm" style={accent ? { color: 'var(--accent)', fontWeight: 600 } : {}}>{v}</span>
          </div>
        ))}
      </div>

      <div className="card card-pad fade-up d2" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="t-h3" style={{ marginBottom: 4 }}>Battery</div>
            <div className="t-sm">Control panel power</div>
          </div>
          <div className="t-h2 tnum" style={{ color: 'var(--accent)' }}>92%</div>
        </div>
        <div style={{ height: 5, borderRadius: 99, background: 'var(--surface-3)', overflow: 'hidden', marginTop: 14 }}>
          <div style={{ height: '100%', width: '92%', borderRadius: 99, background: 'var(--accent)' }} />
        </div>
      </div>

      <div className="card fade-up d3" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px' }}>
          <div style={{ flex: 1 }}>
            <div className="t-h3">Safety lock</div>
            <div className="t-sm">Prevent accidental changes</div>
          </div>
          <Toggle on={app.safetyLock} onChange={(v) => app.set({ safetyLock: v })} />
        </div>
      </div>
    </PanelShell>
  );
}

const SOURCES = {
  apple: { title: 'Apple Health', icon: 'heart', metrics: ['HRV', 'Resting HR', 'Sleep', 'Activity'] },
  garmin: { title: 'Garmin', icon: 'pulse', metrics: ['Training load', 'Body battery', 'Stress', 'Sleep'] },
  whoop: { title: 'Whoop', icon: 'gauge', metrics: ['Recovery', 'Strain', 'Sleep performance', 'HRV'] },
};

export function SourcePanel({ id, onClose }) {
  const src = SOURCES[id];
  return (
    <PanelShell title={src.title} onClose={onClose}>
      <div className="fade-up" style={{ marginBottom: 24 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, marginBottom: 16,
          background: 'var(--accent-soft)', color: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={src.icon} size={26} />
        </div>
        <div className="t-h1" style={{ marginBottom: 6 }}>Connected</div>
        <div className="t-sm">Last synced 4 minutes ago</div>
      </div>

      <div className="t-label fade-up d1" style={{ margin: '0 4px 10px' }}>Shared metrics</div>
      <div className="card fade-up d1" style={{ marginBottom: 14, overflow: 'hidden' }}>
        {src.metrics.map((m, i, arr) => (
          <div key={m} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
            borderBottom: i < arr.length - 1 ? '0.5px solid var(--hair)' : 'none',
          }}>
            <Icon name="check" size={14} sw={2.5} style={{ color: 'var(--accent)' }} />
            <span className="t-h3">{m}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost btn-block fade-up d2">Manage permissions</button>
      <button className="btn btn-ghost btn-block fade-up d3" style={{ marginTop: 10, color: 'var(--accent)' }}>
        Disconnect
      </button>
    </PanelShell>
  );
}

export function TempUnitPanel({ app, onClose }) {
  const units = ['F', 'C'];
  return (
    <PanelShell title="Temperature" onClose={onClose}>
      <div className="fade-up" style={{ marginBottom: 30 }}>
        <div className="t-display">Choose your<br />unit</div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {units.map((u) => {
          const on = app.tempUnit === u;
          return (
            <button key={u} onClick={() => app.set({ tempUnit: u })} style={{
              flex: 1, padding: '28px 20px', borderRadius: 'var(--r)', cursor: 'pointer',
              background: 'var(--surface)', fontFamily: 'inherit', textAlign: 'center',
              boxShadow: on ? '0 0 0 1.5px var(--accent), 0 8px 18px rgba(245,82,30,0.12)' : '0 1px 2px rgba(60,50,35,0.05)',
            }}>
              <div className="tnum" style={{ fontSize: 36, fontWeight: 700, marginBottom: 4 }}>°{u}</div>
              <div className="t-sm">{u === 'F' ? 'Fahrenheit' : 'Celsius'}</div>
            </button>
          );
        })}
      </div>

      <button className="btn btn-primary btn-block" onClick={onClose}>Save</button>
    </PanelShell>
  );
}
