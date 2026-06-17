// directionC.jsx — "Workspace": full tool catalog on the left, a working
// rail on the right holding pinned tools, Grafana panels and resources.

function CatBlock({ catKey, n }) {
  const c = IP_TOOLS[catKey];
  return (
    <div>
      <div className="ip-sec-head" style={{ marginBottom: 10 }}>
        <span className="ip-sec-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <IpIcon name={c.icon} size={15} stroke={1.7} style={{ color: 'var(--text-muted)' }} />{c.label}
        </span>
        <span className="ip-sec-meta">{c.tools.length}</span>
      </div>
      <div className="ip-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {c.tools.slice(0, n).map((t) => <ToolRow key={t.name} t={t} />)}
      </div>
    </div>
  );
}

function DirDashboard() {
  return (
    <div className="portal" data-screen-label="C · Workspace">
      <Sidebar />
      <div className="ip-main">
        <TopBar title="Home" wideSearch placeholder="Search tools, categories & tags…" />
        <div className="ip-content" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, overflow: 'hidden' }}>

          {/* left: catalog */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            <CatBlock catKey="infra" n={4} />
            <CatBlock catKey="access" n={4} />
            <CatBlock catKey="observe" n={4} />
          </div>

          {/* right rail: pinned · grafana · resources */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <div className="ip-card" style={{ padding: '13px 14px' }}>
              <div className="ip-sec-head" style={{ margin: '0 0 8px' }}>
                <span className="ip-sec-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <IpIcon name="star" size={14} stroke={1.7} style={{ color: 'var(--primary)' }} />Pinned
                </span>
                <span className="ip-sec-link">Edit →</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {IP_PINNED.slice(0, 4).map((t) => (
                  <div className="ip-oncall" key={t.name} style={{ padding: '9px 0' }}>
                    <div className="ip-launch-ico" style={{ width: 30, height: 30, flexBasis: 30, background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                      <IpIcon name={t.icon} size={15} stroke={1.7} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="ip-oncall-name">{t.name}</div>
                      <div className="ip-oncall-team">{t.tag}</div>
                    </div>
                    <IpIcon name="external" size={15} stroke={1.7} style={{ marginLeft: 'auto', color: 'var(--text-faint)' }} />
                  </div>
                ))}
              </div>
            </div>

            <GrafanaPanel title="Requests / day" sub="service desk · 14d" seed={5} color="var(--accent)" height={52}
              legend={<><span>today 38</span><span>avg 44</span></>} />

            <GrafanaStat label="Fleet uptime · 30d" val="99.98" unit="%" seed={9} color="var(--primary)" delta="SLO 99.9% · healthy" />

            <div className="ip-card" style={{ padding: '13px 14px' }}>
              <div className="ip-sec-head" style={{ margin: '0 0 6px' }}><span className="ip-sec-title">Resources</span></div>
              {[['book', 'Runbooks & automation'], ['globe', 'Status page'], ['users', 'People directory'], ['ticket', 'Open a ticket']].map(([ic, n]) => (
                <div className="ip-oncall" key={n} style={{ padding: '9px 0' }}>
                  <div className="ip-launch-ico" style={{ width: 28, height: 28, flexBasis: 28 }}><IpIcon name={ic} size={15} stroke={1.7} /></div>
                  <div className="ip-oncall-name" style={{ fontSize: 12.5 }}>{n}</div>
                  <IpIcon name="external" size={14} stroke={1.7} style={{ marginLeft: 'auto', color: 'var(--text-faint)' }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirDashboard });
