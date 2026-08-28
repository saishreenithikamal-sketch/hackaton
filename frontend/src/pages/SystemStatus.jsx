import {
  ArrowLeft,
  Activity,
  Server,
  ShieldCheck,
  Database,
  Network,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  Zap,
} from "lucide-react";

const services = [
  {
    name: "Mission Orchestrator",
    type: "CORE SERVICE",
    status: "OPERATIONAL",
    uptime: "99.98%",
    latency: "42 ms",
    icon: <Activity />,
  },
  {
    name: "Agent Network",
    type: "NETWORK",
    status: "OPERATIONAL",
    uptime: "99.94%",
    latency: "68 ms",
    icon: <Network />,
  },
  {
    name: "Trust Verification",
    type: "SECURITY",
    status: "OPERATIONAL",
    uptime: "99.99%",
    latency: "31 ms",
    icon: <ShieldCheck />,
  },
  {
    name: "Economy Engine",
    type: "SETTLEMENT",
    status: "OPERATIONAL",
    uptime: "99.97%",
    latency: "27 ms",
    icon: <Zap />,
  },
  {
    name: "Mission Database",
    type: "DATABASE",
    status: "OPERATIONAL",
    uptime: "99.99%",
    latency: "18 ms",
    icon: <Database />,
  },
  {
    name: "Compute Cluster",
    type: "INFRASTRUCTURE",
    status: "DEGRADED",
    uptime: "98.71%",
    latency: "114 ms",
    icon: <Cpu />,
  },
];

const events = [
  ["10:42:25", "TRUST", "Agent Beta verification completed"],
  ["10:42:20", "ECONOMY", "Escrow transaction confirmed"],
  ["10:42:12", "MARKET", "Hotel agents connected to marketplace"],
  ["10:41:58", "NETWORK", "New agent node registered"],
  ["10:41:31", "SYSTEM", "Compute node health check completed"],
  ["10:40:44", "DATABASE", "Mission state synchronization completed"],
];

function SystemStatus({ onBack }) {
  return (
    <div className="status-app">

      {/* TOPBAR */}
      <header className="status-topbar">

        <button className="status-back" onClick={onBack}>
          <ArrowLeft size={16} />
          BACK TO OVERVIEW
        </button>

        <div className="status-title">
          <Activity size={18} />
          SYSTEM STATUS
        </div>

        <div className="status-network">
          <span className="status-network-dot" />
          ALL SYSTEMS MONITORED
        </div>

      </header>

      {/* MAIN */}
      <main className="status-main">

        {/* HEADER */}
        <section className="status-header">

          <div>
            <span className="status-kicker">
              INFRASTRUCTURE MONITOR
            </span>

            <h1>System Status</h1>

            <p>
              Monitor the health, availability and performance
              of the Agentra autonomous agent infrastructure.
            </p>
          </div>

          <div className="overall-status">
            <div className="overall-icon">
              <CheckCircle2 size={25} />
            </div>

            <div>
              <span>OVERALL STATUS</span>
              <strong>OPERATIONAL</strong>
              <small>Last checked 12 seconds ago</small>
            </div>
          </div>

        </section>

        {/* SUMMARY */}
        <section className="status-metrics">

          <StatusMetric
            icon={<Server />}
            label="SERVICES"
            value="6 / 6"
            detail="MONITORED"
          />

          <StatusMetric
            icon={<Activity />}
            label="UPTIME"
            value="99.94%"
            detail="30 DAY AVERAGE"
          />

          <StatusMetric
            icon={<Clock3 />}
            label="AVG LATENCY"
            value="50 ms"
            detail="CURRENT"
          />

          <StatusMetric
            icon={<ShieldCheck />}
            label="SECURITY"
            value="100%"
            detail="HEALTHY"
          />

        </section>

        {/* SERVICES */}
        <section className="status-panel">

          <div className="status-panel-header">

            <div>
              <span>INFRASTRUCTURE</span>
              <h2>Service Health</h2>
            </div>

            <span className="status-live">
              <span />
              LIVE MONITORING
            </span>

          </div>

          <div className="service-list">

            {services.map((service) => (
              <div
                className="service-row"
                key={service.name}
              >

                <div className="service-icon">
                  {service.icon}
                </div>

                <div className="service-name">
                  <strong>{service.name}</strong>
                  <span>{service.type}</span>
                </div>

                <div className="service-health">

                  <span
                    className={
                      service.status === "DEGRADED"
                        ? "service-status degraded"
                        : "service-status"
                    }
                  >
                    <span />
                    {service.status}
                  </span>

                </div>

                <div className="service-stat">
                  <span>UPTIME</span>
                  <strong>{service.uptime}</strong>
                </div>

                <div className="service-stat">
                  <span>LATENCY</span>
                  <strong>{service.latency}</strong>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* LOWER GRID */}
        <section className="status-grid">

          {/* ACTIVITY */}
          <div className="status-panel">

            <div className="status-panel-header">

              <div>
                <span>REAL-TIME</span>
                <h2>System Events</h2>
              </div>

              <span className="event-count">
                6 EVENTS
              </span>

            </div>

            <div className="system-events">

              {events.map(([time, type, message]) => (
                <div
                  className="system-event"
                  key={`${time}-${message}`}
                >

                  <span className="event-time">
                    {time}
                  </span>

                  <span className="event-type">
                    [{type}]
                  </span>

                  <span className="event-message">
                    {message}
                  </span>

                  <CheckCircle2 size={14} />

                </div>
              ))}

            </div>

          </div>

          {/* INCIDENTS */}
          <div className="status-panel">

            <div className="status-panel-header">

              <div>
                <span>RELIABILITY</span>
                <h2>Incidents</h2>
              </div>

            </div>

            <div className="incident-empty">

              <div className="incident-icon">
                <CheckCircle2 size={24} />
              </div>

              <strong>NO ACTIVE INCIDENTS</strong>

              <p>
                All monitored services are operating
                within expected parameters.
              </p>

            </div>

            <div className="incident-history">

              <div>
                <span>LAST INCIDENT</span>
                <strong>18 DAYS AGO</strong>
              </div>

              <div>
                <span>RESOLUTION TIME</span>
                <strong>4 MIN 12 SEC</strong>
              </div>

            </div>

          </div>

        </section>

        {/* PERFORMANCE */}
        <section className="status-panel performance-panel">

          <div className="status-panel-header">

            <div>
              <span>PERFORMANCE</span>
              <h2>Network Performance</h2>
            </div>

            <span className="performance-value">
              99.94%
            </span>

          </div>

          <div className="performance-bars">

            <PerformanceBar
              label="Agent Connectivity"
              value="98%"
            />

            <PerformanceBar
              label="Mission Processing"
              value="96%"
            />

            <PerformanceBar
              label="Trust Verification"
              value="99%"
            />

            <PerformanceBar
              label="Settlement Processing"
              value="97%"
            />

          </div>

        </section>

        {/* FOOTER */}
        <footer className="status-footer">

          <div>
            <ShieldCheck size={16} />
            <span>SECURITY</span>
            <strong>PROTECTED</strong>
          </div>

          <div>
            <Network size={16} />
            <span>NETWORK</span>
            <strong>156 AGENTS ONLINE</strong>
          </div>

          <div>
            <Server size={16} />
            <span>INFRASTRUCTURE</span>
            <strong>6 SERVICES</strong>
          </div>

          <div>
            <AlertTriangle size={16} />
            <span>INCIDENTS</span>
            <strong>0 ACTIVE</strong>
          </div>

        </footer>

      </main>
    </div>
  );
}

function StatusMetric({
  icon,
  label,
  value,
  detail,
}) {
  return (
    <div className="status-metric">

      <div className="status-metric-icon">
        {icon}
      </div>

      <span>{label}</span>

      <strong>{value}</strong>

      <small>{detail}</small>

    </div>
  );
}

function PerformanceBar({ label, value }) {
  return (
    <div className="performance-bar">

      <div className="performance-label">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="performance-track">
        <div
          style={{ width: value }}
        />
      </div>

    </div>
  );
}

export default SystemStatus;