import useMapState from "./components/map/useMapState";
import MoveButton from "./components/moveButton/MoveButton";
import MapSidebar from "./components/sidebar/MapSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import mapConfig from "./lib/map/mapConfig";
import ZoomButtons from "./components/map/ZoomButtons";
import Details from "./components/toolTips/Details";
import MapCanvas from "./components/map/canvas/MapCanvas";

function App() {
  const mapState = useMapState();

  return (
    <SidebarProvider>
      <MapSidebar mapState={mapState} mapConfig={mapConfig} />
      <main
        className="h-screen w-screen relative overflow-hidden"
        style={{ backgroundColor: mapConfig.bgColor }}
      >
        <SidebarTrigger className="absolute mt-3 ml-3 z-10 bg-sidebar h-12 w-12 border border-sidebar-accent text-sidebar-accent hover:bg-sidebar-accent" />
        <MoveButton mapState={mapState} />
        <ZoomButtons mapState={mapState} />
        <Details mapState={mapState} />
        <MapCanvas mapState={mapState} />
      </main>
    </SidebarProvider>
  );
}

export default App;
