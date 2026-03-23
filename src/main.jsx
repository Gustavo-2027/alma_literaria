import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { store } from "./app/store/store";
import { router } from "./app/router/router";
import { DarkModeProvider } from "./features/theme/model/ThemeContext";
import SupabaseAuthProvider from "./app/providers/SupabaseAuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <SupabaseAuthProvider>
          <RouterProvider router={router} />
        </SupabaseAuthProvider>
      </DarkModeProvider>
    </Provider>
  </StrictMode>,
);
