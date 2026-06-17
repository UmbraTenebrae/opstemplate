// directionA.jsx — "Directory": a categorized launchpad. A slim Grafana
// metric strip sits on top; the page is dominated by browsable tool tiles.

function DirConsole() {
  return (
    <div className="portal" data-screen-label="A · Directory">
      <Sidebar />
      <div className="ip-main">
        <TopBar title="Tool directory" wideSearch placeholder="Search 27 tools — by name, category or tag…" />
        <div className="ip-content" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Grafana metric strip — secondary, at-a-glance */}
          <section>
            <div className="ip-sec-head" style={{ marginBottom: 12 }}>
              <span className="ip-sec-title">At a glance</span>
              <span className="ip-sec-meta">live · embedded from Grafana</span>
              <span className="ip-sec-link">Open dashboard →</span>
            </div>
            <div className="ip-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <GrafanaStat label="Fleet uptime · 30d" val="99.98" unit="%" seed={4} color="var(--accent)" delta="SLO 99.9% · within budget" />
              <GrafanaStat label="Open tickets" val="23" seed={8} color="var(--primary)" delta="▼ 6 vs. yesterday" />
              <GrafanaStat label="Deploys today" val="14" seed={12} color="var(--accent)" delta="across 9 services" />
            </div>
          </section>

          {/* the directory itself */}
          <CatSection catKey="infra" cols={5} />
          <CatSection catKey="access" cols={5} />
          <CatSection catKey="data" cols={5} />

        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirConsole });
