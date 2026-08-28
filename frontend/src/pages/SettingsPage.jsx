import { useState } from "react";
import {
  ArrowLeft,
  Settings,
  ShieldCheck,
  Wallet,
  AlertTriangle,
  RefreshCw,
  Save,
  RotateCcw,
  Bot,
} from "lucide-react";

const DEFAULT_SETTINGS = {
  zeroTrust: true,
  escrowProtection: true,
  rogueDetection: true,
  autoRecovery: true,
  verificationThreshold: 70,
  defaultAgentBudget: 100,
};

function SettingsPage({ onBack }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("agentraSettings");

      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSavedMessage("");
  };

  const saveSettings = () => {
    localStorage.setItem(
      "agentraSettings",
      JSON.stringify(settings)
    );

    setSavedMessage("SETTINGS SAVED");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);

    localStorage.setItem(
      "agentraSettings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    setSavedMessage("DEFAULTS RESTORED");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#090d0e",
        color: "#f4f4f4",
        padding: "36px 4%",
      }}
    >
      {/* BACK BUTTON */}

      <button
        type="button"
        onClick={onBack}
        style={backButtonStyle}
      >
        <ArrowLeft size={16} />
        BACK TO OVERVIEW
      </button>

      {/* HEADER */}

      <div style={headerStyle}>
        <div>
          <div style={labelStyle}>
            AGENTRA CONFIGURATION
          </div>

          <h1
            style={{
              fontSize: "52px",
              margin: "8px 0",
            }}
          >
            Settings
          </h1>

          <p style={descriptionStyle}>
            Configure autonomous economy behaviour,
            verification policies and mission defaults.
          </p>
        </div>

        <div style={statusBadgeStyle}>
          <Settings size={18} />
          CONFIGURATION
        </div>
      </div>

      {/* SECURITY SETTINGS */}

      <SectionHeader
        label="SECURITY"
        title="Zero-Trust Controls"
      />

      <section style={gridStyle}>
        <SettingCard
          icon={<ShieldCheck />}
          title="Zero-Trust Verification"
          description="Require independent verification before autonomous work is accepted."
          enabled={settings.zeroTrust}
          onToggle={() =>
            updateSetting(
              "zeroTrust",
              !settings.zeroTrust
            )
          }
        />

        <SettingCard
          icon={<Wallet />}
          title="Escrow Protection"
          description="Protect agent rewards until verification is successfully completed."
          enabled={settings.escrowProtection}
          onToggle={() =>
            updateSetting(
              "escrowProtection",
              !settings.escrowProtection
            )
          }
        />

        <SettingCard
          icon={<AlertTriangle />}
          title="Rogue Agent Detection"
          description="Flag agents that return suspicious or unverified results."
          enabled={settings.rogueDetection}
          onToggle={() =>
            updateSetting(
              "rogueDetection",
              !settings.rogueDetection
            )
          }
        />

        <SettingCard
          icon={<RefreshCw />}
          title="Automatic Recovery"
          description="Automatically recruit a trusted replacement when an agent fails verification."
          enabled={settings.autoRecovery}
          onToggle={() =>
            updateSetting(
              "autoRecovery",
              !settings.autoRecovery
            )
          }
        />
      </section>

      {/* MISSION SETTINGS */}

      <div style={{ marginTop: "38px" }}>
        <SectionHeader
          label="MISSION POLICY"
          title="Economy Defaults"
        />
      </div>

      <section style={panelStyle}>
        {/* VERIFICATION THRESHOLD */}

        <div style={settingRowStyle}>
          <div style={settingInfoStyle}>
            <div style={smallIconStyle}>
              <ShieldCheck size={21} />
            </div>

            <div>
              <strong>
                Minimum Verification Score
              </strong>

              <p style={smallDescriptionStyle}>
                Minimum verifier score required before
                work can be considered trusted.
              </p>
            </div>
          </div>

          <div style={inputAreaStyle}>
            <input
              type="number"
              min="0"
              max="100"
              value={settings.verificationThreshold}
              onChange={(event) =>
                updateSetting(
                  "verificationThreshold",
                  Number(event.target.value)
                )
              }
              style={numberInputStyle}
            />

            <span style={unitStyle}>
              / 100
            </span>
          </div>
        </div>

        {/* AGENT BUDGET */}

        <div
          style={{
            ...settingRowStyle,
            borderBottom: "none",
          }}
        >
          <div style={settingInfoStyle}>
            <div style={smallIconStyle}>
              <Bot size={21} />
            </div>

            <div>
              <strong>
                Default Agent Budget
              </strong>

              <p style={smallDescriptionStyle}>
                Default credit allocation for new
                autonomous missions.
              </p>
            </div>
          </div>

          <div style={inputAreaStyle}>
            <input
              type="number"
              min="0"
              value={settings.defaultAgentBudget}
              onChange={(event) =>
                updateSetting(
                  "defaultAgentBudget",
                  Number(event.target.value)
                )
              }
              style={numberInputStyle}
            />

            <span style={unitStyle}>
              CRD
            </span>
          </div>
        </div>
      </section>

      {/* IMPORTANT INFORMATION */}

      <section
        style={{
          marginTop: "28px",
          border: "1px solid #31594e",
          background: "#14201d",
          padding: "22px",
          display: "flex",
          alignItems: "flex-start",
          gap: "15px",
        }}
      >
        <ShieldCheck
          size={25}
          color="#42e6ac"
        />

        <div>
          <strong>
            ZERO-TRUST POLICY
          </strong>

          <p
            style={{
              ...descriptionStyle,
              margin: "6px 0 0",
            }}
          >
            Recommended configuration keeps verification,
            escrow protection, rogue detection and automatic
            recovery enabled.
          </p>
        </div>
      </section>

      {/* BUTTONS */}

      <div style={actionBarStyle}>
        <div>
          {savedMessage && (
            <span style={savedMessageStyle}>
              ✓ {savedMessage}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={resetSettings}
            style={secondaryButtonStyle}
          >
            <RotateCcw size={16} />
            RESET DEFAULTS
          </button>

          <button
            type="button"
            onClick={saveSettings}
            style={primaryButtonStyle}
          >
            <Save size={16} />
            SAVE SETTINGS
          </button>
        </div>
      </div>

      {/* LOCAL CONFIGURATION NOTICE */}

      <div
        style={{
          marginTop: "20px",
          color: "#62777d",
          fontFamily: "monospace",
          fontSize: "10px",
          letterSpacing: "1px",
        }}
      >
        LOCAL DEMO CONFIGURATION · SETTINGS STORED IN BROWSER
      </div>
    </div>
  );
}


/* =====================================================
   SETTING CARD
===================================================== */

function SettingCard({
  icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div style={panelStyle}>
      <div style={cardHeaderStyle}>
        <div style={smallIconStyle}>
          {icon}
        </div>

        <button
          type="button"
          onClick={onToggle}
          style={{
            ...toggleStyle,
            borderColor: enabled
              ? "#42e6ac"
              : "#536267",
            background: enabled
              ? "#173128"
              : "#202627",
          }}
        >
          <span
            style={{
              ...toggleCircleStyle,
              marginLeft: enabled
                ? "22px"
                : "2px",
              background: enabled
                ? "#42e6ac"
                : "#78898e",
            }}
          />
        </button>
      </div>

      <h3
        style={{
          margin: "22px 0 7px",
        }}
      >
        {title}
      </h3>

      <p style={smallDescriptionStyle}>
        {description}
      </p>

      <div
        style={{
          marginTop: "20px",
          color: enabled
            ? "#42e6ac"
            : "#ff626c",
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: "bold",
        }}
      >
        ● {enabled ? "ENABLED" : "DISABLED"}
      </div>
    </div>
  );
}


/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
  label,
  title,
}) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <div style={labelStyle}>
        {label}
      </div>

      <h2 style={{ margin: "6px 0" }}>
        {title}
      </h2>
    </div>
  );
}


/* =====================================================
   STYLES
===================================================== */

const backButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background: "transparent",
  border: "1px solid #00d7e6",
  color: "#00e5ff",
  padding: "11px 16px",
  cursor: "pointer",
  marginBottom: "42px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "30px",
  marginBottom: "35px",
};

const statusBadgeStyle = {
  border: "1px solid #00aeba",
  color: "#00e5ff",
  padding: "14px 18px",
  display: "flex",
  alignItems: "center",
  gap: "9px",
  fontFamily: "monospace",
  fontWeight: "bold",
};

const panelStyle = {
  border: "1px solid #314247",
  background: "#151a1b",
  padding: "25px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "14px",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const smallIconStyle = {
  width: "45px",
  height: "45px",
  border: "1px solid #00aeba",
  color: "#00e5ff",
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
};

const toggleStyle = {
  width: "48px",
  height: "26px",
  border: "1px solid",
  padding: "2px",
  cursor: "pointer",
};

const toggleCircleStyle = {
  display: "block",
  width: "18px",
  height: "18px",
  transition: "0.2s",
};

const settingRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "30px",
  padding: "22px 0",
  borderBottom: "1px solid #303a3d",
};

const settingInfoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "17px",
};

const inputAreaStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const numberInputStyle = {
  width: "95px",
  background: "#090d0e",
  border: "1px solid #405257",
  color: "#f4f4f4",
  padding: "12px",
  fontFamily: "monospace",
  fontSize: "15px",
};

const unitStyle = {
  color: "#78949c",
  fontFamily: "monospace",
  fontSize: "12px",
};

const actionBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  marginTop: "28px",
};

const primaryButtonStyle = {
  border: "1px solid #00d7e6",
  background: "#00cfe0",
  color: "#061012",
  padding: "13px 18px",
  cursor: "pointer",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const secondaryButtonStyle = {
  border: "1px solid #536267",
  background: "transparent",
  color: "#c5d0d3",
  padding: "13px 18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const savedMessageStyle = {
  color: "#42e6ac",
  fontFamily: "monospace",
  fontSize: "12px",
  fontWeight: "bold",
};

const labelStyle = {
  color: "#78949c",
  fontFamily: "monospace",
  fontSize: "11px",
  letterSpacing: "1.5px",
};

const descriptionStyle = {
  color: "#8da9b2",
  fontSize: "14px",
};

const smallDescriptionStyle = {
  color: "#8da9b2",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "6px 0 0",
};

export default SettingsPage;