import { useState } from "react";
import MapSVG from "./components/map/MapSVG";
import MapSidebar from "./components/sidebar/MapSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  const [labelsHidden, setLabelsHidden] = useState(false);

  return (
    <SidebarProvider>
      <MapSidebar setLabelsHidden={setLabelsHidden} />
      <main className="h-screen w-screen relative overflow-hidden">
        <SidebarTrigger className="absolute mt-3 ml-3 z-10 bg-neutral-50 h-12 w-12 border border-green-500" />

        <MapSVG />
      </main>
    </SidebarProvider>
  );
}

export default App;
