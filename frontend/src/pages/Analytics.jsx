import {
  ArrowLeft,
  BarChart3,
  ShieldCheck,
  Wallet,
  Bot,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

function Analytics({ mission, onBack }) {
  const results = mission?.backendResult?.results || [];

  const completedTasks = results.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  const verifiedTasks = results.filter(
    (item) => item.verification?.passed
  ).length;

  const totalSpent = results.reduce(
    (sum, item) => sum + Number(item.bid || 0),
    0
  );

  const verificationRate =
    results.length > 0
      ? Math.round((verifiedTasks / results.length) * 100)
      : 0;

  const agentBudget = Number(mission?.agentBudget || 100);
  const remaining = agentBudget - totalSpent;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080d0f",
        color: "#f3f6f7",
        padding: "35px 5%",
      }}
    >
      {/* BACK */}

      <button
        onClick={onBack}
        style={backButton}
      >
        <ArrowLeft size={17} />
        BACK TO COMMAND CENTER
      </button>

      {/* HEADER */}

      <div style={header}>
        <div>
          <p style={eyebrow}>INTELLIGENCE</p>

          <h1 style={title}>
            Mission Analytics
          </h1>

          <p style={subtitle}>
            Autonomous agent performance, verification and
            economic intelligence.
          </p>
        </div>

        <div style={liveBadge}>
          <Activity size={17} />
          LIVE INTELLIGENCE
        </div>
      </div>

      {/* KPI CARDS */}

      <div style={grid}>
        <Metric
          icon={<Bot />}
          label="TASKS COMPLETED"
          value={`${completedTasks}/${results.length || 3}`}
          description="Autonomous subtasks completed"
        />

        <Metric
          icon={<ShieldCheck />}
          label="VERIFICATION RATE"
          value={`${verificationRate}%`}
          description="Agent outputs successfully verified"
        />

        <Metric
          icon={<Wallet />}
          label="CRD SETTLED"
          value={`${totalSpent} CRD`}
          description="Credits released after verification"
        />

        <Metric
          icon={<TrendingUp />}
          label="CRD REMAINING"
          value={`${remaining} CRD`}
          description={`From ${agentBudget} CRD agent budget`}
        />
      </div>

      {/* PERFORMANCE */}

      <div style={section}>
        <p style={eyebrow}>PERFORMANCE</p>
        <h2>Agent Performance</h2>

        {results.length === 0 ? (
          <div style={emptyBox}>
            No mission analytics available yet.
            Launch a mission to generate live data.
          </div>
        ) : (
          <div style={agentGrid}>
            {results.map((item, index) => {
              const score =
                item.verification?.score ?? 0;

              return (
                <div
                  key={item.subtask_id || index}
                  style={agentCard}
                >
                  <div style={agentTop}>
                    <div>
                      <p style={smallLabel}>
                        SPECIALIST AGENT
                      </p>

                      <h3 style={{ margin: "5px 0" }}>
                        {item.agent}
                      </h3>
                    </div>

                    <span
                      style={{
                        ...statusBadge,
                        color:
                          item.verification?.passed
                            ? "#4ce5ad"
                            : "#ff6873",
                      }}
                    >
                      {item.verification?.passed
                        ? "VERIFIED"
                        : "FAILED"}
                    </span>
                  </div>

                  <div style={scoreRow}>
                    <span>Verification</span>
                    <strong>{score}/100</strong>
                  </div>

                  <div style={barBackground}>
                    <div
                      style={{
                        ...barFill,
                        width: `${score}%`,
                        background:
                          score >= 70
                            ? "#42e6ac"
                            : "#ff626c",
                      }}
                    />
                  </div>

                  <div style={details}>
                    <span>Winning Bid</span>
                    <strong>{item.bid} CRD</strong>
                  </div>

                  <div style={details}>
                    <span>Status</span>
                    <strong>
                      {item.status || "UNKNOWN"}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ZERO TRUST */}

      <div style={securityBox}>
        <AlertTriangle size={24} />

        <div>
          <strong>
            ZERO-TRUST ANALYTICS
          </strong>

          <p style={{ margin: "6px 0 0" }}>
            Only independently verified agent work contributes
            to successful settlement metrics. Failed work is
            rejected before payment.
          </p>
        </div>
      </div>
    </div>
  );
}


/* =========================
   COMPONENT
========================= */

function Metric({
  icon,
  label,
  value,
  description,
}) {
  return (
    <div style={metricCard}>
      <div style={metricIcon}>
        {icon}
      </div>

      <p style={smallLabel}>
        {label}
      </p>

      <h2
        style={{
          fontSize: "30px",
          margin: "8px 0",
        }}
      >
        {value}
      </h2>

      <p style={metricDescription}>
        {description}
      </p>
    </div>
  );
}


/* =========================
   STYLES
========================= */

const backButton = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid #00d8e5",
  background: "transparent",
  color: "#00e5f0",
  padding: "10px 15px",
  cursor: "pointer",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginTop: "38px",
  marginBottom: "30px",
  gap: "25px",
};

const title = {
  fontSize: "48px",
  margin: "5px 0",
};

const subtitle = {
  color: "#829ba2",
  marginTop: "8px",
};

const eyebrow = {
  color: "#00dbe7",
  fontFamily: "monospace",
  fontSize: "11px",
  letterSpacing: "2px",
};

const liveBadge = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid #31584d",
  background: "#13231e",
  color: "#4ce5ad",
  padding: "12px 16px",
  fontFamily: "monospace",
  fontSize: "11px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const metricCard = {
  border: "1px solid #293b40",
  background: "#121819",
  padding: "22px",
};

const metricIcon = {
  width: "42px",
  height: "42px",
  display: "grid",
  placeItems: "center",
  border: "1px solid #00aab6",
  color: "#00dce8",
  marginBottom: "18px",
};

const smallLabel = {
  color: "#758b91",
  fontFamily: "monospace",
  fontSize: "10px",
  letterSpacing: "1px",
};

const metricDescription = {
  color: "#71878d",
  fontSize: "12px",
  margin: 0,
};

const section = {
  marginTop: "35px",
};

const emptyBox = {
  marginTop: "18px",
  border: "1px solid #293b40",
  background: "#121819",
  padding: "35px",
  color: "#789097",
};

const agentGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "14px",
  marginTop: "18px",
};

const agentCard = {
  border: "1px solid #293b40",
  background: "#121819",
  padding: "22px",
};

const agentTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
};

const statusBadge = {
  fontFamily: "monospace",
  fontSize: "10px",
  fontWeight: "bold",
};

const scoreRow = {
  display: "flex",
  justifyContent: "space-between",
  color: "#91a4a9",
  fontSize: "12px",
  marginTop: "22px",
};

const barBackground = {
  height: "5px",
  background: "#273236",
  marginTop: "8px",
};

const barFill = {
  height: "100%",
};

const details = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "17px",
  color: "#83979c",
  fontSize: "12px",
};

const securityBox = {
  display: "flex",
  gap: "15px",
  alignItems: "flex-start",
  border: "1px solid #34584e",
  background: "#13221e",
  color: "#4ce5ad",
  padding: "20px",
  marginTop: "30px",
};

export default Analytics;