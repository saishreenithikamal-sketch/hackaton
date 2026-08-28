import {
  Activity,
  ArrowLeft,
  Bot,
  Plane,
  Hotel,
  Zap,
  ShieldCheck,
  Store,
} from "lucide-react";

const agents = [
  {
    name: "FlightBot-A",
    type: "FLIGHT SPECIALIST",
    icon: <Plane />,
    reputation: "96%",
    reliability: "98%",
    cost: "15 CRD",
    status: "AVAILABLE",
  },
  {
    name: "FlightBot-B",
    type: "FLIGHT SPECIALIST",
    icon: <Plane />,
    reputation: "88%",
    reliability: "91%",
    cost: "13 CRD",
    status: "AVAILABLE",
  },
  {
    name: "HotelBot-A",
    type: "HOTEL SPECIALIST",
    icon: <Hotel />,
    reputation: "95%",
    reliability: "97%",
    cost: "15 CRD",
    status: "AVAILABLE",
  },
  {
    name: "HotelBot-Rogue",
    type: "HOTEL SPECIALIST",
    icon: <Hotel />,
    reputation: "0%",
    reliability: "18%",
    cost: "5 CRD",
    status: "FLAGGED",
  },
  {
    name: "ActivityBot-A",
    type: "ACTIVITY SPECIALIST",
    icon: <Zap />,
    reputation: "93%",
    reliability: "96%",
    cost: "10 CRD",
    status: "AVAILABLE",
  },
];

function AgentMarketplace({ onBack }) {
  return (
    <div className="control-app">

      <header className="control-topbar">

        <div className="control-brand">
          <Activity size={24} />
          <span>AGENTRA</span>
        </div>

        <div className="control-title">
          AGENT MARKETPLACE
        </div>

        <div className="control-credit">
          942.50 CRD
        </div>

      </header>

      <main
        className="control-main"
        style={{ marginLeft: 0 }}
      >
        <div className="control-container">

          <button
            className="control-back"
            onClick={onBack}
            style={{ marginBottom: "30px" }}
          >
            <ArrowLeft size={16} />
            BACK TO OVERVIEW
          </button>

          <div className="mission-header">

            <div>
              <div className="mission-kicker">
                DECENTRALIZED AGENT ECONOMY
              </div>

              <h1>Agent Marketplace</h1>

              <p>
                Specialist autonomous agents compete for
                tasks based on cost, trust and reliability.
              </p>
            </div>

            <div className="mission-live">
              <Store size={17} />
              MARKET ACTIVE
            </div>

          </div>

          <section className="boss-card">

            <div className="boss-icon">
              <Bot />
            </div>

            <div className="boss-content">

              <div className="boss-heading">
                <div>
                  <span className="section-kicker">
                    MARKETPLACE ENGINE
                  </span>

                  <h2>
                    Competitive Agent Selection
                  </h2>
                </div>

                <span className="boss-status">
                  {agents.length} AGENTS
                </span>
              </div>

              <p>
                Agents submit bids for specialist tasks.
                Selection considers reputation, reliability,
                performance and cost — not simply the
                cheapest bid.
              </p>

            </div>

          </section>

          <div
            className="agent-grid"
            style={{ marginTop: "26px" }}
          >

            {agents.map((agent) => {

              const flagged =
                agent.status === "FLAGGED";

              return (
                <div
                  className="agent-card completed"
                  key={agent.name}
                  style={
                    flagged
                      ? {
                          border:
                            "1px solid rgba(255,77,77,0.7)",
                        }
                      : undefined
                  }
                >

                  <div className="agent-card-top">

                    <div className="agent-icon">
                      {agent.icon}
                    </div>

                    <span
                      className="agent-status completed"
                      style={
                        flagged
                          ? { color: "#ff6b6b" }
                          : undefined
                      }
                    >
                      {agent.status}
                    </span>

                  </div>

                  <h3>{agent.name}</h3>

                  <span className="agent-type">
                    {agent.type}
                  </span>

                  <div className="agent-task">
                    <span>REPUTATION</span>
                    <p>{agent.reputation}</p>
                  </div>

                  <div className="agent-result">
                    <span>RELIABILITY</span>
                    <strong>
                      {agent.reliability}
                    </strong>
                  </div>

                  <div className="agent-reward">
                    <span>TYPICAL BID</span>
                    <strong>
                      {agent.cost}
                    </strong>
                  </div>

                  {flagged && (
                    <div
                      style={{
                        marginTop: "14px",
                        padding: "10px",
                        border:
                          "1px solid rgba(255,77,77,0.4)",
                        color: "#ff6b6b",
                      }}
                    >
                      <ShieldCheck size={15} />
                      TRUST PENALTY ACTIVE
                    </div>
                  )}

                </div>
              );
            })}

          </div>

          <section
            className="verification-card"
            style={{ marginTop: "26px" }}
          >
            <div className="verification-status">
              <ShieldCheck />

              <div>
                <strong>
                  TRUST-AWARE MARKETPLACE
                </strong>

                <p>
                  Low-cost malicious agents cannot win
                  simply by underbidding trusted agents.
                  Reputation and verification history affect
                  marketplace selection.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default AgentMarketplace;