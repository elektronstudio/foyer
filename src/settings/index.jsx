import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext({ first: 0, second: 0 });

export const SettingsProvider = ({ children }) => {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const value = { first, second };

  return (
    <>
      <SettingsContext.Provider value={value}>
        {children}
      </SettingsContext.Provider>
      {false && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "200px",
            color: "white",
            padding: "16px",
            background: "rgba(50,50,50,0.5)",
            display: "grid",
            gap: "16px",
            fontFamily: "sans-serif",
          }}
        >
          <div>First: {first}</div>
          <input
            type="range"
            step="0.01"
            max="1"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          />
          <div>Second: {second}</div>
          <input
            type="range"
            step="0.01"
            max="1"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export const useSettings = () => useContext(SettingsContext);
