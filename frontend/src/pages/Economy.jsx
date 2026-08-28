import {
  ArrowLeft,
  Wallet,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Activity,
} from "lucide-react";

function Economy({ mission, onBack }) {
  const backend = mission?.backendResult || {};
  const results = backend?.results || [];

  const agentBudget = Number(mission?.agentBudget || 100);

  const totalReleased = results.reduce(
    (sum, result) => sum + Number(result?.bid || 0),
    0
  );

  const verifiedCount = results.filter(
    (result) => result?.verification?.passed
  ).length;

  const remaining = Math.max(agentBudget - totalReleased, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#090d0e",
        color: "#f4f4f4",
        padding: "36px 4%",
      }}
    >
      {/* BACK */}
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          border: "1px solid #00d7e6",
          color: "#00e5ff",
          padding: "11px 16px",
          cursor: "pointer",
          marginBottom: "42px",
        }}
      >
        <ArrowLeft size={16} />
        BACK TO OVERVIEW
      </button>

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "35px",
        }}
      >
        <div>
          <div style={labelStyle}>AUTONOMOUS AGENT ECONOMY</div>

          <h1
            style={{
              fontSize: "52px",
              margin: "8px 0",
            }}
          >
            Economy
          </h1>

          <p style={descriptionStyle}>
            Escrow protects mission funds and releases payment only
            after successful independent verification.
          </p>
        </div>

        <StatusBox
          icon={<Activity size={17} />}
          text="ECONOMY ACTIVE"
        />
      </div>

      {/* NO MISSION */}
      {!mission ? (
        <div style={panelStyle}>
          <Wallet size={30} color="#00e5ff" />

          <div>
            <div style={labelStyle}>NO MISSION ECONOMY</div>

            <h2>No settlement data available</h2>

            <p style={descriptionStyle}>
              Create and complete a mission to generate escrow and
              settlement transactions.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* ECONOMY OVERVIEW */}
          <section style={panelStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                marginBottom: "28px",
              }}
            >
              <div style={iconBoxStyle}>
                <Wallet size={26} />
              </div>

              <div>
                <div style={labelStyle}>MISSION ECONOMY</div>
                <h2 style={{ margin: "5px 0 0" }}>
                  Settlement Overview
                </h2>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                borderTop: "1px solid #303a3d",
                borderBottom: "1px solid #303a3d",
              }}
            >
              <EconomyMetric
                label="AGENT BUDGET"
                value={`${agentBudget} CRD`}
              />

              <EconomyMetric
                label="TOTAL RELEASED"
                value={`${totalReleased} CRD`}
              />

              <EconomyMetric
                label="VERIFIED TASKS"
                value={`${verifiedCount}/${results.length}`}
              />

              <EconomyMetric
                label="REMAINING"
                value={`${remaining} CRD`}
              />
            </div>
          </section>

          {/* ESCROW LEDGER */}
          <section
            style={{
              ...panelStyle,
              marginTop: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "20px",
                borderBottom: "1px solid #303a3d",
              }}
            >
              <div>
                <div style={labelStyle}>ESCROW LEDGER</div>

                <h2 style={{ margin: "6px 0 0" }}>
                  Transaction History
                </h2>
              </div>

              <Coins size={27} color="#00e5ff" />
            </div>

            {results.length === 0 ? (
              <p style={descriptionStyle}>
                No settlement transactions available.
              </p>
            ) : (
              results.map((result, index) => (
                <LedgerRow
                  key={
                    result?.transaction_id ||
                    result?.subtask_id ||
                    index
                  }
                  type={
                    index === 0
                      ? "FLIGHT"
                      : index === 1
                      ? "HOTEL"
                      : "ACTIVITY"
                  }
                  agent={result?.agent || "Specialist Agent"}
                  amount={`${result?.bid || 0} CRD`}
                  score={
                    result?.verification?.score ?? "—"
                  }
                  status={
                    result?.verification?.passed
                      ? "RELEASED"
                      : "BLOCKED"
                  }
                />
              ))
            )}
          </section>

          {/* PAYMENT RULE */}
          <section
            style={{
              marginTop: "28px",
              border: "1px solid #245a4c",
              background: "#14201d",
              padding: "22px 25px",
              display: "flex",
              gap: "17px",
              alignItems: "center",
            }}
          >
            <ShieldCheck
              size={28}
              color="#42e6ac"
            />

            <div>
              <strong>VERIFIED WORK → PAYMENT RELEASED</strong>

              <p
                style={{
                  ...descriptionStyle,
                  margin: "5px 0 0",
                }}
              >
                Funds remain protected in escrow until the
                independent verifier approves the autonomous
                agent's output.
              </p>
            </div>
          </section>

          {/* FLOW */}
          <section
            style={{
              marginTop: "28px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
            }}
          >
            <FlowBox
              icon={<Coins />}
              number="01"
              title="BID ACCEPTED"
              text="Agent wins specialist task"
            />

            <FlowBox
              icon={<Lock />}
              number="02"
              title="ESCROW LOCKED"
              text="Reward protected during execution"
            />

            <FlowBox
              icon={<ShieldCheck />}
              number="03"
              title="VERIFIED"
              text="Independent trust layer checks output"
            />

            <FlowBox
              icon={<CheckCircle2 />}
              number="04"
              title="SETTLED"
              text="Payment released to trusted agent"
            />
          </section>
        </>
      )}
    </div>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

function EconomyMetric({ label, value }) {
  return (
    <div
      style={{
        padding: "24px",
        borderRight: "1px solid #303a3d",
      }}
    >
      <div style={labelStyle}>{label}</div>

      <strong
        style={{
          display: "block",
          fontSize: "25px",
          marginTop: "12px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function LedgerRow({
  type,
  agent,
  amount,
  score,
  status,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr 160px",
        gap: "20px",
        alignItems: "center",
        padding: "18px 0",
        borderBottom: "1px solid #303a3d",
      }}
    >
      <span style={labelStyle}>{type}</span>

      <div>
        <strong>{agent}</strong>

        <div
          style={{
            color: "#8da9b2",
            marginTop: "5px",
            fontSize: "13px",
          }}
        >
          {amount} · Verification {score}/100
        </div>
      </div>

      <strong
        style={{
          color:
            status === "RELEASED"
              ? "#42e6ac"
              : "#ff626c",
          textAlign: "right",
          fontFamily: "monospace",
          fontSize: "12px",
        }}
      >
        {status}
      </strong>
    </div>
  );
}

function FlowBox({ icon, number, title, text }) {
  return (
    <div
      style={{
        border: "1px solid #314247",
        background: "#151a1b",
        padding: "22px",
      }}
    >
      <div
        style={{
          color: "#00e5ff",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <div style={labelStyle}>STEP {number}</div>

      <strong
        style={{
          display: "block",
          margin: "8px 0",
        }}
      >
        {title}
      </strong>

      <span
        style={{
          color: "#8da9b2",
          fontSize: "13px",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function StatusBox({ icon, text }) {
  return (
    <div
      style={{
        border: "1px solid #00aeba",
        color: "#00e5ff",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "9px",
        fontFamily: "monospace",
        fontWeight: "bold",
      }}
    >
      {icon}
      {text}
    </div>
  );
}

/* =====================================================
   SHARED STYLES
===================================================== */

const panelStyle = {
  border: "1px solid #314247",
  background: "#151a1b",
  padding: "28px",
};

const iconBoxStyle = {
  width: "58px",
  height: "58px",
  border: "1px solid #00d7e6",
  color: "#00e5ff",
  display: "grid",
  placeItems: "center",
};

const labelStyle = {
  color: "#78949c",
  fontFamily: "monospace",
  fontSize: "11px",
  letterSpacing: "1.5px",
};

const descriptionStyle = {
  color: "#8da9b2",
  fontSize: "14px",
};

export default Economy;