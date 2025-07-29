import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const user = useSelector((state) => state.auth.user);
  const [darkMode, setDarkMode] = useState(() => {
    if (!user) return false;
    const savedTheme = localStorage.getItem(`darkMode_${user.email}`);
    return savedTheme !== null ? savedTheme === "true" : false;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(`darkMode_${user.email}`, darkMode.toString());
    }
  }, [darkMode, user]);

  useEffect(() => {
    if (user) {
      const savedTheme = localStorage.getItem(`darkMode_${user.email}`);
      setDarkMode(savedTheme !== null ? savedTheme === "true" : false);
    } else {
      setDarkMode(false);
    }
  }, [user]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}