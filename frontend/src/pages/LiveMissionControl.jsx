import {
  Activity,
  ArrowLeft,
  Bell,
  Bot,
  CheckCircle2,
  Clock3,
  Coins,
  Hotel,
  Plane,
  Utensils,
  ShieldCheck,
  Wallet,
  AlertTriangle,
  Radio,
  Zap,
} from "lucide-react";

function LiveMissionControl({ onBack }) {

  const agents = [
    {
      name: "FLIGHT AGENT",
      type: "Travel Specialist",
      icon: <Plane />,
      status: "COMPLETED",
      task: "Finding optimal Toronto → New York flights",
      result: "2 verified options found",
      reward: "18 CRD",
    },
    {
      name: "HOTEL AGENT",
      type: "Accommodation Specialist",
      icon: <Hotel />,
      status: "RUNNING",
      task: "Searching for 3-night stays near Manhattan",
      result: "Comparing 12 properties",
      reward: "—",
    },
    {
      name: "FOOD AGENT",
      type: "Dining Specialist",
      icon: <Utensils />,
      status: "RUNNING",
      task: "Building restaurant recommendations",
      result: "Evaluating 24 restaurants",
      reward: "—",
    },
    {
      name: "ACTIVITY AGENT",
      type: "Experience Specialist",
      icon: <Zap />,
      status: "QUEUED",
      task: "Finding attractions and activities",
      result: "Waiting for hotel location",
      reward: "—",
    },
    {
      name: "BUDGET AGENT",
      type: "Financial Specialist",
      icon: <Wallet />,
      status: "VERIFYING",
      task: "Checking total mission cost",
      result: "Budget utilization: 61%",
      reward: "12 CRD",
    },
  ];

  return (
    <div className="control-app">

      {/* TOP BAR */}

      <header className="control-topbar">

        <div className="control-brand">
          <Activity size={24} />
          <span>AGENTRA</span>
        </div>

        <div className="control-title">
          LIVE MISSION CONTROL
        </div>

        <div className="control-actions">

          <div className="control-credit">
            942.50 CRD
          </div>

          <Bell size={19} />

          <div className="control-profile">
            OP
          </div>

        </div>

      </header>


      <div className="control-layout">

        {/* SIDEBAR */}

        <aside className="control-sidebar">

          <div className="sidebar-mission-id">
            MISSION
            <strong>#AG-2048</strong>
          </div>

          <div className="mission-nav">

            <div className="mission-nav-item active">
              <Radio size={17} />
              Live Control
            </div>

            <div className="mission-nav-item">
              <Bot size={17} />
              Agent Activity
            </div>

            <div className="mission-nav-item">
              <ShieldCheck size={17} />
              Verification
            </div>

            <div className="mission-nav-item">
              <Coins size={17} />
              Settlements
            </div>

          </div>

          <button
            className="control-back"
            onClick={onBack}
          >
            <ArrowLeft size={16} />
            BACK TO DASHBOARD
          </button>

        </aside>


        {/* MAIN */}

        <main className="control-main">

          <div className="control-container">


            {/* MISSION HEADER */}

            <div className="mission-header">

              <div>

                <div className="mission-kicker">
                  AUTONOMOUS MISSION / #AG-2048
                </div>

                <h1>
                  Toronto → New York
                </h1>

                <p>
                  3 DAYS · 10 SEP 2026 · 5 SPECIALIZED AGENTS
                </p>

              </div>

              <div className="mission-live">

                <span className="live-dot"></span>

                MISSION ACTIVE

              </div>

            </div>


            {/* PROGRESS */}

            <section className="progress-card">

              <div className="progress-header">

                <div>
                  <span>MISSION PROGRESS</span>
                  <strong>64%</strong>
                </div>

                <div className="progress-time">
                  <Clock3 size={15} />
                  02:14 remaining
                </div>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{ width: "64%" }}
                />

              </div>

              <div className="progress-stages">

                <span className="done">
                  REQUEST
                </span>

                <span className="done">
                  DECOMPOSITION
                </span>

                <span className="active">
                  AGENT EXECUTION
                </span>

                <span>
                  VERIFICATION
                </span>

                <span>
                  SETTLEMENT
                </span>

              </div>

            </section>


            {/* BOSS AGENT */}

            <section className="boss-card">

              <div className="boss-icon">
                <Bot />
              </div>

              <div className="boss-content">

                <div className="boss-heading">

                  <div>
                    <span className="section-kicker">
                      ORCHESTRATOR
                    </span>

                    <h2>BOSS AGENT</h2>
                  </div>

                  <span className="boss-status">
                    COORDINATING
                  </span>

                </div>

                <p>
                  Coordinating specialized agents, monitoring
                  results and preparing outputs for verification.
                </p>

              </div>

              <div className="boss-metrics">

                <div>
                  <span>ACTIVE TASKS</span>
                  <strong>5</strong>
                </div>

                <div>
                  <span>COMPLETED</span>
                  <strong>1</strong>
                </div>

              </div>

            </section>


            {/* AGENTS */}

            <div className="section-heading">

              <div>
                <span>DEPLOYED AGENTS</span>
                <h2>Specialized Workforce</h2>
              </div>

              <span>
                5 AGENTS
              </span>

            </div>


            <div className="agent-grid">

              {agents.map((agent) => (

                <AgentCard
                  key={agent.name}
                  agent={agent}
                />

              ))}

            </div>


            {/* LOWER GRID */}

            <div className="control-lower-grid">


              {/* ACTIVITY */}

              <section className="activity-card">

                <div className="card-heading">

                  <div>
                    <span>LIVE FEED</span>
                    <h2>Agent Activity</h2>
                  </div>

                  <span className="live-label">
                    ● LIVE
                  </span>

                </div>

                <ActivityRow
                  time="14:32:04"
                  agent="FLIGHT AGENT"
                  message="Submitted 2 flight options"
                  status="VERIFIED"
                />

                <ActivityRow
                  time="14:32:18"
                  agent="BUDGET AGENT"
                  message="Budget calculation updated"
                  status="CHECKING"
                />

                <ActivityRow
                  time="14:32:31"
                  agent="HOTEL AGENT"
                  message="Found 12 candidate properties"
                  status="RUNNING"
                />

                <ActivityRow
                  time="14:32:47"
                  agent="FOOD AGENT"
                  message="Evaluating restaurant candidates"
                  status="RUNNING"
                />

              </section>


              {/* VERIFIER */}

              <section className="verification-card">

                <div className="card-heading">

                  <div>
                    <span>TRUST LAYER</span>
                    <h2>Verification</h2>
                  </div>

                  <ShieldCheck />

                </div>

                <div className="verification-status">

                  <CheckCircle2 />

                  <div>
                    <strong>
                      1 TASK VERIFIED
                    </strong>

                    <p>
                      Flight Agent output passed audit.
                    </p>
                  </div>

                </div>

                <div className="verification-warning">

                  <AlertTriangle size={17} />

                  <span>
                    3 tasks awaiting verification
                  </span>

                </div>

                <button>
                  OPEN VERIFICATION CENTER
                </button>

              </section>

            </div>


            {/* BUDGET */}

            <section className="budget-card">

              <div className="budget-heading">

                <div>
                  <span>MISSION ECONOMY</span>
                  <h2>Budget & Settlements</h2>
                </div>

                <Coins />

              </div>

              <div className="budget-metrics">

                <Metric
                  label="TOTAL BUDGET"
                  value="$5,000"
                />

                <Metric
                  label="ALLOCATED"
                  value="$3,050"
                />

                <Metric
                  label="AGENT REWARDS"
                  value="30 CRD"
                />

                <Metric
                  label="REMAINING"
                  value="$1,950"
                />

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}


/* AGENT CARD */

function AgentCard({ agent }) {

  const statusClass =
    agent.status.toLowerCase().replace(" ", "-");

  return (

    <div className={`agent-card ${statusClass}`}>

      <div className="agent-card-top">

        <div className="agent-icon">
          {agent.icon}
        </div>

        <span className={`agent-status ${statusClass}`}>
          {agent.status}
        </span>

      </div>

      <h3>{agent.name}</h3>

      <span className="agent-type">
        {agent.type}
      </span>

      <div className="agent-task">

        <span>CURRENT TASK</span>

        <p>
          {agent.task}
        </p>

      </div>

      <div className="agent-result">

        <span>OUTPUT</span>

        <strong>
          {agent.result}
        </strong>

      </div>

      <div className="agent-reward">

        <span>REWARD</span>

        <strong>
          {agent.reward}
        </strong>

      </div>

    </div>

  );
}


/* ACTIVITY ROW */

function ActivityRow({
  time,
  agent,
  message,
  status,
}) {

  return (

    <div className="activity-row">

      <span className="activity-time">
        {time}
      </span>

      <div className="activity-agent">
        <strong>{agent}</strong>
        <span>{message}</span>
      </div>

      <span className="activity-status">
        {status}
      </span>

    </div>

  );
}


/* METRIC */

function Metric({ label, value }) {

  return (

    <div className="budget-metric">

      <span>{label}</span>

      <strong>{value}</strong>

    </div>

  );
}

export default LiveMissionControl;