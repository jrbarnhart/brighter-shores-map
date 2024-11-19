import mapConfig from "@/lib/map/mapConfig";
import { RoomId } from "@/lib/map/mapData";
import { SetStateAction, useRef, useState } from "react";

export type MapState = {
  labelsHidden: {
    value: boolean;
    set: React.Dispatch<SetStateAction<boolean>>;
  };
  scale: {
    value: number;
    set: React.Dispatch<SetStateAction<number>>;
  };
  mapPos: {
    value: { x: number; y: number };
    set: React.Dispatch<SetStateAction<{ x: number; y: number }>>;
  };
  drag: {
    lock: { value: boolean; set: React.Dispatch<SetStateAction<boolean>> };
    enabledRef: React.MutableRefObject<boolean>;
  };
  selectedRoomId: {
    value: string | null;
    set: React.Dispatch<SetStateAction<RoomId | null>>;
  };
  hoveredRoomId: {
    value: string | null;
    set: React.Dispatch<SetStateAction<RoomId | null>>;
  };
};

export default function useMapState() {
  const { defaultScale } = mapConfig;
  const [labelsHidden, setLabelsHidden] = useState(false);
  const [scale, setScale] = useState(defaultScale);
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [dragLocked, setDragLocked] = useState(false);
  const enabledRef = useRef(false);
  const [selectedRoomId, setSelectedRoomId] = useState<RoomId | null>(null);
  const [hoveredRoomId, setHoveredRoomId] = useState<RoomId | null>(null);

  const mapState: MapState = {
    labelsHidden: { value: labelsHidden, set: setLabelsHidden },
    scale: { value: scale, set: setScale },
    mapPos: { value: mapPos, set: setMapPos },
    drag: { lock: { value: dragLocked, set: setDragLocked }, enabledRef },
    selectedRoomId: { value: selectedRoomId, set: setSelectedRoomId },
    hoveredRoomId: { value: hoveredRoomId, set: setHoveredRoomId },
  };

  return mapState;
}
