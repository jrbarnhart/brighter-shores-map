import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Eye, EyeClosed, EyeOff } from "lucide-react";

import { MapState } from "../map/useMapState";
import { ReactNode, SetStateAction } from "react";
import { MapConfig } from "@/lib/map/mapConfig";

function LabelsToggleButton({
  children,
  currentCellSize,
  minCellSize,
  setLabelsHidden,
  labelsHidden,
  setLabelsWereVisible,
}: {
  children: ReactNode;
  currentCellSize: number;
  minCellSize: number;
  setLabelsHidden: React.Dispatch<SetStateAction<boolean>>;
  labelsHidden: boolean;
  setLabelsWereVisible: React.Dispatch<SetStateAction<boolean>>;
}) {
  const handleToggle = () => {
    setLabelsHidden((prev) => !prev);
    setLabelsWereVisible((prev) => !prev);
  };

  const toggleDisabled = currentCellSize <= minCellSize;

  return (
    <SidebarMenuButton onClick={handleToggle} className="flex justify-between">
      {children}
      {toggleDisabled ? <EyeOff /> : labelsHidden ? <EyeClosed /> : <Eye />}
    </SidebarMenuButton>
  );
}

export default function MapSidebar({
  mapState,
  mapConfig,
}: {
  mapState: MapState;
  mapConfig: MapConfig;
}) {
  return (
    <Sidebar className="border-zinc-600">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Brighter Map</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <LabelsToggleButton
                  currentCellSize={mapState.currentCellSize.value}
                  minCellSize={mapConfig.minCellSize}
                  setLabelsHidden={mapState.labelsHidden.set}
                  labelsHidden={mapState.labelsHidden.value}
                  setLabelsWereVisible={mapState.labelsWereVisible.set}
                >
                  Labels
                </LabelsToggleButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
