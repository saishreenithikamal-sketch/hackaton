import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import LaunchMission from "./pages/LaunchMission";
import LiveMissionControl from "./pages/LiveMissionControl";
import TrustPassport from "./pages/TrustPassport";
import AgentMarketPlace from "./pages/AgentMarketPlace";
import Economy from "./pages/Economy";
import SystemStatus from "./pages/SystemStatus";

import "./App.css";

function App() {
  const [screen, setScreen] = useState("dashboard");

  const handleLaunch = (mission) => {
    console.log("Mission launched:", mission);
    setScreen("live");
  };

  // CREATE / LAUNCH MISSION
  if (screen === "launch") {
    return (
      <LaunchMission
        onBack={() => setScreen("dashboard")}
        onLaunch={handleLaunch}
      />
    );
  }

  // LIVE MISSION CONTROL
  if (screen === "live") {
    return (
      <LiveMissionControl
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // AGENT TRUST PASSPORT
  if (screen === "trust") {
    return (
      <TrustPassport
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // AGENT MARKETPLACE
  if (screen === "marketplace") {
    return (
      <AgentMarketPlace
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // ECONOMY
if (screen === "economy") {
  return (
    <Economy
      onBack={() => setScreen("dashboard")}
    />
  );
}

// SYSTEM STATUS
if (screen === "system") {
  return (
    <SystemStatus
      onBack={() => setScreen("dashboard")}
    />
  );
}


  // DASHBOARD
  return (
    <Dashboard
      onNavigate={(destination) => {
        if (destination === "launch") {
          setScreen("launch");
        }

        if (destination === "trust") {
          setScreen("trust");
        }

        if (destination === "marketplace") {
          setScreen("marketplace");
        }

        if (destination === "economy") {
          setScreen("economy");
        }

        if (destination === "system") {
          setScreen("system");
        }


      }}
    />
  );
}

export default App;