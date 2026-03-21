import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "./redux/store";
import { DarkModeProvider } from "./context/DarkModeContext";
import {router} from "./routes/router"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </Provider>
  </StrictMode>
);