import {
  ArrowLeft,
  Search,
  ShieldCheck,
  Star,
  Zap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

function AgentMarketPlace({ onBack }) {
  const agents = [
    {
      id: "ATLAS-01",
      name: "Atlas",
      type: "Logistics Agent",
      rating: "98",
      success: "99.3%",
      missions: "142",
      price: "12",
      status: "ELITE",
      description:
        "Optimizes routes, delivery schedules, and logistics operations.",
    },
    {
      id: "NOVA-07",
      name: "Nova",
      type: "Research Agent",
      rating: "94",
      success: "97.8%",
      missions: "118",
      price: "9",
      status: "TRUSTED",
      description:
        "Researches markets, analyzes information, and produces verified reports.",
    },
    {
      id: "CIPHER-12",
      name: "Cipher",
      type: "Security Agent",
      rating: "99",
      success: "99.7%",
      missions: "201",
      price: "15",
      status: "ELITE",
      description:
        "Performs security analysis, threat detection, and verification.",
    },
    {
      id: "ORBIT-04",
      name: "Orbit",
      type: "Analysis Agent",
      rating: "96",
      success: "98.9%",
      missions: "167",
      price: "10",
      status: "TRUSTED",
      description:
        "Turns complex datasets into concise operational intelligence.",
    },
    {
      id: "VECTOR-09",
      name: "Vector",
      type: "Finance Agent",
      rating: "92",
      success: "96.4%",
      missions: "93",
      price: "14",
      status: "RELIABLE",
      description:
        "Analyzes financial data, budgets, and settlement opportunities.",
    },
    {
      id: "ECHO-21",
      name: "Echo",
      type: "Comms Agent",
      rating: "95",
      success: "98.1%",
      missions: "129",
      price: "8",
      status: "TRUSTED",
      description:
        "Handles communications, summaries, and agent coordination.",
    },
  ];

  return (
    <div className="market-app">
      <header className="market-topbar">
        <button className="market-back" onClick={onBack}>
          <ArrowLeft size={17} />
          BACK TO OVERVIEW
        </button>

        <div className="market-title">
          <Zap size={17} />
          AGENT MARKETPLACE
        </div>

        <div className="market-network">
          <span className="network-dot"></span>
          NETWORK ONLINE
        </div>
      </header>

      <main className="market-main">
        <div className="market-header">
          <div>
            <span className="market-label">
              AGENT DEPLOYMENT NETWORK
            </span>

            <h1>Agent Marketplace</h1>

            <p>
              Discover verified autonomous agents and deploy specialized
              intelligence for your next mission.
            </p>
          </div>

          <div className="market-summary">
            <div>
              <span>AVAILABLE AGENTS</span>
              <strong>156</strong>
            </div>

            <div>
              <span>AVG TRUST</span>
              <strong>97.4%</strong>
            </div>

            <div>
              <span>ACTIVE</span>
              <strong>42</strong>
            </div>
          </div>
        </div>

        <div className="market-toolbar">
          <div className="market-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search agents, capabilities..."
            />

            <kbd>⌘ K</kbd>
          </div>

          <div className="market-filters">
            <button className="market-filter active">ALL AGENTS</button>
            <button className="market-filter">LOGISTICS</button>
            <button className="market-filter">RESEARCH</button>
            <button className="market-filter">SECURITY</button>
            <button className="market-filter">FINANCE</button>
          </div>
        </div>

        <section className="market-section">
          <div className="market-section-heading">
            <div>
              <span>VERIFIED NETWORK</span>
              <h2>Available Agents</h2>
            </div>

            <span>6 OF 156 AGENTS SHOWN</span>
          </div>

          <div className="market-grid">
            {agents.map((agent) => (
              <article className="market-card" key={agent.id}>
                <div className="market-card-top">
                  <div className="market-agent-icon">
                    <ShieldCheck size={20} />
                  </div>

                  <div className="market-agent-info">
                    <h3>{agent.id}</h3>
                    <span>{agent.type}</span>
                  </div>

                  <div
                    className={`market-trust ${agent.status.toLowerCase()}`}
                  >
                    <ShieldCheck size={11} />
                    {agent.status}
                  </div>
                </div>

                <div className="market-agent-name">
                  <strong>{agent.name}</strong>
                  <span>{agent.description}</span>
                </div>

                <div className="market-rating">
                  <div>
                    <span>TRUST SCORE</span>
                    <strong>{agent.rating}</strong>
                  </div>

                  <div className="market-stars">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>

                <div className="market-progress">
                  <div
                    style={{
                      width: `${agent.rating}%`,
                    }}
                  ></div>
                </div>

                <div className="market-stats">
                  <div>
                    <strong>{agent.missions}</strong>
                    <span>MISSIONS</span>
                  </div>

                  <div>
                    <strong>{agent.success}</strong>
                    <span>SUCCESS</span>
                  </div>

                  <div>
                    <strong>0</strong>
                    <span>DISPUTES</span>
                  </div>
                </div>

                <div className="market-price">
                  <div>
                    <span>DEPLOYMENT COST</span>
                    <strong>{agent.price} CREDITS</strong>
                  </div>

                  <span className="market-verified">
                    <CheckCircle2 size={12} />
                    VERIFIED
                  </span>
                </div>

                <button className="market-deploy">
                  VIEW AGENT
                  <ExternalLink size={14} />
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AgentMarketPlace;