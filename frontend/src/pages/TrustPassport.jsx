import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";

function TrustPassport({ onBack }) {
  const agents = [
    {
      name: "ATLAS-01",
      type: "LOGISTICS AGENT",
      trust: "ELITE",
      trustClass: "elite",
      score: 98,
      completed: 142,
      success: "99.3%",
      disputes: 0,
      performance: "0.8s",
      history: [
        { text: "Mission completed", time: "2m ago", success: true },
        { text: "Verification passed", time: "18m ago", success: true },
        { text: "Mission completed", time: "41m ago", success: true },
      ],
    },
    {
      name: "NOVA-07",
      type: "RESEARCH AGENT",
      trust: "TRUSTED",
      trustClass: "trusted",
      score: 94,
      completed: 118,
      success: "97.8%",
      disputes: 1,
      performance: "1.2s",
      history: [
        { text: "Mission completed", time: "5m ago", success: true },
        { text: "Verification passed", time: "29m ago", success: true },
        { text: "Mission completed", time: "1h ago", success: true },
      ],
    },
    {
      name: "CIPHER-12",
      type: "SECURITY AGENT",
      trust: "ELITE",
      trustClass: "elite",
      score: 99,
      completed: 201,
      success: "99.7%",
      disputes: 0,
      performance: "0.6s",
      history: [
        { text: "Verification passed", time: "3m ago", success: true },
        { text: "Mission completed", time: "22m ago", success: true },
        { text: "Mission completed", time: "56m ago", success: true },
      ],
    },
    {
      name: "ORBIT-04",
      type: "ANALYSIS AGENT",
      trust: "TRUSTED",
      trustClass: "trusted",
      score: 91,
      completed: 97,
      success: "96.4%",
      disputes: 2,
      performance: "1.5s",
      history: [
        { text: "Mission completed", time: "8m ago", success: true },
        { text: "Verification passed", time: "37m ago", success: true },
        { text: "Dispute resolved", time: "2h ago", success: false },
      ],
    },
    {
      name: "VECTOR-09",
      type: "FINANCE AGENT",
      trust: "RELIABLE",
      trustClass: "reliable",
      score: 87,
      completed: 84,
      success: "94.1%",
      disputes: 3,
      performance: "1.8s",
      history: [
        { text: "Mission completed", time: "12m ago", success: true },
        { text: "Verification passed", time: "44m ago", success: true },
        { text: "Dispute resolved", time: "3h ago", success: false },
      ],
    },
    {
      name: "ECHO-21",
      type: "COMMS AGENT",
      trust: "TRUSTED",
      trustClass: "trusted",
      score: 93,
      completed: 126,
      success: "98.2%",
      disputes: 1,
      performance: "1.1s",
      history: [
        { text: "Mission completed", time: "4m ago", success: true },
        { text: "Verification passed", time: "31m ago", success: true },
        { text: "Mission completed", time: "1h ago", success: true },
      ],
    },
  ];

  return (
    <div className="passport-app">

      {/* TOP BAR */}
      <header className="passport-topbar">

        <button className="passport-back" onClick={onBack}>
          <ArrowLeft size={15} />
          BACK TO OVERVIEW
        </button>

        <div className="passport-title">
          <ShieldCheck size={17} />
          AGENT TRUST PASSPORT
        </div>

        <div className="passport-network">
          <span className="network-dot"></span>
          NETWORK VERIFIED
        </div>

      </header>

      {/* MAIN */}
      <main className="passport-main">

        {/* HEADER */}
        <section className="passport-header">

          <div>
            <div className="passport-label">
              TRUST & REPUTATION NETWORK
            </div>

            <h1>Agent Trust Passport</h1>

            <p>
              Verify agent identities, reputation scores, mission history
              and settlement reliability before deploying capital.
            </p>
          </div>

          <div className="passport-summary">

            <div>
              <span>VERIFIED AGENTS</span>
              <strong>156</strong>
            </div>

            <div>
              <span>NETWORK TRUST</span>
              <strong>97.4%</strong>
            </div>

            <div>
              <span>DISPUTES</span>
              <strong>07</strong>
            </div>

          </div>

        </section>

        {/* AGENTS */}
        <section className="passport-agents">

          {agents.map((agent) => (
            <article
              className="passport-agent-card"
              key={agent.name}
            >

              {/* AGENT HEADER */}
              <div className="passport-agent-top">

                <div className="passport-agent-icon">
                  <ShieldCheck size={19} />
                </div>

                <div className="passport-agent-name">
                  <h2>{agent.name}</h2>
                  <span>{agent.type}</span>
                </div>

                <div className={`trust-level ${agent.trustClass}`}>
                  <ShieldCheck size={10} />
                  {agent.trust}
                </div>

              </div>

              {/* SCORE */}
              <div className="passport-score">

                <div className="score-heading">
                  <span>TRUST SCORE</span>
                  <strong>{agent.score}</strong>
                </div>

                <div className="score-track">
                  <div
                    className="score-fill"
                    style={{ width: `${agent.score}%` }}
                  ></div>
                </div>

              </div>

              {/* STATS */}
              <div className="passport-stats">

                <div>
                  <strong>{agent.completed}</strong>
                  <span>MISSIONS</span>
                </div>

                <div>
                  <strong>{agent.success}</strong>
                  <span>SUCCESS</span>
                </div>

                <div>
                  <strong>{agent.disputes}</strong>
                  <span>DISPUTES</span>
                </div>

              </div>

              {/* PERFORMANCE */}
              <div className="passport-performance">

                <div>
                  <span>AVG RESPONSE</span>
                  <strong>{agent.performance}</strong>
                </div>

                <div>
                  <span>STATUS</span>
                  <strong>VERIFIED</strong>
                </div>

              </div>

              {/* HISTORY */}
              <div className="passport-history">

                <div className="history-heading">
                  RECENT VERIFICATION HISTORY
                </div>

                {agent.history.map((item, index) => (
                  <div
                    className={`history-line ${
                      item.success ? "" : "failed"
                    }`}
                    key={index}
                  >

                    {item.success ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <XCircle size={12} />
                    )}

                    <span>{item.text}</span>

                    <small>{item.time}</small>

                  </div>
                ))}

              </div>

              {/* VIEW BUTTON */}
              <button className="passport-view">
                VIEW FULL PASSPORT
                <ExternalLink size={12} />
              </button>

            </article>
          ))}

        </section>

      </main>
    </div>
  );
}

export default TrustPassport;