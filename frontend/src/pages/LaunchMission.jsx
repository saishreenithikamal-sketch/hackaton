import { useState } from "react";

import {
  Activity,
  Search,
  Wallet,
  Bell,
  Settings,
  Plus,
  LayoutDashboard,
  Rocket,
  Bot,
  BarChart3,
  History,
  Target,
  Route,
  Clock3,
  Landmark,
  SlidersHorizontal,
  PlaneTakeoff,
  PlaneLanding,
  CheckCircle2,
  ArrowLeft,
  Info,
  Coins,
} from "lucide-react";

function LaunchMission({ onBack, onLaunch,onNavigate }) {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    startDate: "",
    duration: "",
    deadlineDate: "",
    deadlineTime: "",
    travelBudget: "",
    agentBudget: "",
    instructions: "",
  });

  const [preferences, setPreferences] = useState([
    "Eco-friendly",
  ]);

  // Update form fields
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Select / deselect preferences
  const togglePreference = (preference) => {
    setPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference]
    );
  };

  // ------------------------------------------------
  // LAUNCH MISSION + CONNECT TO FASTAPI BACKEND
  // ------------------------------------------------

  const launch = async (event) => {
    event.preventDefault();

    console.log("LAUNCH BUTTON CLICKED");

    // Check required fields
    if (
      !form.origin ||
      !form.destination ||
      !form.startDate ||
      !form.duration ||
      !form.travelBudget
    ) {
      alert("Please complete the required mission parameters.");
      return;
    }

    // Data expected by FastAPI
    const requestData = {
      name: "Demo User",
      source: form.origin,
      destination: form.destination,
      days: Number(form.duration),
      travel_budget: Number(form.travelBudget),
      agent_budget: Number(form.agentBudget || 100),
    };

    console.log("SENDING TO BACKEND:", requestData);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/trip/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("BACKEND ERROR:", errorText);

        throw new Error(
          `Backend request failed: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("BACKEND RESULT:", data);

      // Send form + backend result to App.jsx
      onLaunch?.({
        ...form,
        preferences,
        backendResult: data,
        tripId: data.trip_id,
        status: "deployed",
      });
    } catch (error) {
      console.error("MISSION ERROR:", error);

      alert(
        "Could not create the mission. Check the backend terminal."
      );
    }
  };

  return (
    <div className="mission-app">

      {/* TOP BAR */}
      <header className="mission-topbar">

        <div className="mission-brand">
          <Activity size={24} />
          <span>AGENTRA</span>
        </div>

        <div className="mission-search">
          <Search size={18} />
          <input
            placeholder="Search missions, agents, or logs..."
          />
          <kbd>⌘K</kbd>
        </div>

        <div className="mission-top-actions">

          <div className="credit-pill">
            <Wallet size={14} />
            942.50 CRD
          </div>

          <button className="top-icon">
            <Bell size={19} />
          </button>

          <button className="top-icon">
            <Settings size={19} />
          </button>

          <div className="profile">
            OP
          </div>

        </div>
      </header>

      <div className="mission-layout">

        {/* SIDEBAR */}
        <aside className="mission-sidebar">

          <button
            className="new-mission-button"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <Plus size={18} />
            NEW MISSION
          </button>

          <SidebarSection title="OPERATIONS">

            <SidebarItem
              icon={<LayoutDashboard />}
              label="Command Center"
              onClick={onBack}
            />

            <SidebarItem
              icon={<Rocket />}
              label="Active Missions"
              active
            />

            

          </SidebarSection>

          <SidebarSection title="INTELLIGENCE">

          <SidebarItem
            icon={<BarChart3 />}
            label="Analytics"
            onClick={() => onNavigate?.("analytics")}
          />


        </SidebarSection>

        </aside>

        {/* MAIN */}
        <main className="mission-main">

          <div className="mission-container">

            {/* HEADER */}
            <div className="mission-heading">

              <div className="heading-title">

                <button
                  className="back-button"
                  onClick={onBack}
                  type="button"
                >
                  <ArrowLeft size={19} />
                </button>

                <div>
                  <h1>Configure Mission</h1>

                  <p>
                    Define trip parameters. Autonomous agents will
                    handle scheduling, booking, and budget optimization.
                  </p>
                </div>

              </div>

            </div>

            {/* FLOW */}
            <MissionFlow />

            <form onSubmit={launch}>

              {/* ROUTE */}
              <section className="mission-card">

                <SectionTitle
                  icon={<Route />}
                  title="Route Parameters"
                />

                <div className="form-two-columns">

                  <Field
                    label="FROM (ORIGIN)"
                    icon={<PlaneTakeoff />}
                  >
                    <input
                      value={form.origin}
                      onChange={(e) =>
                        updateField(
                          "origin",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Chennai, India"
                    />
                  </Field>

                  <Field
                    label="TO (DESTINATION)"
                    icon={<PlaneLanding />}
                  >
                    <input
                      value={form.destination}
                      onChange={(e) =>
                        updateField(
                          "destination",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Mumbai, India"
                    />
                  </Field>

                </div>

              </section>

              {/* TIMING + FINANCIAL */}
              <div className="mission-two-column">

                <section className="mission-card">

                  <SectionTitle
                    icon={<Clock3 />}
                    title="Temporal Constraints"
                  />

                  <div className="form-two-columns">

                    <Field label="START DATE">
                      <input
                        type="date"
                        value={form.startDate}
                        onChange={(e) =>
                          updateField(
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    </Field>

                    <Field label="DURATION (DAYS)">

                      <div className="input-with-suffix">

                        <input
                          type="number"
                          min="1"
                          value={form.duration}
                          onChange={(e) =>
                            updateField(
                              "duration",
                              e.target.value
                            )
                          }
                          placeholder="3"
                        />

                        <span>DAYS</span>

                      </div>

                    </Field>

                    <div className="field full-width">

                      <label>
                        PLANNING DEADLINE (OPTIONAL)
                      </label>

                      <div className="deadline-row">

                        <input
                          type="date"
                          value={form.deadlineDate}
                          onChange={(e) =>
                            updateField(
                              "deadlineDate",
                              e.target.value
                            )
                          }
                        />

                        <input
                          type="time"
                          value={form.deadlineTime}
                          onChange={(e) =>
                            updateField(
                              "deadlineTime",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                  </div>

                </section>

                {/* FINANCIAL */}
                <section className="mission-card">

                  <SectionTitle
                    icon={<Landmark />}
                    title="Financial Allocations"
                  />

                  <div className="financial-fields">

                    <Field label="TRAVEL BUDGET">

                      <div className="currency-input">

                        <span>$</span>

                        <input
                          type="number"
                          value={form.travelBudget}
                          onChange={(e) =>
                            updateField(
                              "travelBudget",
                              e.target.value
                            )
                          }
                          placeholder="5000"
                        />

                        <small>USD</small>

                      </div>

                    </Field>

                    <Field
                      label="AGENT SERVICE BUDGET"
                      extra={<Info size={13} />}
                    >

                      <div className="currency-input">

                        <Coins size={15} />

                        <input
                          type="number"
                          value={form.agentBudget}
                          onChange={(e) =>
                            updateField(
                              "agentBudget",
                              e.target.value
                            )
                          }
                          placeholder="150"
                        />

                        <small>CRD</small>

                      </div>

                      <div className="available">
                        Avail: 942.50 CRD
                      </div>

                    </Field>

                  </div>

                </section>

              </div>

              {/* PREFERENCES */}
              <section className="mission-card">

                <SectionTitle
                  icon={<SlidersHorizontal />}
                  title="Optimization Preferences"
                />

                <div className="preference-chips">

                  {[
                    "Luxury",
                    "Eco-friendly",
                    "Fastest Route",
                    "Budget Priority",
                    "Non-stop Flights",
                  ].map((preference) => (

                    <button
                      type="button"
                      key={preference}
                      className={
                        preferences.includes(preference)
                          ? "preference active"
                          : "preference"
                      }
                      onClick={() =>
                        togglePreference(preference)
                      }
                    >

                      {preferences.includes(preference) && (
                        <CheckCircle2 size={14} />
                      )}

                      {preference}

                    </button>

                  ))}

                </div>

                <div className="field instructions">

                  <label>
                    CUSTOM INSTRUCTIONS (OPTIONAL)
                  </label>

                  <textarea
                    value={form.instructions}
                    onChange={(e) =>
                      updateField(
                        "instructions",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Prefer window seats, near city center hotels..."
                    rows={4}
                  />

                </div>

              </section>

              {/* LAUNCH */}
              <div className="launch-area">

                <button
                  className="launch-button"
                  type="submit"
                >
                  <Rocket size={20} />
                  LAUNCH AUTONOMOUS MISSION
                </button>

                <p>
                  <Activity size={14} />
                  You provide the goal. AGENTRA decides how the work gets done.
                </p>

              </div>

            </form>

          </div>

        </main>

      </div>

    </div>
  );
}


/* ---------------- COMPONENTS ---------------- */

function SidebarSection({ title, children }) {
  return (
    <div className="sidebar-section">

      <div className="sidebar-label">
        {title}
      </div>

      <div>
        {children}
      </div>

    </div>
  );
}


function SidebarItem({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


function SectionTitle({ icon, title }) {
  return (
    <div className="section-title">

      {icon}

      <h2>{title}</h2>

    </div>
  );
}


function Field({
  label,
  icon,
  extra,
  children,
}) {
  return (
    <div className="field">

      <label>
        {label}
        {extra}
      </label>

      <div
        className={`input-box ${
          icon ? "with-icon" : ""
        }`}
      >
        {icon}
        {children}
      </div>

    </div>
  );
}


function MissionFlow() {
  return (
    <div className="mission-flow">

      <FlowStep
        icon={<Target />}
        label="YOUR GOAL"
        active
      />

      <FlowLine active />

      <FlowStep
        icon={<Bot />}
        label="BOSS AGENT"
        active
      />

      <FlowLine />

      <FlowStep
        icon={<PlaneTakeoff />}
        label="FLIGHT + HOTEL + ACTIVITIES"
      />

      <FlowLine />

      <FlowStep
        icon={<CheckCircle2 />}
        label="VERIFIED TRIP"
      />

    </div>
  );
}


function FlowStep({
  icon,
  label,
  active,
}) {
  return (
    <div
      className={`flow-step ${
        active ? "active" : ""
      }`}
    >

      <div className="flow-icon">
        {icon}
      </div>

      <span>{label}</span>

    </div>
  );
}


function FlowLine({ active }) {
  return (
    <div
      className={`flow-line ${
        active ? "active" : ""
      }`}
    />
  );
}

export default LaunchMission;