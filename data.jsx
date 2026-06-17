// data.jsx — the tool directory dataset. One source of truth for tools,
// categories and pinned items shared across every direction.

const IP_TOOLS = {
  infra: {
    label: 'Infrastructure', icon: 'server',
    tools: [
      { icon: 'cpu', name: 'Compute Console', desc: 'VMs, instances & autoscaling', tag: 'AWS' },
      { icon: 'layers', name: 'Kubernetes', desc: 'Cluster workloads & rollouts', tag: 'K8s', fav: true },
      { icon: 'globe', name: 'DNS Manager', desc: 'Zones, records & failover', tag: 'Route 53' },
      { icon: 'activity', name: 'Load Balancers', desc: 'Traffic & target groups', tag: 'ELB' },
      { icon: 'terminal', name: 'Bastion / SSH', desc: 'Secure shell & session logs', tag: 'SSM', fav: true },
    ],
  },
  access: {
    label: 'Access & identity', icon: 'key',
    tools: [
      { icon: 'lock', name: 'Okta Admin', desc: 'Users, apps & SSO', tag: 'Okta', fav: true },
      { icon: 'key', name: 'Access Requests', desc: 'Request & approve entitlements', tag: 'IAM', fav: true },
      { icon: 'users', name: 'Group Manager', desc: 'AD / LDAP group membership', tag: 'AD' },
      { icon: 'shield', name: 'Secrets Vault', desc: 'Credentials & rotation', tag: 'Vault' },
      { icon: 'refresh', name: 'MFA Reset', desc: 'Reset factors & tokens', tag: 'self-serve' },
    ],
  },
  data: {
    label: 'Data & analytics', icon: 'database',
    tools: [
      { icon: 'database', name: 'Database Console', desc: 'Query & manage databases', tag: 'RDS', fav: true },
      { icon: 'cloud', name: 'Snowflake', desc: 'Warehouses, shares & usage', tag: 'DW' },
      { icon: 'layers', name: 'Data Pipelines', desc: 'Airflow DAGs & job runs', tag: 'ETL' },
      { icon: 'refresh', name: 'Backup Manager', desc: 'Snapshots & restore points', tag: 'Velero' },
      { icon: 'monitor', name: 'Looker / BI', desc: 'Dashboards & explores', tag: 'BI' },
    ],
  },
  security: {
    label: 'Security', icon: 'shield',
    tools: [
      { icon: 'shield', name: 'Vuln Scanner', desc: 'Findings & remediation', tag: 'Tenable' },
      { icon: 'activity', name: 'SIEM', desc: 'Events, alerts & detections', tag: 'Splunk' },
      { icon: 'lock', name: 'Cert Manager', desc: 'TLS certs & renewals', tag: 'ACM' },
      { icon: 'book', name: 'Policy Center', desc: 'Standards & exceptions', tag: 'GRC' },
    ],
  },
  observe: {
    label: 'Observability', icon: 'activity',
    tools: [
      { icon: 'activity', name: 'Grafana', desc: 'Dashboards & metrics', tag: 'Grafana', fav: true },
      { icon: 'pulse', name: 'Prometheus', desc: 'Metrics & PromQL', tag: 'Prom' },
      { icon: 'terminal', name: 'Logs', desc: 'Search, tail & live stream', tag: 'Loki' },
      { icon: 'bell', name: 'Alerting', desc: 'Routes, silences & on-call', tag: 'Alertmanager' },
      { icon: 'globe', name: 'Status Page', desc: 'Public & internal status', tag: 'Statuspage' },
    ],
  },
  endpoints: {
    label: 'Endpoints', icon: 'monitor',
    tools: [
      { icon: 'monitor', name: 'Device Manager', desc: 'MDM & enrollment', tag: 'Jamf' },
      { icon: 'grid', name: 'Asset Inventory', desc: 'Hardware & licenses', tag: 'Snipe-IT' },
      { icon: 'cpu', name: 'Software Center', desc: 'App catalog & installs', tag: 'Intune' },
    ],
  },
};

const IP_CAT_ORDER = ['infra', 'access', 'data', 'security', 'observe', 'endpoints'];

// flat pinned list (fav:true across the catalog)
const IP_PINNED = IP_CAT_ORDER
  .flatMap((k) => IP_TOOLS[k].tools.filter((t) => t.fav))
  .slice(0, 6);

const IP_TOTAL = IP_CAT_ORDER.reduce((n, k) => n + IP_TOOLS[k].tools.length, 0);

const IP_RECENT = [
  { icon: 'key', name: 'Access Requests', meta: 'opened · 14m ago' },
  { icon: 'database', name: 'Database Console', meta: 'opened · 1h ago' },
  { icon: 'terminal', name: 'Bastion / SSH', meta: 'opened · 3h ago' },
];

Object.assign(window, { IP_TOOLS, IP_CAT_ORDER, IP_PINNED, IP_TOTAL, IP_RECENT });
