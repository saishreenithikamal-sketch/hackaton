import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import LaunchMission from "./pages/LaunchMission";
import LiveMissionControl from "./pages/LiveMissionControl";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("dashboard");

  const [activeMission, setActiveMission] = useState(null);

  const handleLaunch = (mission) => {
    console.log("APP RECEIVED MISSION:", mission);

    setActiveMission(mission);

    setScreen("live");
  };

  if (screen === "launch") {
    return (
      <LaunchMission
        onBack={() => setScreen("dashboard")}
        onLaunch={handleLaunch}
      />
    );
  }

  if (screen === "live") {
    return (
      <LiveMissionControl
        mission={activeMission}
        onBack={() => setScreen("dashboard")}
      />
    );
  }

  return (
    <Dashboard
      onNavigate={(destination) => {
        if (destination === "launch") {
          setScreen("launch");
        }
      }}
    />
  );
}

export default App;