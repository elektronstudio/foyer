import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children, settings: settingsFields }) => {
  const state = Object.fromEntries(
    settingsFields.map(({ key, value }) => [key, value])
  );
  const [settings, setSettings] = useState(state);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        {children}
      </SettingsContext.Provider>
      <>
        {isVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              overflow: "auto",
              width: "200px",
              color: "white",
              padding: "24px",
              background: "rgba(30,30,30,0.5)",
              fontFamily: "sans-serif",
            }}
          >
            {settingsFields.map((field, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div style={{ marginBottom: "8px" }}>
                  {field.title}{" "}
                  {field.type !== "text" ? settings[field.key] : ""}
                </div>
                <input
                  type={field.type}
                  value={settings[field.key]}
                  min={field.min || 0}
                  max={field.max || 0}
                  step={field.step || 0}
                  onChange={(e) =>
                    setSettings({ ...settings, [field.key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        )}
        <div
          style={{
            fontSize: "25px",
            position: "fixed",
            top: "5px",
            right: "10px",
            cursor: "pointer",
            color: "gray",
          }}
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? "×" : "≡"}
        </div>
      </>
    </>
  );
};

export const useSettings = () => useContext(SettingsContext);
