// shell.jsx — shared app-shell building blocks for all three directions.
// Exports to window: Sidebar, TopBar, StatusPill, sparkBars.
// Every status surface pairs an ICON + TEXT so meaning never relies on
// color alone (protanopia-safe).

const IP_STATUS = {
  ok:   { icon: 'check',  label: 'Operational' },
  warn: { icon: 'warn',   label: 'Degraded' },
  info: { icon: 'wrench', label: 'Maintenance' },
  down: { icon: 'outage', label: 'Outage' },
};

function StatusPill({ state = 'ok', label, size }) {
  const s = IP_STATUS[state] || IP_STATUS.ok;
  return (
    <span className={`ip-status ip-status--${state}`} style={size === 'sm' ? { height: 22, fontSize: 11 } : null}>
      <IpIcon name={s.icon} size={13} stroke={1.9} />
      {label || s.label}
    </span>
  );
}

// deterministic sparkline bars (no Math.random so renders are stable)
function sparkBars(seed, n = 14, max = 22) {
  const out = [];
  let x = seed * 9301 + 49297;
  for (let i = 0; i < n; i++) {
    x = (x * 9301 + 49297) % 233280;
    out.push(8 + Math.round((x / 233280) * (max - 8)));
  }
  return out;
}

const IP_NAV = [
  { sec: 'Browse', items: [
    { icon: 'home', name: 'Home', active: true },
    { icon: 'grid', name: 'All tools', count: '27' },
    { icon: 'star', name: 'Favorites', count: '6' },
    { icon: 'clock', name: 'Recent' },
  ]},
  { sec: 'Categories', items: [
    { icon: 'server', name: 'Infrastructure' },
    { icon: 'key', name: 'Access & identity' },
    { icon: 'database', name: 'Data & analytics' },
    { icon: 'shield', name: 'Security' },
    { icon: 'activity', name: 'Observability' },
    { icon: 'monitor', name: 'Endpoints' },
  ]},
  { sec: 'Resources', items: [
    { icon: 'book', name: 'Runbooks' },
    { icon: 'users', name: 'People directory' },
  ]},
];

function Sidebar({ slim, nav = IP_NAV }) {
  return (
    <aside className={`ip-sidebar${slim ? ' ip-sidebar--slim' : ''}`}>
      <div className="ip-brand">
        <div className="ip-brand-mark"><IpIcon name="layers" size={17} stroke={1.9} /></div>
        <div>
          <div className="ip-brand-name">Operations Portal</div>
          <div className="ip-brand-sub">internal · ops</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {nav.map((group) => (
          <div className="ip-navsec" key={group.sec}>
            <div className="ip-navlabel">{group.sec}</div>
            {group.items.map((it) => (
              <div className={`ip-navitem${it.active ? ' ip-navitem--active' : ''}`} key={it.name}>
                <IpIcon name={it.icon} size={17} stroke={1.7} />
                <span>{it.name}</span>
                {it.count && <span className="ip-navcount">{it.count}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="ip-sidefoot">
        <div className="ip-avatar">SR</div>
        <div style={{ minWidth: 0 }}>
          <div className="ip-sidefoot-name">S. Rao</div>
          <div className="ip-sidefoot-role">sysadmin</div>
        </div>
        <IpIcon name="settings" size={16} stroke={1.6} style={{ marginLeft: 'auto', color: 'var(--text-faint)' }} />
      </div>
    </aside>
  );
}

function TopBar({ title, showEnv = true, wideSearch, placeholder = 'Search tools, services, runbooks…', children }) {
  return (
    <header className="ip-topbar">
      {title && <div className="ip-topbar-title">{title}</div>}
      <div className="ip-search" style={{ flex: wideSearch ? '1 1 auto' : '0 1 360px', maxWidth: wideSearch ? 560 : 360 }}>
        <IpIcon name="search" size={16} stroke={1.7} />
        <span className="ip-search-ph">{placeholder}</span>
        <span className="ip-kbd">⌘K</span>
      </div>
      <div style={{ flex: 1 }} />
      {children}
      {showEnv && (
        <div className="ip-envpill"><span className="ip-envled" /> PROD · us-east-1</div>
      )}
      <button className="ip-iconbtn" title="Notifications">
        <IpIcon name="bell" size={17} stroke={1.6} />
        <span className="ip-dot-badge" />
      </button>
    </header>
  );
}

Object.assign(window, { Sidebar, TopBar, StatusPill, sparkBars, IP_NAV, IP_STATUS });
