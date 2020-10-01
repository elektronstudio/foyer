import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext({ first: 0 });

export const ThemeProvider = ({ children }) => {
  //  const [currentTheme] = useState(theme);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  //const first = 1;
  const value = { first };

  return (
    <>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
      <div
        style={{
          border: "1px solid white",
          position: "fixed",
          top: 0,
          right: 0,
          width: "200px",
          color: "white",
          padding: "16px",
          background: "rgba(50,50,50,0.5)",
          display: "grid",
          gap: "16px",
        }}
      >
        <input
          type="range"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        {first}
      </div>
    </>
  );
};

export const useTheme = () => useContext(ThemeContext);
