import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function useDarkModeContext() {
  const context = useContext(DarkModeContext);

  if (!context) {
    console.log("Erro de contexto: ThemeContext");
  }

  return context;
}
