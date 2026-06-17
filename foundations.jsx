// foundations.jsx — design-system style tile: type, color, status legend,
// and component primitives. Documents the locked styling decisions.

function Swatch({ name, varName, hex }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ height: 52, borderRadius: 9, background: `var(${varName})`, border: '1px solid var(--border)' }} />
      <div>
        <div style={{ fontSize: 12, fontWeight: 600 }}>{name}</div>
        <div className="ip-mono" style={{ fontSize: 10.5, color: 'var(--text-faint)', marginTop: 1 }}>{varName}</div>
      </div>
    </div>
  );
}

function FoundCard({ title, note, children, style }) {
  return (
    <div className="ip-card" style={{ padding: 20, ...style }}>
      <div className="ip-sec-head" style={{ margin: '0 0 16px' }}>
        <span className="ip-sec-title">{title}</span>
        {note && <span className="ip-sec-meta">{note}</span>}
      </div>
      {children}
    </div>
  );
}

function Foundations() {
  return (
    <div className="portal" data-screen-label="Foundations" style={{ display: 'block', height: 'auto', overflow: 'visible', padding: 32 }}>
      <div style={{ maxWidth: 1376, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 6 }}>
          <div className="ip-brand-mark" style={{ width: 40, height: 40, flexBasis: 40, borderRadius: 11 }}><IpIcon name="layers" size={22} stroke={1.9} /></div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.5px' }}>Operations Portal — Design System</div>
            <div className="ip-mono" style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>tool directory · IBM Plex Sans + Mono · indigo / cyan · protanopia-safe status · light + chocolate dark</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, marginTop: 22 }}>
          {/* type */}
          <FoundCard title="Typography" note="IBM Plex Sans / Mono">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.7px', whiteSpace: 'nowrap' }}>Display 30 / 600</span>
                <span className="ip-mono" style={{ fontSize: 11, color: 'var(--text-faint)' }}>headlines</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 600 }}>Title 18 / 600</span>
                <span className="ip-mono" style={{ fontSize: 11, color: 'var(--text-faint)' }}>card & section titles</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <span style={{ fontSize: 13.5 }}>Body 13.5 / 400 — calm, legible at a glance for steady console use.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span className="ip-mono" style={{ fontSize: 13 }}>REQ-4821 · 99.99% · us-east-1</span>
                <span className="ip-mono" style={{ fontSize: 11, color: 'var(--text-faint)' }}>mono — IDs, metrics, env</span>
              </div>
            </div>
          </FoundCard>

          {/* status legend */}
          <FoundCard title="Status — icon + label, never color alone" note="colorblind-safe">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['ok', 'Healthy / operational'], ['warn', 'Degraded performance'], ['info', 'Scheduled maintenance'], ['down', 'Outage / critical']].map(([st, desc]) => (
                <div key={st} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 132 }}><StatusPill state={st} /></div>
                  <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{desc}</span>
                </div>
              ))}
              <div style={{ fontSize: 11.5, color: 'var(--text-faint)', lineHeight: 1.5, marginTop: 4, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                Each state carries a distinct shape (check · triangle · wrench · octagon) and text, so meaning survives for protanopic users and in grayscale.
              </div>
            </div>
          </FoundCard>
        </div>

        {/* color */}
        <FoundCard title="Color tokens" note="adapts per theme" style={{ marginTop: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            <Swatch name="Primary — indigo" varName="--primary" />
            <Swatch name="Accent — cyan" varName="--accent" />
            <Swatch name="Operational" varName="--st-ok" />
            <Swatch name="Degraded" varName="--st-warn" />
            <Swatch name="Maintenance" varName="--st-info" />
            <Swatch name="Outage" varName="--st-down" />
            <Swatch name="Background" varName="--bg" />
            <Swatch name="Surface" varName="--surface" />
            <Swatch name="Surface 2" varName="--surface-2" />
            <Swatch name="Border" varName="--border" />
            <Swatch name="Text" varName="--text" />
            <Swatch name="Text muted" varName="--text-muted" />
          </div>
        </FoundCard>

        {/* components */}
        <FoundCard title="Components" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="ip-mono" style={{ fontSize: 10.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Buttons</span>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="ip-btn ip-btn--primary"><IpIcon name="plus" size={16} stroke={2} /> New request</button>
                <button className="ip-btn ip-btn--ghost"><IpIcon name="refresh" size={16} stroke={1.7} /> Refresh</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="ip-mono" style={{ fontSize: 10.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Chips · env</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="ip-chip ip-chip--active">Infrastructure</span>
                <span className="ip-chip">Access</span>
                <div className="ip-envpill"><span className="ip-envled" /> PROD · us-east-1</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 232 }}>
              <span className="ip-mono" style={{ fontSize: 10.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tool tile</span>
              <ToolTile t={{ icon: 'key', name: 'Access Requests', desc: 'Request & approve entitlements', tag: 'IAM', fav: true }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 256 }}>
              <span className="ip-mono" style={{ fontSize: 10.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Grafana embed panel</span>
              <GrafanaPanel title="Portal activity" sub="launches · 24h" seed={6} color="var(--accent)" height={48} legend={<><span>avg 142/h</span><span>▲ 8%</span></>} />
            </div>
          </div>
        </FoundCard>

      </div>
    </div>
  );
}

Object.assign(window, { Foundations });
