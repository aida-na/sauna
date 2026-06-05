// screen-ritual-setup.jsx — Ritual Planner · Goal Setup (minimal)
import { useState } from 'react';
import { Icon } from './icons.jsx';
import { SourceBadge } from './ui.jsx';

export function ScreenRitualSetup({ app }) {
  const goals = [
    { id: 'Recovery', icon: 'leaf' },
    { id: 'Performance', icon: 'bolt' },
    { id: 'Relaxation', icon: 'wind' },
    { id: 'Detox', icon: 'drop' },
    { id: 'Sleep', icon: 'moon' },
  ];
  const [sel, setSel] = useState(app.goal || 'Recovery');

  return (
    <div className="overlay fade">
      <div className="topbar">
        <button className="icon-btn" onClick={app.closeSetup}><Icon name="close" size={20} /></button>
        <div className="t-label" style={{ color: 'var(--t2)' }}>Build a Ritual</div>
        <div style={{ width: 44 }} />
      </div>

      <div className="overlay-scroll" style={{ paddingTop: 116 }}>
        <div className="fade-up" style={{ marginBottom: 30 }}>
          <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 14 }}>Step 1 of 3</div>
          <div className="t-display">What's your<br />goal?</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 34 }}>
          {goals.map((g, i) => {
            const on = sel === g.id;
            return (
              <button key={g.id} onClick={() => setSel(g.id)} className={'fade-up d' + (i + 1)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
                  padding: '15px 18px', borderRadius: 'var(--r)', cursor: 'pointer',
                  background: 'var(--surface)', fontFamily: 'inherit',
                  boxShadow: on ? '0 0 0 1.5px var(--accent), 0 8px 18px rgba(245,82,30,0.12)' : '0 1px 2px rgba(60,50,35,0.05), 0 8px 18px rgba(60,50,35,0.05)',
                  transition: 'box-shadow .2s var(--ease)',
                }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: on ? 'var(--accent)' : 'var(--surface-3)', color: on ? '#fff' : 'var(--wood)',
                  transition: 'all .2s var(--ease)',
                }}>
                  <Icon name={g.icon} size={22} />
                </div>
                <div className="t-h2" style={{ flex: 1, fontSize: 19, color: 'var(--t1)' }}>{g.id}</div>
                <div style={{
                  width: 22, height: 22, borderRadius: 99, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: on ? 'none' : '1.6px solid var(--hair-2)',
                  background: on ? 'var(--accent)' : 'transparent', color: '#fff',
                }}>
                  {on && <Icon name="check" size={13} sw={3} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="fade-up d5">
          <div className="t-label" style={{ marginBottom: 12 }}>Connected</div>
          <div className="chips">
            <SourceBadge label="Apple Health" />
            <SourceBadge label="Garmin" />
            <SourceBadge label="Whoop" />
          </div>
        </div>
      </div>

      <div className="overlay-foot">
        <button className="btn btn-primary btn-block" onClick={() => { app.set({ goal: sel }); app.buildRitual(); }}>
          Build My Ritual <Icon name="arrow-right" size={18} />
        </button>
      </div>
    </div>
  );
}
