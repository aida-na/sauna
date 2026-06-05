// app.jsx — Haven app shell: state, live timers, routing, overlays
import { useState, useEffect, useRef } from 'react';
import { IOSDevice } from './ios-frame.jsx';
import { BottomNav } from './ui.jsx';
import { ScreenHome } from './screen-home.jsx';
import { ScreenWeekly } from './screen-weekly.jsx';
import { ScreenInsights } from './screen-insights.jsx';
import { ScreenSettings } from './screen-settings.jsx';
import { ScreenControl } from './screen-control.jsx';
import { ScreenRitualSetup } from './screen-ritual-setup.jsx';
import { ScreenActive } from './screen-active.jsx';
import { ScreenPost } from './screen-postsession.jsx';

function HavenApp() {
  const [st, setSt] = useState({
    tab: 'home',
    overlay: null, // 'control' | 'active' | 'post' | 'setup'
    temp: 187,
    target: 200,
    steam: true,
    safetyLock: false,
    duration: 20,
    rounds: 3,
    goal: 'Recovery',
    frequency: 4,
    tempUnit: 'F',
    reminders: true,
    windDown: true,
    session: { active: false, paused: false, round: 1, roundTotal: 3, secondsLeft: 1200, roundDuration: 1200 },
  });
  const stRef = useRef(st);
  stRef.current = st;

  const set = (p) => setSt(s => ({ ...s, ...p }));
  const setSession = (p) => setSt(s => ({ ...s, session: { ...s.session, ...p } }));

  // heating simulation — temp drifts toward target
  useEffect(() => {
    const id = setInterval(() => {
      setSt(s => {
        if (s.temp === s.target) return s;
        const dir = s.temp < s.target ? 1 : -1;
        return { ...s, temp: s.temp + dir };
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // session countdown
  useEffect(() => {
    const id = setInterval(() => {
      const s = stRef.current;
      if (s.overlay !== 'active' || !s.session.active || s.session.paused) return;
      setSt(cur => {
        const se = cur.session;
        if (se.secondsLeft > 1) return { ...cur, session: { ...se, secondsLeft: se.secondsLeft - 1 } };
        // round finished
        if (se.round < se.roundTotal) {
          return { ...cur, session: { ...se, round: se.round + 1, secondsLeft: se.roundDuration } };
        }
        // all rounds done -> post
        return { ...cur, overlay: 'post', session: { ...se, active: false } };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const app = {
    ...st, set, setSession,
    go: (tab) => set({ tab, overlay: null }),
    openControl: () => set({ overlay: 'control' }),
    closeControl: () => set({ overlay: null }),
    openSetup: () => set({ overlay: 'setup' }),
    closeSetup: () => set({ overlay: null }),
    applyProtocol: ({ goal, duration, rounds, target }) => set({
      ...(goal != null && { goal }),
      ...(duration != null && { duration }),
      ...(rounds != null && { rounds }),
      ...(target != null && { target }),
    }),
    buildRitual: (plan) => set({
      overlay: null,
      tab: 'ritual',
      ...(plan?.goal != null && { goal: plan.goal }),
      ...(plan?.duration != null && { duration: plan.duration }),
      ...(plan?.rounds != null && { rounds: plan.rounds }),
      ...(plan?.target != null && { target: plan.target }),
      ...(plan?.frequency != null && { frequency: plan.frequency }),
    }),
    startSession: () => set({
      overlay: 'active',
      session: { active: true, paused: false, round: 1, roundTotal: st.rounds, secondsLeft: st.duration * 60, roundDuration: st.duration * 60 },
    }),
    endSession: () => set({ overlay: 'post', session: { ...st.session, active: false } }),
    closePost: () => set({ overlay: null, tab: 'home' }),
  };

  const screens = {
    home: ScreenHome, ritual: ScreenWeekly, insights: ScreenInsights, settings: ScreenSettings,
  };
  const Screen = screens[st.tab];

  return (
    <div className="haven">
      <div className="app-root">
        <div key={st.tab} style={{ position: 'absolute', inset: 0 }}>
          <Screen app={app} />
        </div>
        <BottomNav tab={st.tab} onTab={app.go} />
      </div>

      {st.overlay === 'control' && <ScreenControl app={app} />}
      {st.overlay === 'setup' && <ScreenRitualSetup app={app} />}
      {st.overlay === 'active' && <ScreenActive app={app} />}
      {st.overlay === 'post' && <ScreenPost app={app} />}
    </div>
  );
}

export function Root() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#e0dacd' }}>
      <IOSDevice>
        <HavenApp />
      </IOSDevice>
    </div>
  );
}
