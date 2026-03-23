import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const DarkModeContext = createContext(undefined);

function getDarkModeStorageKey(user) {
  return user?.email ? `darkMode_${user.email}` : "darkMode_guest";
}

function getSystemThemePreference() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getStoredTheme(storageKey) {
  if (typeof window === "undefined") return null;

  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    return savedTheme === null ? null : savedTheme === "true";
  } catch {
    return null;
  }
}

function resolveInitialTheme(user) {
  const storageKey = getDarkModeStorageKey(user);
  const storedTheme = getStoredTheme(storageKey);

  if (storedTheme !== null) {
    return storedTheme;
  }

  return getSystemThemePreference();
}

export function DarkModeProvider({ children }) {
  const user = useSelector((state) => state.auth.user);
  const storageKey = useMemo(() => getDarkModeStorageKey(user), [user]);

  const [darkMode, setDarkMode] = useState(() => resolveInitialTheme(user));

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    setDarkMode(resolveInitialTheme(user));
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(storageKey, String(darkMode));
    } catch {
      // noop
    }
  }, [storageKey, darkMode]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
      toggleDarkMode,
    }),
    [darkMode, toggleDarkMode]
  );

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}