// screen-weekly.jsx — Weekly Ritual View (minimal)
import { useState } from 'react';
import { Icon } from './icons.jsx';

export function ScreenWeekly({ app }) {
  const [open, setOpen] = useState('tue');
  const week = [
    { d: 'M', date: 4, on: true }, { d: 'T', date: 5, on: true, today: true },
    { d: 'W', date: 6, on: true }, { d: 'T', date: 7, on: false },
    { d: 'F', date: 8, on: true }, { d: 'S', date: 9, on: false }, { d: 'S', date: 10, on: true },
  ];
  const sessions = [
    { id: 'tue', day: 'Tonight', goal: 'Recovery', dur: 20, temp: 200, rounds: 3,
      why: 'You logged 68 min of high-intensity training this week. This protocol supports faster overnight recovery.' },
    { id: 'wed', day: 'Wednesday', goal: 'Performance', dur: 25, temp: 210, rounds: 2,
      why: 'A hotter heat-adaptation block ahead of your weekend long run.' },
    { id: 'fri', day: 'Friday', goal: 'Relaxation', dur: 15, temp: 190, rounds: 2,
      why: 'Stress has climbed midweek — a gentle session to down-regulate.' },
    { id: 'sun', day: 'Sunday', goal: 'Sleep', dur: 18, temp: 185, rounds: 2,
      why: 'An evening wind-down to deepen Sunday-night sleep.' },
  ];

  return (
    <div className="tab-scroll">
      <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="t-label" style={{ marginBottom: 10 }}>This week</div>
          <div className="t-h1">Your Ritual</div>
        </div>
        <button className="icon-btn" onClick={app.openSetup}><Icon name="sparkle" size={19} style={{ color: 'var(--accent)' }} /></button>
      </div>

      {/* calendar strip */}
      <div className="fade-up d1" style={{ display: 'flex', gap: 7, marginBottom: 26 }}>
        {week.map((w, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div className="t-label" style={{ fontSize: 10, marginBottom: 8, color: w.today ? 'var(--accent)' : 'var(--t3)' }}>{w.d}</div>
            <div style={{
              aspectRatio: '1', borderRadius: 14, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: w.today ? 'var(--accent)' : 'var(--surface)',
              boxShadow: w.today ? '0 6px 14px rgba(245,82,30,0.22)' : '0 1px 2px rgba(60,50,35,0.05)',
              color: w.today ? '#fff' : 'var(--t1)',
            }}>
              <span className="tnum" style={{ fontSize: 15, fontWeight: 700 }}>{w.date}</span>
              {w.on && !w.today && <span style={{ position: 'absolute', bottom: 7, width: 4, height: 4, borderRadius: 99, background: 'var(--accent)' }} />}
            </div>
          </div>
        ))}
      </div>

      {/* session cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {sessions.map((s, i) => {
          const isOpen = open === s.id;
          return (
            <div key={s.id} className={'card fade-up d' + (i + 2)} style={{ overflow: 'hidden' }}>
              <div style={{ padding: '20px', cursor: 'pointer' }} onClick={() => setOpen(isOpen ? '' : s.id)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div className="t-h2" style={{ fontSize: 20 }}>{s.day}</div>
                  <span className="chip sel" style={{ padding: '6px 13px', fontSize: 12.5 }}>{s.goal}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  {[['Duration', s.dur, 'min'], ['Temp', s.temp, '°F'], ['Rounds', s.rounds, '']].map(([k, v, u]) => (
                    <div key={k} style={{ flex: 1 }}>
                      <div className="t-label" style={{ marginBottom: 5 }}>{k}</div>
                      <div className="t-h2 tnum" style={{ fontSize: 21 }}>{v}<span className="unit">{u}</span></div>
                    </div>
                  ))}
                  <Icon name="chevron-down" size={20} style={{ color: 'var(--t3)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .3s var(--ease)' }} />
                </div>
              </div>
              <div style={{ maxHeight: isOpen ? 220 : 0, overflow: 'hidden', transition: 'max-height .4s var(--ease)' }}>
                <div style={{ padding: '0 20px 20px' }}>
                  <div style={{ display: 'flex', gap: 10, paddingTop: 4, borderTop: '0.5px solid var(--hair)' }}>
                    <Icon name="sparkle" size={15} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 14 }} />
                    <div className="t-sm" style={{ color: 'var(--t1)', lineHeight: 1.5, marginTop: 10 }}>{s.why}</div>
                  </div>
                  {s.id === 'tue' && (
                    <button className="btn btn-primary btn-block btn-sm" style={{ marginTop: 14 }} onClick={app.openControl}>
                      <Icon name="play" size={16} /> Start tonight's session
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* streak */}
      <div className="card card-pad fade-up d6" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="flame" size={23} sw={2} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="t-h2"><span className="tnum">12</span> day streak</div>
          <div className="t-sm">Best: 21 days</div>
        </div>
      </div>
    </div>
  );
}
