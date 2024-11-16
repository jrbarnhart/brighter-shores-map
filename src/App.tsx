import { useRef, useState } from "react";
import MapSVG from "./components/map/MapSVG";
import useMapState from "./components/map/useMapState";
import MoveButton from "./components/moveButton/MoveButton";
import MapSidebar from "./components/sidebar/MapSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import mapConfig from "./lib/map/mapConfig";

function App() {
  const mapState = useMapState();
  const dragEnabled = useRef(false);
  const [dragLocked, setDragLocked] = useState(false);

  return (
    <SidebarProvider>
      <MapSidebar mapState={mapState} />
      <main
        className="h-screen w-screen relative overflow-hidden"
        style={{ backgroundColor: mapConfig.bgColor }}
      >
        <SidebarTrigger className="absolute mt-3 ml-3 z-10 bg-sidebar h-12 w-12 border border-sidebar-accent text-sidebar-accent hover:bg-sidebar-accent" />
        <MoveButton dragLocked={dragLocked} setDragLocked={setDragLocked} />
        <MapSVG
          mapState={mapState}
          dragEnabled={dragEnabled}
          dragLocked={dragLocked}
          setDragLocked={setDragLocked}
        />
      </main>
    </SidebarProvider>
  );
}

export default App;
