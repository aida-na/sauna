// screen-settings.jsx — Settings
import { Icon, Wordmark } from './icons.jsx';
import { Toggle } from './ui.jsx';

function SettingRow({ icon, title, detail, control, last, onClick, color }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '15px 18px',
      borderBottom: last ? 'none' : '0.5px solid var(--hair)', cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--surface-3)', color: color || 'var(--wood)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={18} />
      </div>
      <div style={{ flex: 1 }} className="t-h3">{title}</div>
      {detail && <span className="t-sm">{detail}</span>}
      {control}
      {onClick && !control && <Icon name="chevron-right" size={18} style={{ color: 'var(--t3)' }} />}
    </div>
  );
}

export function ScreenSettings({ app }) {
  return (
    <div className="tab-scroll">
      <div className="fade-up" style={{ marginBottom: 22 }}>
        <div className="t-label" style={{ marginBottom: 9 }}>Account</div>
        <div className="t-h1">Settings</div>
      </div>

      {/* profile */}
      <div className="card card-pad fade-up d1" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: 'linear-gradient(150deg, var(--wood-2), var(--accent-dim))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a0f08', fontSize: 22, fontWeight: 700 }}>A</div>
        <div style={{ flex: 1 }}>
          <div className="t-h2" style={{ fontSize: 20 }}>Alex Mercer</div>
          <div className="t-sm">Haven One · since Jan 2026</div>
        </div>
        <Icon name="chevron-right" size={20} style={{ color: 'var(--t3)' }} />
      </div>

      {/* device */}
      <div className="t-label fade-up d2" style={{ margin: '0 4px 10px' }}>Sauna</div>
      <div className="card fade-up d2" style={{ marginBottom: 18, overflow: 'hidden' }}>
        <SettingRow icon="home" title="Living Room" detail="Connected" color="var(--accent)" onClick={() => {}} />
        <SettingRow icon="bolt" title="Battery" detail="92%" />
        <SettingRow icon="shield" title="Safety lock" control={<Toggle on={app.safetyLock} onChange={(v) => app.set({ safetyLock: v })} />} last />
      </div>

      {/* sources */}
      <div className="t-label fade-up d3" style={{ margin: '0 4px 10px' }}>Connected sources</div>
      <div className="card fade-up d3" style={{ marginBottom: 18, overflow: 'hidden' }}>
        <SettingRow icon="heart" title="Apple Health" detail="Syncing" color="var(--accent)" onClick={() => {}} />
        <SettingRow icon="pulse" title="Garmin" detail="Syncing" color="var(--accent)" onClick={() => {}} />
        <SettingRow icon="gauge" title="Whoop" detail="Syncing" color="var(--accent)" onClick={() => {}} last />
      </div>

      {/* prefs */}
      <div className="t-label fade-up d4" style={{ margin: '0 4px 10px' }}>Preferences</div>
      <div className="card fade-up d4" style={{ marginBottom: 18, overflow: 'hidden' }}>
        <SettingRow icon="flame" title="Temperature unit" detail="°F" onClick={() => {}} />
        <SettingRow icon="bell" title="Session reminders" control={<Toggle on={true} onChange={() => {}} />} />
        <SettingRow icon="moon" title="Wind-down nudges" control={<Toggle on={true} onChange={() => {}} />} last />
      </div>

      <div className="fade-up d5" style={{ textAlign: 'center', padding: '8px 0 4px' }}>
        <Wordmark />
        <div className="t-sm" style={{ marginTop: 10 }}>Version 1.0 · Made alongside your sauna</div>
      </div>
    </div>
  );
}
