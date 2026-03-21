import { createContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const user = useSelector((state) => state.auth.user);

  const getStorageKey = () =>
    user ? `darkMode_${user.email}` : "darkMode_guest";

  const getInitialTheme = () => {
    const saved = localStorage.getItem(getStorageKey());

    if (saved !== null) return saved === "true";

    // fallback inteligente → usa preferência do sistema
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(getStorageKey(), darkMode.toString());
  }, [darkMode, user]);

  useEffect(() => {
    setDarkMode(getInitialTheme());
  }, [user]);

  // aplica classe no <html> (muito importante pra UX global)
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const value = useMemo(() => ({ darkMode, setDarkMode }), [darkMode]);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}