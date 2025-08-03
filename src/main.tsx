import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.tsx";
import ContainerContextProvider from "./components/context/MoviesContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContainerContextProvider>
      <App />
    </ContainerContextProvider>
  </StrictMode>
);
