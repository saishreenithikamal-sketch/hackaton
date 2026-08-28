import { useState } from "react";

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
  ShieldCheck,
  Wallet,
  AlertTriangle,
  Radio,
  Zap,
} from "lucide-react";


function LiveMissionControl({ onBack, mission }) {

  const [attackLoading, setAttackLoading] = useState(false);
  const [attackResult, setAttackResult] = useState(null);

  const backend = mission?.backendResult || {};
  const results = backend?.results || [];

  const origin = mission?.origin || "Origin";
  const destination = mission?.destination || "Destination";
  const duration = mission?.duration || "—";
  const startDate = mission?.startDate || "—";

  const tripId =
    mission?.tripId ||
    backend?.trip_id ||
    "—";

  const travelBudget =
    Number(mission?.travelBudget || 0);

  const agentBudget =
    Number(mission?.agentBudget || 0);


  // ============================================================
  // NORMAL MISSION RESULTS
  // ============================================================

  const flightResult = results[0];
  const hotelResult = results[1];
  const activityResult = results[2];

  const completedCount = results.filter(
    (result) => result?.status === "COMPLETED"
  ).length;

  const verifiedCount = results.filter(
    (result) =>
      result?.verification?.passed === true
  ).length;

  const totalRewards = results.reduce(
    (sum, result) =>
      sum + Number(result?.bid || 0),
    0
  );


  // ============================================================
  // ATTACK SIMULATION
  // ============================================================

  const simulateAttack = async () => {

    setAttackLoading(true);

    const attackData = {
      name: "Demo User",
      source: mission?.origin || "Chennai",
      destination: mission?.destination || "Mumbai",
      days: Number(mission?.duration || 3),
      travel_budget: Number(
        mission?.travelBudget || 30000
      ),
      agent_budget: Number(
        mission?.agentBudget || 100
      ),
    };

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/demo/attack",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(attackData),
        }
      );

      if (!response.ok) {

        const text = await response.text();

        console.error(
          "ATTACK BACKEND ERROR:",
          response.status,
          text
        );

        throw new Error(
          `Attack failed: ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        "ATTACK RESULT:",
        data
      );

      setAttackResult(data);

    } catch (error) {

      console.error(error);

      alert(
        "Could not run rogue agent simulation."
      );

    } finally {

      setAttackLoading(false);
    }
  };


  // ============================================================
  // AGENT CARDS
  // ============================================================

  const agents = [

    {
      name: "FLIGHT AGENT",

      type:
        flightResult?.agent ||
        "Travel Specialist",

      icon: <Plane />,

      status:
        flightResult?.status ||
        "QUEUED",

      task:
        `Finding optimal ${origin} → ${destination} flights`,

      result: flightResult
        ? flightResult.verification?.passed
          ? `Verified · Score ${flightResult.verification.score}`
          : "Verification failed"
        : "Waiting for execution",

      reward: flightResult
        ? `${flightResult.bid} CRD`
        : "—",
    },


    {
      name: "HOTEL AGENT",

      type:
        hotelResult?.agent ||
        "Accommodation Specialist",

      icon: <Hotel />,

      status:
        hotelResult?.status ||
        "QUEUED",

      task:
        `Finding accommodation in ${destination} for ${duration} days`,

      result: hotelResult
        ? hotelResult.verification?.passed
          ? `Verified · Score ${hotelResult.verification.score}`
          : "Verification failed"
        : "Waiting for execution",

      reward: hotelResult
        ? `${hotelResult.bid} CRD`
        : "—",
    },


    {
      name: "ACTIVITY AGENT",

      type:
        activityResult?.agent ||
        "Experience Specialist",

      icon: <Zap />,

      status:
        activityResult?.status ||
        "QUEUED",

      task:
        `Finding activities and experiences in ${destination}`,

      result: activityResult
        ? activityResult.verification?.passed
          ? `Verified · Score ${activityResult.verification.score}`
          : "Verification failed"
        : "Waiting for execution",

      reward: activityResult
        ? `${activityResult.bid} CRD`
        : "—",
    },


    {
      name: "VERIFIER AGENT",

      type: "Independent Trust Layer",

      icon: <ShieldCheck />,

      status:
        verifiedCount === results.length &&
        results.length > 0
          ? "COMPLETED"
          : "VERIFYING",

      task:
        "Independently auditing specialist agent outputs",

      result:
        results.length > 0
          ? `${verifiedCount}/${results.length} outputs verified`
          : "Waiting for outputs",

      reward: "—",
    },


    {
      name: "BUDGET AGENT",

      type:
        "Financial & Escrow Specialist",

      icon: <Wallet />,

      status:
        backend?.status === "COMPLETED"
          ? "COMPLETED"
          : "VERIFYING",

      task:
        "Managing escrow and settlement",

      result:
        `${totalRewards} CRD settled`,

      reward:
        `${totalRewards} CRD`,
    },
  ];


  const progress =
    backend?.status === "COMPLETED"
      ? 100
      : 64;


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

            <strong>
              #AG-{tripId}
            </strong>

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
                  AUTONOMOUS MISSION / #AG-{tripId}
                </div>

                <h1>
                  {origin} → {destination}
                </h1>

                <p>
                  {duration} DAYS · {startDate} · AUTONOMOUS AGENTS
                </p>

              </div>


              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                }}
              >

                <button
                  type="button"
                  onClick={simulateAttack}
                  disabled={attackLoading}
                  style={{
                    padding: "12px 18px",
                    border: "1px solid #ff4d4d",
                    background:
                      "rgba(255,77,77,0.08)",
                    color: "#ff6b6b",
                    cursor:
                      attackLoading
                        ? "wait"
                        : "pointer",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                  }}
                >

                  <AlertTriangle size={15} />

                  {attackLoading
                    ? "SIMULATING ATTACK..."
                    : "SIMULATE ROGUE AGENT"}

                </button>


                <div className="mission-live">

                  <span className="live-dot"></span>

                  {backend?.status === "COMPLETED"
                    ? "MISSION COMPLETED"
                    : "MISSION ACTIVE"}

                </div>

              </div>

            </div>


            {/* PROGRESS */}

            <section className="progress-card">

              <div className="progress-header">

                <div>

                  <span>
                    MISSION PROGRESS
                  </span>

                  <strong>
                    {progress}%
                  </strong>

                </div>

                <div className="progress-time">

                  <Clock3 size={15} />

                  {backend?.status === "COMPLETED"
                    ? "Execution complete"
                    : "Agents working"}

                </div>

              </div>


              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>


              <div className="progress-stages">

                <span className="done">
                  REQUEST
                </span>

                <span className="done">
                  DECOMPOSITION
                </span>

                <span className="done">
                  AGENT EXECUTION
                </span>

                <span className="done">
                  VERIFICATION
                </span>

                <span className="done">
                  SETTLEMENT
                </span>

              </div>

            </section>


            {/* ================================================= */}
            {/* REAL ATTACK REPORT */}
            {/* ================================================= */}

            {attackResult && (() => {

              const attack =
                attackResult.result;

              return (

                <section
                  className="boss-card"
                  style={{
                    border:
                      "1px solid #ff4d4d",
                    marginBottom: "24px",
                  }}
                >

                  <div className="boss-icon">
                    <AlertTriangle />
                  </div>


                  <div className="boss-content">


                    <div className="boss-heading">

                      <div>

                        <span className="section-kicker">
                          SECURITY INCIDENT
                        </span>

                        <h2>
                          ROGUE AGENT DETECTED
                        </h2>

                      </div>


                      <span
                        className="boss-status"
                        style={{
                          color: "#ff6b6b",
                        }}
                      >
                        ATTACK BLOCKED
                      </span>

                    </div>


                    {/* ROGUE AGENT */}

                    <div
                      style={{
                        marginTop: "20px",
                        padding: "16px",
                        border:
                          "1px solid rgba(255,77,77,0.35)",
                      }}
                    >

                      <span className="section-kicker">
                        MALICIOUS AGENT
                      </span>

                      <h3
                        style={{
                          marginTop: "6px",
                        }}
                      >
                        {attack.attacking_agent}
                      </h3>

                      <p>
                        Submitted fake hotel data with a
                        suspicious bid of{" "}
                        <strong>
                          {attack.attack.bid} CRD
                        </strong>.
                      </p>

                    </div>


                    {/* ATTACK METRICS */}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "12px",
                        marginTop: "16px",
                      }}
                    >

                      <AttackMetric
                        label="VERIFICATION"
                        value={`${attack.verification.score} / 100 ❌`}
                      />

                      <AttackMetric
                        label="ESCROW"
                        value={
                          attack.payment.escrow_status
                        }
                      />

                      <AttackMetric
                        label="AGENT PAID"
                        value={
                          attack.payment.agent_paid
                            ? "YES"
                            : "NO — BLOCKED"
                        }
                      />

                      <AttackMetric
                        label="ROGUE RECEIVED"
                        value={`${attack.wallet_protection.money_received_by_rogue} CRD`}
                      />

                    </div>


                    {/* REJECTION REASON */}

                    <div
                      style={{
                        marginTop: "14px",
                        padding: "14px",
                        border:
                          "1px solid rgba(255,77,77,0.25)",
                      }}
                    >

                      <strong>
                        VERIFIER REASON
                      </strong>

                      <p>
                        {attack.verification.reason}
                      </p>

                    </div>


                    {/* TRUST PENALTY */}

                    <div
                      style={{
                        marginTop: "18px",
                        padding: "16px",
                        border:
                          "1px solid rgba(255,193,7,0.35)",
                      }}
                    >

                      <span className="section-kicker">
                        TRUST & REPUTATION PENALTY
                      </span>


                      <div
                        style={{
                          display: "flex",
                          gap: "30px",
                          flexWrap: "wrap",
                          marginTop: "12px",
                        }}
                      >

                        <strong>

                          Reputation:{" "}

                          {Number(
                            attack.trust_update
                              .reputation_before
                          ).toFixed(2)}

                          {" → "}

                          {Number(
                            attack.trust_update
                              .reputation_after
                          ).toFixed(2)}

                        </strong>


                        <strong>

                          Fraud Flags:{" "}

                          {
                            attack.trust_update
                              .fraud_flags_before
                          }

                          {" → "}

                          {
                            attack.trust_update
                              .fraud_flags_after
                          }

                        </strong>


                        <strong>

                          Marketplace Score:{" "}

                          {Number(
                            attack.trust_update
                              .marketplace_score_before
                          ).toFixed(2)}

                          {" → "}

                          {Number(
                            attack.trust_update
                              .marketplace_score_after
                          ).toFixed(2)}

                        </strong>

                      </div>

                    </div>


                    {/* RECOVERY DIVIDER */}

                    <div
                      style={{
                        textAlign: "center",
                        margin: "24px 0",
                        fontWeight: "800",
                        color: "#00e5ff",
                        letterSpacing: "1px",
                      }}
                    >

                      ↓ AUTOMATIC RECOVERY TRIGGERED ↓

                    </div>


                    {/* RECOVERY AGENT */}

                    <div
                      style={{
                        padding: "18px",
                        border:
                          "1px solid #00e5ff",
                      }}
                    >

                      <span className="section-kicker">
                        TRUSTED REPLACEMENT AGENT
                      </span>

                      <h3
                        style={{
                          marginTop: "6px",
                        }}
                      >

                        {
                          attack.recovery
                            .replacement_agent
                        }

                      </h3>


                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(180px, 1fr))",
                          gap: "12px",
                          marginTop: "16px",
                        }}
                      >

                        <AttackMetric
                          label="WINNING BID"
                          value={`${attack.recovery.replacement_bid} CRD`}
                        />

                        <AttackMetric
                          label="VERIFICATION"
                          value={`${attack.recovery.verification.score} / 100 ✓`}
                        />

                        <AttackMetric
                          label="ESCROW"
                          value={
                            attack.recovery.payment
                              .escrow_status
                          }
                        />

                        <AttackMetric
                          label="AGENT PAID"
                          value={
                            attack.recovery.payment
                              .agent_paid
                              ? "YES ✓"
                              : "NO"
                          }
                        />

                      </div>


                      <p
                        style={{
                          marginTop: "14px",
                        }}
                      >

                        {
                          attack.recovery
                            .verification.reason
                        }

                      </p>

                    </div>


                    {/* FINAL */}

                    <div
                      style={{
                        marginTop: "20px",
                        padding: "18px",
                        border:
                          "1px solid #00e5ff",
                        textAlign: "center",
                      }}
                    >

                      <h2>
                        ZERO TRUST → VERIFY → THEN PAY
                      </h2>

                      <strong>
                        {attack.final_status}
                      </strong>

                    </div>


                  </div>

                </section>

              );

            })()}


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

                    <h2>
                      BOSS AGENT
                    </h2>

                  </div>


                  <span className="boss-status">

                    {backend?.status === "COMPLETED"
                      ? "MISSION COMPLETE"
                      : "COORDINATING"}

                  </span>

                </div>


                <p>
                  Mission decomposed into specialist tasks.
                  Agents competed for work, outputs were
                  independently verified, and verified tasks
                  were settled through escrow.
                </p>

              </div>


              <div className="boss-metrics">

                <div>

                  <span>
                    TASKS
                  </span>

                  <strong>
                    {results.length}
                  </strong>

                </div>


                <div>

                  <span>
                    COMPLETED
                  </span>

                  <strong>
                    {completedCount}
                  </strong>

                </div>

              </div>

            </section>


            {/* SPECIALIZED WORKFORCE */}

            <div className="section-heading">

              <div>

                <span>
                  DEPLOYED AGENTS
                </span>

                <h2>
                  Specialized Workforce
                </h2>

              </div>

              <span>
                {agents.length} AGENTS
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

                    <span>
                      LIVE FEED
                    </span>

                    <h2>
                      Agent Activity
                    </h2>

                  </div>

                  <span className="live-label">
                    ● LIVE
                  </span>

                </div>


                <ActivityRow
                  time="STEP 1"
                  agent="BOSS AGENT"
                  message={`Mission decomposed for ${origin} → ${destination}`}
                  status="DONE"
                />


                {flightResult && (

                  <ActivityRow
                    time="STEP 2"
                    agent={
                      flightResult.agent ||
                      "FLIGHT AGENT"
                    }
                    message={`Won flight task with bid ${flightResult.bid} CRD`}
                    status={
                      flightResult.verification?.passed
                        ? "VERIFIED"
                        : "FAILED"
                    }
                  />

                )}


                {hotelResult && (

                  <ActivityRow
                    time="STEP 3"
                    agent={
                      hotelResult.agent ||
                      "HOTEL AGENT"
                    }
                    message={`Won hotel task with bid ${hotelResult.bid} CRD`}
                    status={
                      hotelResult.verification?.passed
                        ? "VERIFIED"
                        : "FAILED"
                    }
                  />

                )}


                {activityResult && (

                  <ActivityRow
                    time="STEP 4"
                    agent={
                      activityResult.agent ||
                      "ACTIVITY AGENT"
                    }
                    message={`Won activity task with bid ${activityResult.bid} CRD`}
                    status={
                      activityResult.verification?.passed
                        ? "VERIFIED"
                        : "FAILED"
                    }
                  />

                )}


                <ActivityRow
                  time="STEP 5"
                  agent="ESCROW"
                  message={`${totalRewards} CRD released after verification`}
                  status="SETTLED"
                />


                {attackResult && (

                  <>

                    <ActivityRow
                      time="ATTACK"
                      agent={
                        attackResult.result
                          .attacking_agent
                      }
                      message="Malicious hotel result submitted"
                      status="BLOCKED"
                    />


                    <ActivityRow
                      time="VERIFY"
                      agent="TRUST LAYER"
                      message={`Rejected with score ${attackResult.result.verification.score}/100`}
                      status="FAILED"
                    />


                    <ActivityRow
                      time="ESCROW"
                      agent="SETTLEMENT"
                      message="Payment blocked and escrow refunded"
                      status="REFUNDED"
                    />


                    <ActivityRow
                      time="RECOVER"
                      agent={
                        attackResult.result
                          .recovery
                          .replacement_agent
                      }
                      message={`Recovery passed with score ${attackResult.result.recovery.verification.score}/100`}
                      status="RECOVERED"
                    />

                  </>

                )}

              </section>


              {/* VERIFICATION */}

              <section className="verification-card">

                <div className="card-heading">

                  <div>

                    <span>
                      TRUST LAYER
                    </span>

                    <h2>
                      Verification
                    </h2>

                  </div>

                  <ShieldCheck />

                </div>


                <div className="verification-status">

                  <CheckCircle2 />

                  <div>

                    <strong>
                      {verifiedCount} TASKS VERIFIED
                    </strong>

                    <p>
                      Independent verifier audited agent outputs.
                    </p>

                  </div>

                </div>


                {attackResult && (

                  <div className="verification-warning">

                    <AlertTriangle size={17} />

                    <span>
                      Rogue output rejected.
                      Automatic recovery completed.
                    </span>

                  </div>

                )}


                <button>
                  ZERO TRUST · VERIFY THEN PAY
                </button>

              </section>

            </div>


            {/* BUDGET */}

            <section className="budget-card">

              <div className="budget-heading">

                <div>

                  <span>
                    MISSION ECONOMY
                  </span>

                  <h2>
                    Budget & Settlements
                  </h2>

                </div>

                <Coins />

              </div>


              <div className="budget-metrics">

                <Metric
                  label="TRAVEL BUDGET"
                  value={`$${travelBudget.toLocaleString()}`}
                />

                <Metric
                  label="AGENT BUDGET"
                  value={`${agentBudget} CRD`}
                />

                <Metric
                  label="AGENT REWARDS"
                  value={`${totalRewards} CRD`}
                />

                <Metric
                  label="REMAINING AGENT BUDGET"
                  value={`${Math.max(
                    agentBudget - totalRewards,
                    0
                  )} CRD`}
                />

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}


// ============================================================
// AGENT CARD
// ============================================================

function AgentCard({ agent }) {

  const statusClass =
    agent.status
      .toLowerCase()
      .replaceAll(" ", "-");

  return (

    <div
      className={`agent-card ${statusClass}`}
    >

      <div className="agent-card-top">

        <div className="agent-icon">
          {agent.icon}
        </div>

        <span
          className={`agent-status ${statusClass}`}
        >
          {agent.status}
        </span>

      </div>


      <h3>
        {agent.name}
      </h3>

      <span className="agent-type">
        {agent.type}
      </span>


      <div className="agent-task">

        <span>
          CURRENT TASK
        </span>

        <p>
          {agent.task}
        </p>

      </div>


      <div className="agent-result">

        <span>
          OUTPUT
        </span>

        <strong>
          {agent.result}
        </strong>

      </div>


      <div className="agent-reward">

        <span>
          REWARD
        </span>

        <strong>
          {agent.reward}
        </strong>

      </div>

    </div>
  );
}


// ============================================================
// ACTIVITY ROW
// ============================================================

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

        <strong>
          {agent}
        </strong>

        <span>
          {message}
        </span>

      </div>


      <span className="activity-status">
        {status}
      </span>

    </div>
  );
}


// ============================================================
// NORMAL METRIC
// ============================================================

function Metric({
  label,
  value,
}) {

  return (

    <div className="budget-metric">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


// ============================================================
// ATTACK METRIC
// ============================================================

function AttackMetric({
  label,
  value,
}) {

  return (

    <div
      style={{
        padding: "12px",
        border:
          "1px solid rgba(255,255,255,0.15)",
      }}
    >

      <span
        style={{
          display: "block",
          fontSize: "11px",
          opacity: 0.7,
          marginBottom: "6px",
        }}
      >
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


export default LiveMissionControl;