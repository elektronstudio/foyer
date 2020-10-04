import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children, settings: settingsFields }) => {
  const state = Object.fromEntries(
    settingsFields.map(({ key, value }) => [key, value])
  );
  const [settings, setSettings] = useState(state);
  return (
    <>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        {children}
      </SettingsContext.Provider>
      {true && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            overflow: "auto",
            width: "200px",
            color: "white",
            padding: "16px",
            background: "rgba(50,50,50,0.5)",
            fontFamily: "sans-serif",
          }}
        >
          {settingsFields.map((field, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ marginBottom: "8px" }}>
                {field.title} {field.type !== "text" ? settings[field.key] : ""}
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
    </>
  );
};

export const useSettings = () => useContext(SettingsContext);
