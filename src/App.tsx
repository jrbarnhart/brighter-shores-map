import useMapState from "./components/map/useMapState";
import MoveButton from "./components/moveButton/MoveButton";
import MapSidebar from "./components/sidebar/MapSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import mapConfig from "./lib/map/mapConfig";
import ZoomButtons from "./components/zoomButtons/ZoomButtons";
import MapCanvas from "./components/map/MapCanvas";
import SearchBar from "./components/search/SearchBar";
import ExpandedCard from "./components/expandedCard/ExpandedCard";

function App() {
  const mapState = useMapState();

  return (
    <SidebarProvider>
      <MapSidebar mapState={mapState} mapConfig={mapConfig} />
      <main
        className="h-screen w-screen relative overflow-hidden"
        style={{ backgroundColor: mapConfig.bgColor }}
      >
        <SidebarTrigger className="absolute mt-3 ml-3 z-20 bg-sidebar h-12 w-12 border border-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent" />
        <MoveButton mapState={mapState} />
        <MapCanvas mapState={mapState} />
        <SearchBar mapState={mapState} />
        <ZoomButtons mapState={mapState} />
        <ExpandedCard mapState={mapState} />
      </main>
    </SidebarProvider>
  );
}

export default App;
