import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import LaunchMission from "./pages/LaunchMission";
import LiveMissionControl from "./pages/LiveMissionControl";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("dashboard");

  const handleLaunch = (mission) => {
  console.log("Mission launched:", mission);

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