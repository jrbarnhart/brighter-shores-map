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
      <main className="relative overflow-hidden">
        <SidebarTrigger className="absolute mt-3 ml-3 z-10 bg-neutral-50 h-12 w-12 border border-green-500" />
        <App />
      </main>
    </SidebarProvider>
  </StrictMode>
);
