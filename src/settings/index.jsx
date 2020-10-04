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
            left: 0,
            width: "200px",
            color: "white",
            padding: "16px",
            background: "rgba(50,50,50,0.5)",
            display: "grid",
            gap: "16px",
            fontFamily: "sans-serif",
          }}
        >
          {settingsFields.map((field, i) => (
            <div key={i} style={{ marginBottom: "7px" }}>
              <div style={{ marginBottom: "5px" }}>{field.title}</div>
              <input
                type={field.type}
                value={settings[field.key]}
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
