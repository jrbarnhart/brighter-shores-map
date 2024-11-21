import mapConfig from "@/lib/map/mapConfig";
import { RoomId } from "@/lib/map/mapData";
import React, { SetStateAction, useRef, useState } from "react";
import { RoomPathData } from "./canvas/useCreateRoomPaths";

export type MapState = {
  roomPaths: {
    value: RoomPathData[];
    set: React.Dispatch<SetStateAction<RoomPathData[]>>;
  };
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
  isHovering: { value: boolean; set: React.Dispatch<SetStateAction<boolean>> };
  hoveredId: {
    value: RoomId | null;
    set: React.Dispatch<SetStateAction<RoomId | null>>;
  };
  selectedId: {
    value: RoomId | null;
    set: React.Dispatch<SetStateAction<RoomId | null>>;
  };
  detailsOpen: {
    value: boolean;
    set: React.Dispatch<SetStateAction<boolean>>;
  };
};

export default function useMapState() {
  const { defaultScale } = mapConfig;
  const [roomPaths, setRoomPaths] = useState<RoomPathData[]>([]);
  const [labelsHidden, setLabelsHidden] = useState(false);
  const [scale, setScale] = useState(defaultScale);
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [dragLocked, setDragLocked] = useState(false);
  const enabledRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredId] = useState<RoomId | null>(null);
  const [selectedId, setSelectedId] = useState<RoomId | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const mapState: MapState = {
    roomPaths: { value: roomPaths, set: setRoomPaths },
    labelsHidden: { value: labelsHidden, set: setLabelsHidden },
    scale: { value: scale, set: setScale },
    mapPos: { value: mapPos, set: setMapPos },
    drag: { lock: { value: dragLocked, set: setDragLocked }, enabledRef },
    isHovering: { value: isHovering, set: setIsHovering },
    hoveredId: { value: hoveredId, set: setHoveredId },
    selectedId: { value: selectedId, set: setSelectedId },
    detailsOpen: { value: detailsOpen, set: setDetailsOpen },
  };

  return mapState;
}
