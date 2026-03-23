import { Outlet } from "react-router-dom";

import useTheme from "../../features/theme/model/useTheme";
import { ToastProvider } from "../../features/toast/model/ToastContext";

export default function LayoutPage() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen antialiased transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-zinc-900"
      }`}
    >
      <div
        className={`min-h-screen ${
          darkMode
            ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_35%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_35%)]"
        }`}
      >
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </div>
    </div>
  );
}