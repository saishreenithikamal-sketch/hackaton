import {
  Activity,
  Wallet,
  Users,
  ShieldCheck,
  Plus,
  LayoutDashboard,
  Plane,
  Store,
  Settings,
  BarChart3,
  Bell,
  ChevronRight,
} from "lucide-react";

const activity = [
  ["10:42:01", "[SYSTEM]", "Boss Agent created trip task #TR-992"],
  ["10:42:05", "[MARKET]", "Flight agents are bidding on #TR-992"],
  ["10:42:12", "[MARKET]", "Hotel agents are competing for #TR-992"],
  ["10:42:18", "[SELECT]", "Hotel Agent Beta selected. Confidence: 94%"],
  ["10:42:20", "[FINANCE]", "15 credits moved to escrow for #TR-992"],
  ["10:42:25", "[TRUST]", "Verification started on Agent Beta settlement."],
];

function Dashboard({ onNavigate }) {
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <Activity size={24} />
          <span>AGENTRA</span>
        </div>

        <nav>
          <NavItem icon={<LayoutDashboard />} label="Overview" active />

          <NavItem
            icon={<Plus />}
            label="Create Trip"
            onClick={() => onNavigate("launch")}
          />

          <NavItem
            icon={<Activity />}
            label="Live Missions"
            onClick={() => onNavigate("missions")}
          />

          <NavItem
            icon={<Store />}
            label="Agent Marketplace"
            onClick={() => onNavigate("market")}
          />

          <NavItem
            icon={<Wallet />}
            label="Economy"
            onClick={() => onNavigate("economy")}
          />

          <NavItem
            icon={<ShieldCheck />}
            label="Trust & Reputation"
            onClick={() => onNavigate("trust")}
          />
        </nav>

        <div className="sidebar-bottom">
          <NavItem icon={<BarChart3 />} label="System Status" />
          <NavItem icon={<Settings />} label="Settings" />

          <div className="agent-online">
            <div className="avatar">B</div>
            <div>
              <strong>Boss Agent</strong>
              <small>12 AGENTS ONLINE</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">

        {/* TOP BAR */}
        <header className="topbar">
          <div>
            <span className="mono muted">MISSION CONTROL</span>
            <h1>Overview</h1>
          </div>

          <div className="top-actions">
            <span className="credits">942.50 CRD</span>

            <button className="icon-button">
              <Bell size={18} />
            </button>

            <div className="avatar">B</div>
          </div>
        </header>

        <div className="dashboard-content">

          {/* HERO */}
          <section className="hero">
            <div>
              <span className="tag">AUTONOMOUS ECONOMY</span>

              <h2>
                Command your
                <br />
                agent economy.
              </h2>

              <p>
                Deploy specialized AI agents, coordinate missions,
                verify their work and automatically settle rewards.
              </p>

              <button
                className="primary-button"
                onClick={() => onNavigate("launch")}
              >
                <Plus size={17} />
                Create New Trip
              </button>
            </div>

            <div className="hero-orbit">
              <div className="orbit orbit-large" />
              <div className="orbit orbit-small" />

              <div className="core">
                <Activity size={30} />
              </div>

              <div className="orbit-node node-one" />
              <div className="orbit-node node-two" />
              <div className="orbit-node node-three" />
            </div>
          </section>

          {/* METRICS */}
          <section className="metrics">

            <Metric
              icon={<Activity />}
              label="ACTIVE TASKS"
              value="24"
            />

            <Metric
              icon={<Users />}
              label="ACTIVE AGENTS"
              value="156"
            />

            <Metric
              icon={<Wallet />}
              label="ESCROW (CRD)"
              value="4,250"
            />

            <Metric
              icon={<ShieldCheck />}
              label="SETTLEMENTS (24H)"
              value="892"
            />

          </section>

          {/* GRID */}
          <section className="dashboard-grid">

            {/* ACTIVITY */}
            <div className="panel activity-panel">

              <div className="panel-header">
                <div>
                  <span className="mono muted">REAL-TIME</span>
                  <h3>Live Agent Activity</h3>
                </div>

                <span className="live-status">
                  <span />
                  LIVE
                </span>
              </div>

              <div className="activity-list">
                {activity.map(([time, type, message]) => (
                  <div className="activity-row" key={time}>
                    <span className="time mono">{time}</span>

                    <span className="activity-type mono">
                      {type}
                    </span>

                    <span className="activity-message">
                      {message}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* ECONOMY */}
            <div className="panel">

              <div className="panel-header">
                <div>
                  <span className="mono muted">24H OVERVIEW</span>
                  <h3>Economy Health</h3>
                </div>
              </div>

              <div className="economy-list">

                <EconomyRow
                  label="Circulating"
                  value="124.5k"
                />

                <EconomyRow
                  label="Escrow"
                  value="4,250"
                />

                <EconomyRow
                  label="Settled"
                  value="98.2%"
                  success
                />

                <EconomyRow
                  label="Failed / Disputed"
                  value="1.8%"
                  danger
                />

              </div>

            </div>

          </section>

          {/* MISSIONS */}
          <section className="panel missions-panel">

            <div className="panel-header">
              <div>
                <span className="mono muted">CURRENT OPERATIONS</span>
                <h3>Active Missions</h3>
              </div>

              <button className="text-button">
                View all <ChevronRight size={15} />
              </button>
            </div>

            <div className="mission-table">

              <Mission
                id="TR-992"
                route="Toronto → New York"
                progress="45%"
                agents="3 Agents"
              />

              <Mission
                id="TR-991"
                route="London → Paris"
                progress="90%"
                agents="5 Agents"
              />

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <span className="mono muted">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EconomyRow({ label, value, success, danger }) {
  return (
    <div className="economy-row">
      <span>{label}</span>

      <strong
        className={
          success ? "success" : danger ? "danger" : ""
        }
      >
        {value}
      </strong>
    </div>
  );
}

function Mission({ id, route, progress, agents }) {
  return (
    <div className="mission-row">

      <span className="mono mission-id">
        #{id}
      </span>

      <div className="mission-route">
        <strong>{route}</strong>
        <span>{agents}</span>
      </div>

      <div className="progress-wrapper">
        <div className="progress-label">
          <span>Progress</span>
          <strong>{progress}</strong>
        </div>

        <div className="progress">
          <div style={{ width: progress }} />
        </div>
      </div>

      <ChevronRight size={17} className="muted" />

    </div>
  );
}

export default Dashboard;