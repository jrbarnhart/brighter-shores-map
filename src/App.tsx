import MapSVG from "./components/map/MapSVG";
import useMapState from "./components/map/useMapState";
import MapSidebar from "./components/sidebar/MapSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import mapConfig from "./lib/map/mapConfig";

function App() {
  const mapState = useMapState();

  return (
    <SidebarProvider>
      <MapSidebar mapState={mapState} />
      <main
        className={`h-screen w-screen relative overflow-hidden bg-[${mapConfig.bgColor}]`}
      >
        <SidebarTrigger className="absolute mt-3 ml-3 z-10 bg-neutral-50 h-12 w-12 border border-green-500" />
        <MapSVG mapState={mapState} />
      </main>
    </SidebarProvider>
  );
}

export default App;
