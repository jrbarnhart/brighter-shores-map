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

import { MapState } from "../map/useMapState";

export default function MapSidebar({ mapState }: { mapState: MapState }) {
  const handleLabelsToggle = () => {
    mapState.labelsHidden.set((prev) => !prev);
  };

  return (
    <Sidebar className="border-zinc-600">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Brighter Map</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLabelsToggle}>
                  Labels
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
