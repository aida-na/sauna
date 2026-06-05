// screen-insights.jsx — Insights Dashboard (animated 30-day trends)
import { Icon } from './icons.jsx';
import { SourceBadge, Delta, LineChart, BarChart } from './ui.jsx';

export function ScreenInsights({ app }) {
  // modest upward drift with day-to-day noise
  const hrv = [52,51,53,52,51,53,54,52,53,55,53,52,54,53,52,54,55,53,54,55,54,53,55,54,56,55,54,55,56,55];
  const hrvMarks = [3,7,12,16,20,25,29];
  // slight downward trend, still noisy
  const rhr = [60,61,60,59,60,61,59,60,59,60,58,59,60,58,59,58,59,57,58,59,58,57,58,57,58,57,58,57,58,57];
  // mostly flat with a gentle lift in the last week
  const sleep = [76,74,75,76,75,74,76,75,77,76,75,76,77,76,75,77,76,78,76,77,76,78,77,76,78,77,78,77,78,79];
  const weeks = [2,3,3,4,4,5];
  const wkLabels = ['W1','W2','W3','W4','W5','W6'];

  const W = 316;

  return (
    <div className="tab-scroll">
      <div className="fade-up" style={{ marginBottom: 18 }}>
        <div className="t-label" style={{ marginBottom: 9 }}>Last 30 days</div>
        <div className="t-h1">Insights</div>
      </div>

      <div className="fade-up d1 chips" style={{ marginBottom: 20 }}>
        <SourceBadge label="Apple Health" />
        <SourceBadge label="Garmin" />
        <SourceBadge label="Whoop" />
      </div>

      <div className="hero card-pad fade-up d1" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
          <Icon name="sparkle" size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 8 }}>Top pattern</div>
            <div className="t-h2" style={{ lineHeight: 1.25, fontWeight: 600 }}>
              Your steadier recovery days often follow <span className="accent">evening sessions</span> before 8pm — training load still looks like the bigger driver.
            </div>
          </div>
        </div>
      </div>

      <div className="card card-pad fade-up d2" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 7 }}>HRV · Heart rate variability</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div className="t-h1 tnum">55<span className="unit">ms</span></div>
              <Delta dir="up" value="+6% / 30d" calm />
            </div>
          </div>
          <Icon name="pulse" size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <LineChart data={hrv} width={W} height={118} markers={hrvMarks} gridY={3} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <span style={{ width: 11, height: 11, borderRadius: 99, background: 'var(--bg-1)', border: '2px solid var(--accent)', flexShrink: 0 }} />
          <span className="t-sm">Rings mark sauna days · trend is modest, not linear</span>
        </div>
      </div>

      <div className="card card-pad fade-up d3" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 7 }}>Sleep quality</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div className="t-h1 tnum">79<span className="unit">score</span></div>
              <Delta dir="up" value="+4 pts" calm />
            </div>
          </div>
          <Icon name="moon" size={20} style={{ color: 'var(--calm)' }} />
        </div>
        <LineChart data={sleep} width={W} height={104} color="var(--calm)" gridY={3} />
        <div className="t-sm" style={{ marginTop: 12 }}>
          Session nights average +2 pts vs rest nights — within normal week-to-week variation.
        </div>
      </div>

      <div className="card card-pad fade-up d4" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 7 }}>Resting heart rate</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div className="t-h1 tnum">57<span className="unit">bpm</span></div>
              <Delta dir="down" value="−2 bpm" calm />
            </div>
          </div>
          <Icon name="heart" size={20} style={{ color: 'var(--wood)' }} />
        </div>
        <LineChart data={rhr} width={W} height={104} color="var(--wood)" fill={false} dashed gridY={3} />
      </div>

      <div className="card card-pad fade-up d5" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 7 }}>Session frequency</div>
            <div className="t-h1 tnum">4<span className="unit">this week</span></div>
          </div>
          <Icon name="flame" size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <BarChart data={weeks} labels={wkLabels} width={W} height={116} highlight={4} />
      </div>

      <div className="tile fade-up d6" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 18, marginBottom: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--surface-3)', color: 'var(--wood)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="heart" size={19} />
        </div>
        <div>
          <div className="t-h3" style={{ fontSize: 15.5, marginBottom: 3 }}>Small next-morning HR dip</div>
          <div className="t-sm">After sessions, resting HR is about 2 bpm lower on average — noticeable, but easy to miss on any single day.</div>
        </div>
      </div>

      <div className="tile fade-up d6" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 18 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--surface-3)', color: 'var(--t2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="bed" size={19} />
        </div>
        <div>
          <div className="t-h3" style={{ fontSize: 15.5, marginBottom: 3 }}>Sleep is mixed</div>
          <div className="t-sm">Late or high-heat sessions haven't consistently improved sleep. Timing may matter more than frequency.</div>
        </div>
      </div>
    </div>
  );
}
