import {
  ArrowLeft,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Activity,
  TrendingUp,
  CircleDollarSign,
} from "lucide-react";

const transactions = [
  {
    time: "10:42:20",
    type: "ESCROW",
    description: "TR-992 mission escrow funded",
    amount: "-15.00 CRD",
    status: "LOCKED",
  },
  {
    time: "10:41:52",
    type: "SETTLEMENT",
    description: "Hotel Agent Beta reward settled",
    amount: "+42.50 CRD",
    status: "SETTLED",
  },
  {
    time: "10:40:31",
    type: "ESCROW",
    description: "TR-991 mission escrow funded",
    amount: "-28.00 CRD",
    status: "LOCKED",
  },
  {
    time: "10:38:14",
    type: "REWARD",
    description: "Flight Agent Alpha completed task",
    amount: "+36.00 CRD",
    status: "SETTLED",
  },
  {
    time: "10:35:42",
    type: "SETTLEMENT",
    description: "Research Agent Gamma reward settled",
    amount: "+24.75 CRD",
    status: "SETTLED",
  },
  {
    time: "10:32:08",
    type: "ESCROW",
    description: "TR-990 mission escrow funded",
    amount: "-20.00 CRD",
    status: "LOCKED",
  },
];

function Economy({ onBack }) {
  return (
    <div className="economy-app">

      {/* TOPBAR */}
      <header className="economy-topbar">

        <button className="economy-back" onClick={onBack}>
          <ArrowLeft size={16} />
          BACK TO OVERVIEW
        </button>

        <div className="economy-title">
          <Wallet size={18} />
          ECONOMY CONTROL
        </div>

        <div className="economy-network">
          <span className="economy-network-dot" />
          ECONOMY ONLINE
        </div>

      </header>

      {/* MAIN */}
      <main className="economy-main">

        {/* HEADER */}
        <section className="economy-header">

          <div>
            <span className="economy-kicker">
              AUTONOMOUS ECONOMY
            </span>

            <h1>Economy</h1>

            <p>
              Monitor credits, escrow, settlements and agent
              reward flows across the autonomous economy.
            </p>
          </div>

          <div className="economy-balance">
            <span>AVAILABLE BALANCE</span>
            <strong>942.50 CRD</strong>
            <small>+8.4% THIS PERIOD</small>
          </div>

        </section>

        {/* METRICS */}
        <section className="economy-metrics">

          <EconomyMetric
            icon={<Wallet />}
            label="CIRCULATING"
            value="124.5k"
            detail="CRD"
          />

          <EconomyMetric
            icon={<ShieldCheck />}
            label="IN ESCROW"
            value="4,250"
            detail="CRD"
          />

          <EconomyMetric
            icon={<TrendingUp />}
            label="SETTLED"
            value="98.2%"
            detail="SUCCESS RATE"
            success
          />

          <EconomyMetric
            icon={<Activity />}
            label="24H VOLUME"
            value="18.7k"
            detail="CRD"
          />

        </section>

        {/* TWO COLUMN */}
        <section className="economy-grid">

          {/* FLOW */}
          <div className="economy-panel">

            <div className="economy-panel-header">
              <div>
                <span>REAL-TIME</span>
                <h2>Credit Flow</h2>
              </div>

              <span className="economy-live">
                <span />
                LIVE
              </span>
            </div>

            <div className="flow-summary">

              <div className="flow-card">
                <div className="flow-icon incoming">
                  <ArrowDownLeft size={17} />
                </div>

                <div>
                  <span>INFLOW</span>
                  <strong>+8,420 CRD</strong>
                </div>
              </div>

              <div className="flow-card">
                <div className="flow-icon outgoing">
                  <ArrowUpRight size={17} />
                </div>

                <div>
                  <span>OUTFLOW</span>
                  <strong>-5,870 CRD</strong>
                </div>
              </div>

            </div>

            <div className="economy-chart">

              <div className="chart-grid-line" />
              <div className="chart-grid-line" />
              <div className="chart-grid-line" />
              <div className="chart-grid-line" />

              <div className="chart-line">
                <span style={{ height: "32%" }} />
                <span style={{ height: "48%" }} />
                <span style={{ height: "42%" }} />
                <span style={{ height: "65%" }} />
                <span style={{ height: "52%" }} />
                <span style={{ height: "72%" }} />
                <span style={{ height: "61%" }} />
                <span style={{ height: "84%" }} />
                <span style={{ height: "76%" }} />
                <span style={{ height: "92%" }} />
                <span style={{ height: "81%" }} />
                <span style={{ height: "96%" }} />
              </div>

            </div>

            <div className="chart-labels">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>NOW</span>
            </div>

          </div>

          {/* HEALTH */}
          <div className="economy-panel">

            <div className="economy-panel-header">
              <div>
                <span>24H OVERVIEW</span>
                <h2>Economy Health</h2>
              </div>
            </div>

            <div className="health-list">

              <HealthRow
                label="Successful settlements"
                value="98.2%"
                success
              />

              <HealthRow
                label="Pending settlements"
                value="0.9%"
              />

              <HealthRow
                label="Failed / disputed"
                value="1.8%"
                danger
              />

              <HealthRow
                label="Average settlement"
                value="4.8 sec"
              />

              <HealthRow
                label="Escrow utilization"
                value="34.6%"
              />

            </div>

            <div className="health-status">
              <ShieldCheck size={18} />

              <div>
                <strong>ECONOMY STABLE</strong>
                <p>
                  No settlement anomalies detected.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* TRANSACTIONS */}
        <section className="economy-panel transactions-panel">

          <div className="economy-panel-header">

            <div>
              <span>TRANSACTION LEDGER</span>
              <h2>Recent Activity</h2>
            </div>

            <span className="transaction-count">
              6 RECENT
            </span>

          </div>

          <div className="transaction-header">
            <span>TIME</span>
            <span>TYPE</span>
            <span>DESCRIPTION</span>
            <span>AMOUNT</span>
            <span>STATUS</span>
          </div>

          {transactions.map((transaction) => (
            <div
              className="transaction-row"
              key={`${transaction.time}-${transaction.description}`}
            >

              <span className="transaction-time">
                {transaction.time}
              </span>

              <span className="transaction-type">
                {transaction.type}
              </span>

              <span className="transaction-description">
                {transaction.description}
              </span>

              <span
                className={
                  transaction.amount.startsWith("+")
                    ? "transaction-amount positive"
                    : "transaction-amount"
                }
              >
                {transaction.amount}
              </span>

              <span
                className={
                  transaction.status === "SETTLED"
                    ? "transaction-status settled"
                    : "transaction-status locked"
                }
              >
                {transaction.status}
              </span>

            </div>
          ))}

        </section>

        {/* FOOTER SUMMARY */}
        <section className="economy-footer">

          <div>
            <CircleDollarSign size={17} />
            <span>TOTAL SETTLED</span>
            <strong>98.2k CRD</strong>
          </div>

          <div>
            <ShieldCheck size={17} />
            <span>ESCROW PROTECTED</span>
            <strong>4,250 CRD</strong>
          </div>

          <div>
            <Activity size={17} />
            <span>ACTIVE FLOWS</span>
            <strong>24</strong>
          </div>

        </section>

      </main>
    </div>
  );
}

function EconomyMetric({
  icon,
  label,
  value,
  detail,
  success,
}) {
  return (
    <div className="economy-metric">

      <div className="economy-metric-icon">
        {icon}
      </div>

      <span>{label}</span>

      <strong>{value}</strong>

      <small className={success ? "metric-success" : ""}>
        {detail}
      </small>

    </div>
  );
}

function HealthRow({
  label,
  value,
  success,
  danger,
}) {
  return (
    <div className="health-row">

      <span>{label}</span>

      <strong
        className={
          success
            ? "health-success"
            : danger
            ? "health-danger"
            : ""
        }
      >
        {value}
      </strong>

    </div>
  );
}

export default Economy;