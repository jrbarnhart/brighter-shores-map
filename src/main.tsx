import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.tsx";
import MapSidebar from "./components/sidebar/MapSidebar.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <SidebarProvider>
      <MapSidebar />
      <main className="relative">
        <SidebarTrigger className="absolute z-10" />
        <App />
      </main>
    </SidebarProvider>
  </StrictMode>
);
