import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import LaunchMission from "./pages/LaunchMission";
import LiveMissionControl from "./pages/LiveMissionControl";
import LiveMissions from "./pages/LiveMissions";
import AgentMarketplace from "./pages/AgentMarketplace";
import Economy from "./pages/Economy";
import TrustReputation from "./pages/TrustReputation";
import SystemStatus from "./pages/SystemStatus";
import SettingsPage from "./pages/SettingsPage";

import "./App.css";

function App() {
  const [screen, setScreen] = useState("dashboard");
  const [activeMission, setActiveMission] = useState(null);

  // =====================================================
  // HANDLE NEW MISSION
  // =====================================================
  const handleLaunch = (mission) => {
    console.log("APP RECEIVED MISSION:", mission);

    setActiveMission(mission);
    setScreen("live");
  };

  // =====================================================
  // CREATE TRIP
  // =====================================================
  if (screen === "launch") {
    return (
      <LaunchMission
        onBack={() => setScreen("dashboard")}
        onLaunch={handleLaunch}
      />
    );
  }

  // =====================================================
  // LIVE MISSION CONTROL
  // =====================================================
  if (screen === "live") {
    return (
      <LiveMissionControl
        mission={activeMission}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // =====================================================
  // LIVE MISSIONS
  // =====================================================
  if (screen === "missions") {
    return (
      <LiveMissions
        mission={activeMission}
        onBack={() => setScreen("dashboard")}
        onOpenMission={() => setScreen("live")}
      />
    );
  }

  // =====================================================
  // AGENT MARKETPLACE
  // =====================================================
  if (screen === "market") {
    return (
      <AgentMarketplace
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // =====================================================
  // ECONOMY
  // =====================================================
  if (screen === "economy") {
    return (
      <Economy
        mission={activeMission}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // =====================================================
  // TRUST & REPUTATION
  // =====================================================
  if (screen === "trust") {
    return (
      <TrustReputation
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // =====================================================
  // SYSTEM STATUS
  // =====================================================
  if (screen === "status") {
    return (
      <SystemStatus
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // =====================================================
  // SETTINGS
  // =====================================================
  if (screen === "settings") {
    return (
      <SettingsPage
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================
  return (
    <Dashboard
      onNavigate={(destination) => {
        if (destination === "launch") {
          setScreen("launch");
        }

        if (destination === "missions") {
          setScreen("missions");
        }

        if (destination === "market") {
          setScreen("market");
        }

        if (destination === "economy") {
          setScreen("economy");
        }

        if (destination === "trust") {
          setScreen("trust");
        }

        if (destination === "status") {
          setScreen("status");
        }

        if (destination === "settings") {
          setScreen("settings");
        }
      }}
    />
  );
}

export default App;