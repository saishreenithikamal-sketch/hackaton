import {
  ArrowLeft,
  ShieldCheck,
  Bot,
  Plane,
  Hotel,
  Zap,
  AlertTriangle,
  Activity,
  CheckCircle2,
} from "lucide-react";

function TrustReputation({ onBack }) {
  const agents = [
    {
      name: "FlightBot-A",
      type: "FLIGHT SPECIALIST",
      reputation: 96,
      reliability: 98,
      status: "TRUSTED",
      icon: <Plane size={20} />,
    },
    {
      name: "FlightBot-B",
      type: "FLIGHT SPECIALIST",
      reputation: 88,
      reliability: 91,
      status: "TRUSTED",
      icon: <Plane size={20} />,
    },
    {
      name: "HotelBot-A",
      type: "HOTEL SPECIALIST",
      reputation: 95,
      reliability: 97,
      status: "TRUSTED",
      icon: <Hotel size={20} />,
    },
    {
      name: "ActivityBot-A",
      type: "ACTIVITY SPECIALIST",
      reputation: 93,
      reliability: 96,
      status: "TRUSTED",
      icon: <Zap size={20} />,
    },
  ];

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
          gap: "30px",
          marginBottom: "35px",
        }}
      >
        <div>
          <div style={labelStyle}>
            ZERO-TRUST AGENT NETWORK
          </div>

          <h1
            style={{
              fontSize: "52px",
              margin: "8px 0",
            }}
          >
            Trust & Reputation
          </h1>

          <p style={descriptionStyle}>
            Autonomous agents earn marketplace trust through
            successful execution, independent verification and
            reliable behaviour.
          </p>
        </div>

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
          <ShieldCheck size={18} />
          TRUST LAYER ACTIVE
        </div>
      </div>

      {/* TRUST ENGINE */}
      <section style={panelStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div style={iconBoxStyle}>
            <ShieldCheck size={28} />
          </div>

          <div>
            <div style={labelStyle}>
              REPUTATION ENGINE
            </div>

            <h2 style={{ margin: "5px 0" }}>
              Trust-Aware Agent Selection
            </h2>

            <p
              style={{
                ...descriptionStyle,
                margin: 0,
              }}
            >
              Marketplace decisions consider reputation,
              reliability and verification history — not only
              the lowest bid.
            </p>
          </div>
        </div>
      </section>

      {/* TRUSTED AGENTS */}
      <div
        style={{
          marginTop: "34px",
          marginBottom: "13px",
        }}
      >
        <div style={labelStyle}>TRUSTED NETWORK</div>
        <h2 style={{ margin: "6px 0" }}>
          Agent Reputation
        </h2>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "14px",
        }}
      >
        {agents.map((agent) => (
          <AgentTrustCard
            key={agent.name}
            {...agent}
          />
        ))}
      </section>

      {/* ROGUE AGENT */}
      <section
        style={{
          ...panelStyle,
          marginTop: "32px",
          border: "1px solid #ff4d57",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "18px",
            }}
          >
            <div
              style={{
                ...iconBoxStyle,
                borderColor: "#ff4d57",
                color: "#ff626c",
              }}
            >
              <AlertTriangle size={27} />
            </div>

            <div>
              <div style={labelStyle}>
                SECURITY WATCHLIST
              </div>

              <h2
                style={{
                  margin: "5px 0",
                }}
              >
                HotelBot-Rogue
              </h2>

              <p
                style={{
                  ...descriptionStyle,
                  margin: 0,
                }}
              >
                Malicious agent detected submitting suspicious
                or unverified hotel data.
              </p>
            </div>
          </div>

          <span
            style={{
              color: "#ff626c",
              border: "1px solid #ff4d57",
              padding: "8px 12px",
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "11px",
            }}
          >
            FLAGGED
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            marginTop: "27px",
            borderTop: "1px solid #483235",
            borderBottom: "1px solid #483235",
          }}
        >
          <TrustMetric
            label="REPUTATION"
            value="0%"
            danger
          />

          <TrustMetric
            label="RELIABILITY"
            value="18%"
            danger
          />

          <TrustMetric
            label="TYPICAL BID"
            value="5 CRD"
            danger
          />

          <TrustMetric
            label="TRUST STATUS"
            value="PENALIZED"
            danger
          />
        </div>

        <div
          style={{
            marginTop: "22px",
            background: "#211719",
            border: "1px solid #67363a",
            padding: "18px",
            display: "flex",
            gap: "13px",
            alignItems: "center",
          }}
        >
          <AlertTriangle
            size={22}
            color="#ff626c"
          />

          <div>
            <strong style={{ color: "#ff626c" }}>
              TRUST PENALTY ACTIVE
            </strong>

            <p
              style={{
                ...descriptionStyle,
                margin: "5px 0 0",
              }}
            >
              A cheap bid cannot override poor trust,
              verification failures or fraudulent behaviour.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST PIPELINE */}
      <section
        style={{
          marginTop: "30px",
          border: "1px solid #245a4c",
          background: "#14201d",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <CheckCircle2
            size={27}
            color="#42e6ac"
          />

          <div>
            <strong>
              EXECUTE → VERIFY → UPDATE TRUST → SELECT BETTER
            </strong>

            <p
              style={{
                ...descriptionStyle,
                margin: "5px 0 0",
              }}
            >
              Verification outcomes influence future marketplace
              decisions, creating accountability between
              autonomous agents.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =====================================================
   TRUSTED AGENT CARD
===================================================== */

function AgentTrustCard({
  name,
  type,
  reputation,
  reliability,
  status,
  icon,
}) {
  return (
    <div
      style={{
        border: "1px solid #31594e",
        background: "#151a1b",
        padding: "22px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            background: "#1b2325",
            color: "#00e5ff",
            display: "grid",
            placeItems: "center",
          }}
        >
          {icon}
        </div>

        <span
          style={{
            color: "#42e6ac",
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      </div>

      <h3
        style={{
          margin: "20px 0 5px",
        }}
      >
        {name}
      </h3>

      <div style={descriptionStyle}>
        {type}
      </div>

      <div
        style={{
          marginTop: "28px",
        }}
      >
        <div style={labelStyle}>
          REPUTATION
        </div>

        <strong
          style={{
            display: "block",
            fontSize: "24px",
            marginTop: "7px",
          }}
        >
          {reputation}%
        </strong>

        <TrustBar value={reputation} />
      </div>

      <div
        style={{
          marginTop: "22px",
        }}
      >
        <div style={labelStyle}>
          RELIABILITY
        </div>

        <strong
          style={{
            display: "block",
            fontSize: "24px",
            marginTop: "7px",
          }}
        >
          {reliability}%
        </strong>

        <TrustBar value={reliability} />
      </div>
    </div>
  );
}

function TrustBar({ value }) {
  return (
    <div
      style={{
        height: "4px",
        background: "#263033",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          background: "#00d7e6",
        }}
      />
    </div>
  );
}

function TrustMetric({
  label,
  value,
  danger,
}) {
  return (
    <div
      style={{
        padding: "22px",
        borderRight: "1px solid #483235",
      }}
    >
      <div style={labelStyle}>{label}</div>

      <strong
        style={{
          display: "block",
          marginTop: "9px",
          fontSize: "22px",
          color: danger
            ? "#ff626c"
            : "#f4f4f4",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* =====================================================
   STYLES
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

export default TrustReputation;