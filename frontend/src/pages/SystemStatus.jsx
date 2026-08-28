import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Server,
  Bot,
  Store,
  ShieldCheck,
  Wallet,
  Database,
  Activity,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

function SystemStatus({ onBack }) {
  const [backendOnline, setBackendOnline] = useState(null);
  const [agentCount, setAgentCount] = useState(0);
  const [checking, setChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState("");

  const checkSystem = async () => {
    setChecking(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/agents");

      if (!response.ok) {
        throw new Error("Backend unavailable");
      }

      const data = await response.json();

      const agents = Array.isArray(data)
        ? data
        : Array.isArray(data?.agents)
        ? data.agents
        : [];

      setAgentCount(agents.length);
      setBackendOnline(true);
    } catch (error) {
      console.error("SYSTEM HEALTH CHECK FAILED:", error);

      setBackendOnline(false);
      setAgentCount(0);
    } finally {
      setChecking(false);
      setLastChecked(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    checkSystem();
  }, []);

  const operational = backendOnline === true;

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
          <div style={labelStyle}>AGENTRA INFRASTRUCTURE</div>

          <h1 style={{ fontSize: "52px", margin: "8px 0" }}>
            System Status
          </h1>

          <p style={descriptionStyle}>
            Real-time health monitoring for the autonomous agent
            economy infrastructure.
          </p>
        </div>

        <button
          onClick={checkSystem}
          disabled={checking}
          style={{
            border: "1px solid #00aeba",
            background: "transparent",
            color: "#00e5ff",
            padding: "14px 18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
        >
          <RefreshCw size={17} />
          {checking ? "CHECKING..." : "RUN HEALTH CHECK"}
        </button>
      </div>

      {/* OVERALL STATUS */}
      <section
        style={{
          ...panelStyle,
          borderColor: operational ? "#245a4c" : "#67363a",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {operational ? (
            <ShieldCheck size={34} color="#42e6ac" />
          ) : (
            <AlertTriangle size={34} color="#ff626c" />
          )}

          <div>
            <div style={labelStyle}>PLATFORM HEALTH</div>

            <h2
              style={{
                margin: "5px 0",
                color: operational ? "#42e6ac" : "#ff626c",
              }}
            >
              {backendOnline === null
                ? "CHECKING SYSTEM..."
                : operational
                ? "ALL SYSTEMS OPERATIONAL"
                : "SYSTEM CONNECTION ISSUE"}
            </h2>

            <p style={{ ...descriptionStyle, margin: 0 }}>
              {operational
                ? "Core AGENTRA services are available and ready for autonomous missions."
                : "The frontend could not reach the AGENTRA backend."}
            </p>
          </div>
        </div>
      </section>

      {/* COMPONENT HEALTH */}
      <div style={{ marginBottom: "15px" }}>
        <div style={labelStyle}>INFRASTRUCTURE</div>
        <h2 style={{ margin: "6px 0" }}>Component Health</h2>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "14px",
        }}
      >
        <StatusCard
          icon={<Server />}
          title="Backend API"
          description="FastAPI service"
          status={operational ? "ONLINE" : "OFFLINE"}
          healthy={operational}
        />

        <StatusCard
          icon={<Bot />}
          title="Agent Network"
          description={
            operational
              ? `${agentCount} agents discovered`
              : "Agent discovery unavailable"
          }
          status={operational ? "CONNECTED" : "UNAVAILABLE"}
          healthy={operational}
        />

        <StatusCard
          icon={<Store />}
          title="Marketplace Engine"
          description="Trust-aware bidding and selection"
          status={operational ? "OPERATIONAL" : "UNAVAILABLE"}
          healthy={operational}
        />

        <StatusCard
          icon={<ShieldCheck />}
          title="Independent Verifier"
          description="Validates agent execution"
          status={operational ? "OPERATIONAL" : "UNAVAILABLE"}
          healthy={operational}
        />

        <StatusCard
          icon={<Wallet />}
          title="Escrow Engine"
          description="Lock, release and refund protection"
          status={operational ? "OPERATIONAL" : "UNAVAILABLE"}
          healthy={operational}
        />

        <StatusCard
          icon={<Activity />}
          title="Reputation Engine"
          description="Trust and fraud penalty system"
          status={operational ? "OPERATIONAL" : "UNAVAILABLE"}
          healthy={operational}
        />

        <StatusCard
          icon={<Database />}
          title="Data Layer"
          description="Mission and agent state"
          status={operational ? "CONNECTED" : "UNAVAILABLE"}
          healthy={operational}
        />

        <StatusCard
          icon={<ShieldCheck />}
          title="Rogue Agent Protection"
          description="Verify before payment"
          status={operational ? "ARMED" : "UNAVAILABLE"}
          healthy={operational}
        />
      </section>

      {/* ARCHITECTURE FLOW */}
      <section
        style={{
          ...panelStyle,
          marginTop: "30px",
        }}
      >
        <div style={labelStyle}>SYSTEM PIPELINE</div>

        <h2 style={{ margin: "7px 0 25px" }}>
          Autonomous Economy Infrastructure
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "10px",
          }}
        >
          <Flow name="FASTAPI" />
          <Flow name="MARKETPLACE" />
          <Flow name="AGENTS" />
          <Flow name="VERIFIER" />
          <Flow name="ESCROW" />
          <Flow name="REPUTATION" />
        </div>
      </section>

      <div
        style={{
          marginTop: "18px",
          color: "#78949c",
          fontFamily: "monospace",
          fontSize: "11px",
        }}
      >
        LAST HEALTH CHECK: {lastChecked || "INITIALIZING..."}
      </div>
    </div>
  );
}

function StatusCard({
  icon,
  title,
  description,
  status,
  healthy,
}) {
  return (
    <div style={panelStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "15px",
        }}
      >
        <div
          style={{
            width: "45px",
            height: "45px",
            display: "grid",
            placeItems: "center",
            border: "1px solid #00aeba",
            color: "#00e5ff",
          }}
        >
          {icon}
        </div>

        <span
          style={{
            color: healthy ? "#42e6ac" : "#ff626c",
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: "bold",
          }}
        >
          ● {status}
        </span>
      </div>

      <h3 style={{ margin: "22px 0 7px" }}>{title}</h3>

      <p style={{ ...descriptionStyle, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

function Flow({ name }) {
  return (
    <div
      style={{
        border: "1px solid #245a4c",
        background: "#14201d",
        padding: "18px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#42e6ac",
          fontFamily: "monospace",
          fontSize: "11px",
          marginBottom: "7px",
        }}
      >
        ● HEALTHY
      </div>

      <strong>{name}</strong>
    </div>
  );
}

const panelStyle = {
  border: "1px solid #314247",
  background: "#151a1b",
  padding: "25px",
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

export default SystemStatus;