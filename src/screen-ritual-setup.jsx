// screen-ritual-setup.jsx — Ritual Planner · 3-step wizard
import { useState } from 'react';
import { Icon } from './icons.jsx';
import { SourceBadge, Chip } from './ui.jsx';

const GOALS = [
  { id: 'Recovery', icon: 'leaf' },
  { id: 'Performance', icon: 'bolt' },
  { id: 'Relaxation', icon: 'wind' },
  { id: 'Detox', icon: 'drop' },
  { id: 'Sleep', icon: 'moon' },
];

const FREQUENCIES = [3, 4, 5, 6];

function StepBar({ step }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
      {[1, 2, 3].map((n) => (
        <div key={n} style={{
          flex: 1, height: 4, borderRadius: 99,
          background: n <= step ? 'var(--accent)' : 'var(--surface-3)',
          transition: 'background .3s var(--ease)',
        }} />
      ))}
    </div>
  );
}

function Stepper({ value, min, max, step, unit, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button className="step" onClick={() => onChange(Math.max(min, value - step))}>
        <Icon name="minus" size={22} />
      </button>
      <div style={{ textAlign: 'center' }}>
        <div className="tnum" style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
        {unit && <div className="t-label" style={{ marginTop: 2 }}>{unit}</div>}
      </div>
      <button className="step" onClick={() => onChange(Math.min(max, value + step))}>
        <Icon name="plus" size={22} />
      </button>
    </div>
  );
}

export function ScreenRitualSetup({ app }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState(app.goal || 'Recovery');
  const [duration, setDuration] = useState(app.duration);
  const [rounds, setRounds] = useState(app.rounds);
  const [target, setTarget] = useState(app.target);
  const [frequency, setFrequency] = useState(app.frequency || 4);

  const handleBack = () => {
    if (step === 1) app.closeSetup();
    else setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else app.buildRitual({ goal, duration, rounds, target, frequency });
  };

  const nextLabel = step === 3 ? 'Build My Ritual' : 'Continue';

  return (
    <div className="overlay fade">
      <div className="topbar">
        <button className="icon-btn" onClick={handleBack}>
          <Icon name={step === 1 ? 'close' : 'chevron-left'} size={20} />
        </button>
        <div className="t-label" style={{ color: 'var(--t2)' }}>Build a Ritual</div>
        <div style={{ width: 44 }} />
      </div>

      <div className="overlay-scroll" style={{ paddingTop: 116 }}>
        <StepBar step={step} />

        {step === 1 && (
          <>
            <div className="fade-up" style={{ marginBottom: 30 }}>
              <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 14 }}>Step 1 of 3</div>
              <div className="t-display">What's your<br />goal?</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 34 }}>
              {GOALS.map((g, i) => {
                const on = goal === g.id;
                return (
                  <button key={g.id} onClick={() => setGoal(g.id)} className={'fade-up d' + (i + 1)}
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
              <div className="t-sm" style={{ marginTop: 14, lineHeight: 1.5 }}>
                Haven uses your activity, sleep, and recovery data to personalize your ritual.
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="fade-up" style={{ marginBottom: 30 }}>
              <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 14 }}>Step 2 of 3</div>
              <div className="t-display">Set your<br />session</div>
            </div>

            <div className="card card-pad fade-up d1" style={{ marginBottom: 14 }}>
              <div className="t-label" style={{ marginBottom: 16 }}>Duration</div>
              <Stepper value={duration} min={5} max={60} step={5} unit="minutes" onChange={setDuration} />
            </div>

            <div className="card card-pad fade-up d2" style={{ marginBottom: 14 }}>
              <div className="t-label" style={{ marginBottom: 16 }}>Rounds</div>
              <Stepper value={rounds} min={1} max={6} step={1} unit="rounds" onChange={setRounds} />
            </div>

            <div className="card card-pad fade-up d3" style={{ marginBottom: 14 }}>
              <div className="t-label" style={{ marginBottom: 16 }}>Target temperature</div>
              <Stepper value={target} min={150} max={220} step={5} unit="°F" onChange={setTarget} />
            </div>

            <div className="fade-up d4">
              <div className="t-label" style={{ marginBottom: 12 }}>Sessions per week</div>
              <div className="chips">
                {FREQUENCIES.map((n) => (
                  <Chip key={n} label={`${n}×`} sel={frequency === n} onClick={() => setFrequency(n)} />
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="fade-up" style={{ marginBottom: 30 }}>
              <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 14 }}>Step 3 of 3</div>
              <div className="t-display">Review your<br />ritual</div>
            </div>

            <div className="hero card-pad fade-up d1" style={{ marginBottom: 16 }}>
              <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 10 }}>Your plan</div>
              <div className="t-h1" style={{ marginBottom: 6 }}>{goal}</div>
              <div className="t-sm">{frequency} sessions per week · personalized from your biometrics</div>
            </div>

            <div className="card card-pad fade-up d2" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex' }}>
                {[['Duration', duration, 'min'], ['Temp', target, '°F'], ['Rounds', rounds, '']].map(([k, v, u], j) => (
                  <div key={k} style={{ flex: 1, textAlign: 'center', borderLeft: j ? '0.5px solid var(--hair)' : 'none' }}>
                    <div className="t-label" style={{ marginBottom: 7 }}>{k}</div>
                    <div className="t-h2 tnum">{v}<span className="unit">{u}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad fade-up d3" style={{ marginBottom: 16 }}>
              <div className="t-label" style={{ marginBottom: 14 }}>This week's schedule</div>
              <div style={{ display: 'flex', gap: 7 }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
                  const on = [0, 1, 2, 4, 6].includes(i);
                  return (
                    <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                      <div className="t-label" style={{ fontSize: 10, marginBottom: 8 }}>{d}</div>
                      <div style={{
                        aspectRatio: '1', borderRadius: 12,
                        background: on ? 'var(--accent-soft)' : 'var(--surface-3)',
                        border: on ? '1.5px solid var(--accent)' : '1.5px solid transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {on && <Icon name="flame" size={14} style={{ color: 'var(--accent)' }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="tile fade-up d4" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 18 }}>
              <Icon name="sparkle" size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
              <div className="t-sm" style={{ color: 'var(--t1)', lineHeight: 1.5 }}>
                Based on your {goal.toLowerCase()} goal, Haven will adjust heat, duration, and timing each night.
              </div>
            </div>
          </>
        )}
      </div>

      <div className="overlay-foot">
        <button className="btn btn-primary btn-block" onClick={handleNext}>
          {nextLabel} {step < 3 ? null : <Icon name="arrow-right" size={18} />}
        </button>
      </div>
    </div>
  );
}
