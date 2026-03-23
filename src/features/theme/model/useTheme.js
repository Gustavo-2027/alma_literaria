import { useContext } from "react";
import { DarkModeContext } from "./ThemeContext";

export default function useDarkModeContext() {
  const context = useContext(DarkModeContext);

  if (context === undefined || context === null) {
    throw new Error(
      "useDarkModeContext must be used within a DarkModeProvider."
    );
  }

  return context;
}