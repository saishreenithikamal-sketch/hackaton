import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Bot,
  ShieldCheck,
  Coins,
  ChevronRight,
  Radio,
} from "lucide-react";

function LiveMissions({ mission, onBack, onOpenMission }) {
  // =====================================================
  // MISSION DATA
  // =====================================================

  const backend = mission?.backendResult || {};
  const results = backend?.results || [];

  const origin = mission?.origin || "—";
  const destination = mission?.destination || "—";
  const duration = mission?.duration || "—";

  const tripId =
    mission?.tripId ||
    backend?.trip_id ||
    "—";

  const completedCount = results.filter(
    (result) => result?.status === "COMPLETED"
  ).length;

  const verifiedCount = results.filter(
    (result) => result?.verification?.passed
  ).length;

  const totalRewards = results.reduce(
    (sum, result) => sum + Number(result?.bid || 0),
    0
  );

  const missionComplete =
    results.length > 0 &&
    completedCount === results.length;

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#090d0e",
        color: "#f4f4f4",
        padding: "38px 4%",
        fontFamily: "inherit",
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          color: "#00e5ff",
          border: "1px solid #00d7e6",
          padding: "11px 17px",
          cursor: "pointer",
          marginBottom: "42px",
        }}
      >
        <ArrowLeft size={16} />
        BACK TO OVERVIEW
      </button>

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "30px",
          marginBottom: "34px",
        }}
      >
        <div>
          <div
            style={{
              color: "#8aa9b2",
              fontFamily: "monospace",
              letterSpacing: "2px",
              fontSize: "12px",
              marginBottom: "10px",
            }}
          >
            AUTONOMOUS OPERATIONS
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "52px",
              lineHeight: 1,
            }}
          >
            Live Missions
          </h1>

          <p
            style={{
              color: "#8da9b2",
              marginTop: "14px",
              fontSize: "15px",
            }}
          >
            Monitor autonomous missions, specialist agents,
            verification and financial settlement.
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
          <Radio size={17} />
          MISSION NETWORK ACTIVE
        </div>
      </section>

      {/* =================================================
          NO MISSION
      ================================================= */}

      {!mission ? (
        <section
          style={{
            border: "1px solid #314247",
            background: "#151a1b",
            padding: "45px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "62px",
              height: "62px",
              border: "1px solid #00d7e6",
              display: "grid",
              placeItems: "center",
              color: "#00e5ff",
            }}
          >
            <Activity size={28} />
          </div>

          <div>
            <div
              style={{
                color: "#829da5",
                fontFamily: "monospace",
                letterSpacing: "2px",
                fontSize: "11px",
              }}
            >
              NO ACTIVE MISSION
            </div>

            <h2 style={{ margin: "8px 0" }}>
              No mission has been deployed yet
            </h2>

            <p
              style={{
                color: "#8da9b2",
                margin: 0,
              }}
            >
              Create a new trip from the Overview to deploy
              the autonomous agent team.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* =============================================
              MISSION CARD
          ============================================= */}

          <section
            style={{
              border: "1px solid #315158",
              background: "#151a1b",
              padding: "30px",
            }}
          >
            {/* CARD HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "20px",
                paddingBottom: "25px",
                borderBottom: "1px solid #303a3d",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    border: "1px solid #00d7e6",
                    display: "grid",
                    placeItems: "center",
                    color: "#00e5ff",
                  }}
                >
                  <MapPin size={25} />
                </div>

                <div>
                  <div
                    style={{
                      color: "#829da5",
                      fontFamily: "monospace",
                      fontSize: "11px",
                      letterSpacing: "1.6px",
                      marginBottom: "7px",
                    }}
                  >
                    MISSION #{tripId}
                  </div>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "30px",
                    }}
                  >
                    {origin} → {destination}
                  </h2>

                  <p
                    style={{
                      margin: "8px 0 0",
                      color: "#8da9b2",
                    }}
                  >
                    {duration} DAYS · AUTONOMOUS AGENT MISSION
                  </p>
                </div>
              </div>

              <div
                style={{
                  border: `1px solid ${
                    missionComplete ? "#00c98b" : "#00d7e6"
                  }`,
                  color: missionComplete
                    ? "#42e6ac"
                    : "#00e5ff",
                  padding: "10px 14px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {missionComplete
                  ? "● MISSION COMPLETED"
                  : "● MISSION ACTIVE"}
              </div>
            </div>

            {/* =============================================
                METRICS
            ============================================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1px",
                background: "#303a3d",
                marginTop: "25px",
                border: "1px solid #303a3d",
              }}
            >
              <MissionMetric
                icon={<Bot size={18} />}
                label="SPECIALIST TASKS"
                value={`${completedCount}/${results.length}`}
              />

              <MissionMetric
                icon={<ShieldCheck size={18} />}
                label="VERIFIED"
                value={`${verifiedCount}/${results.length}`}
              />

              <MissionMetric
                icon={<Coins size={18} />}
                label="SETTLED"
                value={`${totalRewards} CRD`}
              />

              <MissionMetric
                icon={<CheckCircle2 size={18} />}
                label="STATUS"
                value={
                  missionComplete
                    ? "COMPLETE"
                    : "ACTIVE"
                }
              />
            </div>

            {/* =============================================
                AGENT EXECUTION SUMMARY
            ============================================= */}

            {results.length > 0 && (
              <div
                style={{
                  marginTop: "28px",
                }}
              >
                <div
                  style={{
                    color: "#829da5",
                    fontFamily: "monospace",
                    fontSize: "11px",
                    letterSpacing: "1.6px",
                    marginBottom: "13px",
                  }}
                >
                  DEPLOYED SPECIALISTS
                </div>

                {results.map((result, index) => (
                  <div
                    key={
                      result?.subtask_id ||
                      result?.agent ||
                      index
                    }
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "80px 1fr 130px 130px",
                      gap: "15px",
                      alignItems: "center",
                      padding: "14px 0",
                      borderBottom:
                        "1px solid #303a3d",
                    }}
                  >
                    <span
                      style={{
                        color: "#718d95",
                        fontFamily: "monospace",
                        fontSize: "11px",
                      }}
                    >
                      TASK {index + 1}
                    </span>

                    <div>
                      <strong>
                        {result?.agent ||
                          "Specialist Agent"}
                      </strong>

                      <div
                        style={{
                          color: "#8da9b2",
                          marginTop: "4px",
                          fontSize: "13px",
                        }}
                      >
                        Bid {result?.bid ?? 0} CRD
                      </div>
                    </div>

                    <div>
                      <span
                        style={{
                          color: "#718d95",
                          fontSize: "10px",
                          fontFamily: "monospace",
                        }}
                      >
                        VERIFICATION
                      </span>

                      <div
                        style={{
                          marginTop: "4px",
                          fontWeight: "bold",
                        }}
                      >
                        {result?.verification?.score ??
                          "—"}
                        /100
                      </div>
                    </div>

                    <div
                      style={{
                        color:
                          result?.verification?.passed
                            ? "#42e6ac"
                            : "#ff626c",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        fontSize: "11px",
                        textAlign: "right",
                      }}
                    >
                      {result?.verification?.passed
                        ? "VERIFIED"
                        : "FAILED"}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* =============================================
                OPEN BUTTON
            ============================================= */}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "28px",
              }}
            >
              <button
                type="button"
                onClick={onOpenMission}
                style={{
                  background: "#00d7e6",
                  border: "none",
                  color: "#001012",
                  padding: "14px 20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                OPEN MISSION CONTROL
                <ChevronRight size={18} />
              </button>
            </div>
          </section>

          {/* =============================================
              SECURITY / ESCROW MESSAGE
          ============================================= */}

          <section
            style={{
              marginTop: "24px",
              border: "1px solid #245a4c",
              background: "#14201d",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <ShieldCheck
              size={25}
              color="#42e6ac"
            />

            <div>
              <strong>
                ZERO TRUST → VERIFY → THEN PAY
              </strong>

              <p
                style={{
                  color: "#8da9b2",
                  margin: "5px 0 0",
                  fontSize: "13px",
                }}
              >
                Specialist outputs are independently
                verified before escrow settlement is
                authorized.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function MissionMetric({ icon, label, value }) {
  return (
    <div
      style={{
        background: "#151a1b",
        padding: "22px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#00e5ff",
          marginBottom: "12px",
        }}
      >
        {icon}

        <span
          style={{
            color: "#78949c",
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "1px",
          }}
        >
          {label}
        </span>
      </div>

      <strong
        style={{
          fontSize: "23px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

export default LiveMissions;