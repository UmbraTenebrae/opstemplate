// directionB.jsx — "Launcher": calm, search-first home. Jump to anything,
// pinned tools, browse by category, with one Grafana strip at the foot.

function DirLauncher() {
  const cats = ['All tools', 'Infrastructure', 'Access', 'Data', 'Security', 'Observability', 'Endpoints'];
  return (
    <div className="portal" data-screen-label="B · Launcher">
      <Sidebar slim />
      <div className="ip-main">
        <TopBar showEnv={true} placeholder="Jump to anything…" />
        <div className="ip-content" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ width: '100%', maxWidth: 880, paddingTop: 26, display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* greeting */}
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.6px' }}>Good morning, Sarah.</div>
              <div style={{ marginTop: 7, color: 'var(--text-muted)', fontSize: 13.5 }}>
                <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>27 tools</span> across 6 categories — jump straight to what you need.
              </div>
            </div>

            {/* command hero */}
            <div className="ip-card" style={{ padding: '18px 20px', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                <IpIcon name="search" size={22} stroke={1.7} style={{ color: 'var(--primary)' }} />
                <span style={{ flex: 1, fontSize: 16, color: 'var(--text-faint)' }}>Search a tool, category or tag…</span>
                <span className="ip-kbd" style={{ fontSize: 12 }}>⌘K</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                {cats.map((c, i) => (
                  <span className={`ip-chip${i === 0 ? ' ip-chip--active' : ''}`} key={c}>{c}</span>
                ))}
              </div>
            </div>

            {/* pinned */}
            <section>
              <div className="ip-sec-head">
                <span className="ip-sec-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <IpIcon name="star" size={14} stroke={1.7} style={{ color: 'var(--primary)' }} />Pinned
                </span>
                <span className="ip-sec-meta">{IP_PINNED.length} tools</span>
                <span className="ip-sec-link">Edit →</span>
              </div>
              <div className="ip-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {IP_PINNED.slice(0, 4).map((t) => <ToolTile key={t.name} t={t} />)}
              </div>
            </section>

            {/* browse by category */}
            <section>
              <div className="ip-sec-head">
                <span className="ip-sec-title">Browse by category</span>
                <span className="ip-sec-link">All categories →</span>
              </div>
              <div className="ip-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {IP_CAT_ORDER.map((k) => <CatCard key={k} catKey={k} />)}
              </div>
            </section>

            {/* one Grafana strip at the foot */}
            <GrafanaPanel
              title="Portal activity"
              sub="tool launches across the team · last 24h"
              seed={6} color="var(--accent)" height={56}
              legend={<><span>peak 11:40 · 318/h</span><span>avg 142/h</span><span>▲ 8% wk</span></>}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirLauncher });
