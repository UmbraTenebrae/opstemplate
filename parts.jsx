// parts.jsx — directory building blocks: tool tiles & rows, category
// section headers, and Grafana embed panels (secondary metric accents).
// Loads after shell.jsx (uses sparkBars) and data.jsx.

// ---- tool tile (grid) — reads as a launchable link to another tool ----
function ToolTile({ t, accent }) {
  return (
    <div className="ip-tile" role="link" tabIndex={0}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div className={`ip-tile-ico${accent ? ' ip-tile-ico--accent' : ''}`}><IpIcon name={t.icon} size={19} stroke={1.7} /></div>
        <button className={`ip-tool-star${t.fav ? ' is-on' : ''}`} aria-label="Pin to favorites" onClick={(e) => e.preventDefault()}>
          <IpIcon name="star" size={15} stroke={1.7} />
        </button>
      </div>
      <div>
        <div className="ip-tile-name">{t.name}</div>
        <div className="ip-tile-desc" style={{ marginTop: 4 }}>{t.desc}</div>
      </div>
      <div className="ip-tile-foot">
        <span className="ip-tile-tag">{t.tag}</span>
        <span className="ip-tile-open">Open <IpIcon name="external" size={12.5} stroke={1.8} /></span>
      </div>
    </div>
  );
}

// ---- tool row (compact, for dense lists / rails) ----
function ToolRow({ t, accent }) {
  return (
    <div className="ip-launch" role="link" tabIndex={0}>
      <div className="ip-launch-ico" style={accent ? { background: 'var(--primary-soft)', color: 'var(--primary)' } : null}>
        <IpIcon name={t.icon} size={17} stroke={1.7} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="ip-launch-name">{t.name}</div>
        <div className="ip-launch-sub">{t.tag}{t.desc ? ' · ' + t.desc : ''}</div>
      </div>
      <IpIcon name="external" size={15} stroke={1.7} style={{ marginLeft: 'auto', color: 'var(--text-faint)', flex: '0 0 auto' }} />
    </div>
  );
}

// ---- category section header + tile grid ----
function CatSection({ catKey, cols = 5, count }) {
  const c = IP_TOOLS[catKey];
  return (
    <section>
      <div className="ip-sec-head">
        <span className="ip-sec-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <IpIcon name={c.icon} size={15} stroke={1.7} style={{ color: 'var(--text-muted)' }} />{c.label}
        </span>
        <span className="ip-sec-meta">{count || c.tools.length + ' tools'}</span>
        <span className="ip-sec-link">View all →</span>
      </div>
      <div className="ip-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {c.tools.slice(0, cols).map((t) => <ToolTile key={t.name} t={t} />)}
      </div>
    </section>
  );
}

// ---- category browse card (folder-style, for the launcher direction) ----
function CatCard({ catKey }) {
  const c = IP_TOOLS[catKey];
  return (
    <div className="ip-launch" role="link" tabIndex={0} style={{ padding: '13px 14px' }}>
      <div className="ip-launch-ico" style={{ width: 36, height: 36, flexBasis: 36, background: 'var(--primary-soft)', color: 'var(--primary)' }}>
        <IpIcon name={c.icon} size={18} stroke={1.7} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="ip-launch-name" style={{ fontSize: 13.5 }}>{c.label}</div>
        <div className="ip-launch-sub">{c.tools.length} tools</div>
      </div>
      <IpIcon name="chevron" size={15} stroke={1.8} style={{ marginLeft: 'auto', color: 'var(--text-faint)', flex: '0 0 auto' }} />
    </div>
  );
}

// ---- Grafana embed slot — a real-looking panel that maps to an iframe ----
function GBadge() {
  return <span className="ip-gbadge"><i />Grafana</span>;
}

function MiniArea({ seed = 1, h = 46, color = 'var(--accent)', n = 26, strokeW = 1.6 }) {
  const w = 300;
  const vals = sparkBars(seed, n, 100);
  const step = w / (n - 1);
  const pts = vals.map((v, i) => [+(i * step).toFixed(1), +(h - (v / 100) * (h - 6) - 2).toFixed(1)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  const gid = `ipg${seed}-${Math.round(h)}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: h, display: 'block', color }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth={strokeW} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function GrafanaPanel({ title, sub, seed = 2, color = 'var(--accent)', height = 60, legend }) {
  return (
    <div className="ip-card ip-gpanel">
      <div className="ip-gpanel-head">
        <div style={{ minWidth: 0 }}>
          <div className="ip-gpanel-title">{title}</div>
          {sub && <div className="ip-gpanel-sub">{sub}</div>}
        </div>
        <GBadge />
      </div>
      <div className="ip-gpanel-body"><MiniArea seed={seed} h={height} color={color} /></div>
      {legend && <div className="ip-gpanel-foot">{legend}</div>}
    </div>
  );
}

function GrafanaStat({ label, val, unit, delta, seed = 3, color = 'var(--primary)' }) {
  return (
    <div className="ip-card ip-gstat">
      <div className="ip-gstat-head"><span className="ip-metric-label">{label}</span><GBadge /></div>
      <div className="ip-metric-val" style={{ fontSize: 23 }}>{val}{unit && <span className="ip-unit">{unit}</span>}</div>
      <div style={{ marginTop: 2 }}><MiniArea seed={seed} h={28} color={color} strokeW={1.5} /></div>
      {delta && <div className="ip-metric-delta">{delta}</div>}
    </div>
  );
}

Object.assign(window, { ToolTile, ToolRow, CatSection, CatCard, GBadge, MiniArea, GrafanaPanel, GrafanaStat });
