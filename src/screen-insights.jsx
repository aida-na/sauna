// screen-insights.jsx — Insights Dashboard (animated 30-day trends)
import { Icon } from './icons.jsx';
import { SourceBadge, Delta, LineChart, BarChart } from './ui.jsx';

export function ScreenInsights({ app }) {
  const hrv = [44,46,45,48,47,50,49,52,51,49,53,52,55,54,52,56,55,58,57,55,59,58,56,60,59,62,61,59,63,65];
  const hrvMarks = [3,7,12,16,20,25,29];
  const rhr = [64,63,64,62,63,61,62,60,61,60,59,60,58,59,58,57,58,56,57,56,55,56,54,55,54,53,54,53,52,51];
  const sleep = [72,70,74,73,76,75,78,77,75,79,78,81,80,78,82,81,83,82,80,84,83,85,84,82,86,85,87,86,88,90];
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

      {/* top insight */}
      <div className="hero card-pad fade-up d1" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
          <Icon name="sparkle" size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div className="t-label" style={{ color: 'var(--wood)', marginBottom: 8 }}>Top pattern</div>
            <div className="t-h2" style={{ lineHeight: 1.25, fontWeight: 600 }}>
              Your best recovery days correlate with <span className="accent">evening sessions</span> before 8pm.
            </div>
          </div>
        </div>
      </div>

      {/* HRV chart */}
      <div className="card card-pad fade-up d2" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 7 }}>HRV · Heart rate variability</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div className="t-h1 tnum">65<span className="unit">ms</span></div>
              <Delta dir="up" value="+19% / 30d" />
            </div>
          </div>
          <Icon name="pulse" size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <LineChart data={hrv} width={W} height={118} markers={hrvMarks} gridY={3} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <span style={{ width: 11, height: 11, borderRadius: 99, background: 'var(--bg-1)', border: '2px solid var(--accent)', flexShrink: 0 }} />
          <span className="t-sm">Rings mark days with a sauna session</span>
        </div>
      </div>

      {/* sleep correlation */}
      <div className="card card-pad fade-up d3" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 7 }}>Sleep quality</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div className="t-h1 tnum">90<span className="unit">score</span></div>
              <Delta dir="up" value="+25%" calm />
            </div>
          </div>
          <Icon name="moon" size={20} style={{ color: 'var(--calm)' }} />
        </div>
        <LineChart data={sleep} width={W} height={104} color="var(--calm)" gridY={3} />
      </div>

      {/* resting HR */}
      <div className="card card-pad fade-up d4" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 7 }}>Resting heart rate</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <div className="t-h1 tnum">51<span className="unit">bpm</span></div>
              <Delta dir="down" value="−13 bpm" calm />
            </div>
          </div>
          <Icon name="heart" size={20} style={{ color: 'var(--wood)' }} />
        </div>
        <LineChart data={rhr} width={W} height={104} color="var(--wood)" fill={false} dashed gridY={3} />
      </div>

      {/* weekly frequency */}
      <div className="card card-pad fade-up d5" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div className="t-label" style={{ marginBottom: 7 }}>Session frequency</div>
            <div className="t-h1 tnum">5<span className="unit">this week</span></div>
          </div>
          <Icon name="flame" size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <BarChart data={weeks} labels={wkLabels} width={W} height={116} highlight={5} />
      </div>

      {/* secondary insight */}
      <div className="tile fade-up d6" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 18 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--surface-3)', color: 'var(--calm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="bed" size={19} />
        </div>
        <div>
          <div className="t-h3" style={{ fontSize: 15.5, marginBottom: 3 }}>Heat lowers your resting HR overnight</div>
          <div className="t-sm">On session nights, your resting HR averages 4 bpm lower than rest days.</div>
        </div>
      </div>
    </div>
  );
}
