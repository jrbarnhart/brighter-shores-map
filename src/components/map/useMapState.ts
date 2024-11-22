import mapConfig from "@/lib/map/mapConfig";
import { RoomId } from "@/lib/map/mapData";
import React, { SetStateAction, useRef, useState } from "react";
import { RoomPathData } from "./canvas/useCreateRoomPaths";
import { RoomTreeNode } from "./canvas/useCreateRTree";
import RBush from "rbush";

export type MapState = {
  canvas: {
    rooms: {
      ref: React.MutableRefObject<HTMLCanvasElement | null>;
      size: {
        value: { height: number; width: number };
        set: React.Dispatch<SetStateAction<{ height: number; width: number }>>;
      };
    };
  };
  currentCellSize: {
    value: number;
    set: React.Dispatch<SetStateAction<number>>;
  };
  roomPaths: {
    value: RoomPathData[];
    set: React.Dispatch<SetStateAction<RoomPathData[]>>;
  };
  visibleRoomPaths: {
    value: RoomPathData[];
    set: React.Dispatch<SetStateAction<RoomPathData[]>>;
  };
  rTree: {
    value: RBush<RoomTreeNode> | undefined;
    set: React.Dispatch<SetStateAction<RBush<RoomTreeNode> | undefined>>;
  };
  labelsHidden: {
    value: boolean;
    set: React.Dispatch<SetStateAction<boolean>>;
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
  const roomCanvasRef = useRef<HTMLCanvasElement>(null);
  const [roomsCanvasSize, setRoomsCanvasSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [cellSize, setCellSize] = useState(mapConfig.defaultCellSize);
  const [roomPaths, setRoomPaths] = useState<RoomPathData[]>([]);
  const [visibleRoomPaths, setVisibleRoomPaths] = useState<RoomPathData[]>([]);
  const [rTree, setRTree] = useState<RBush<RoomTreeNode> | undefined>();
  const [labelsHidden, setLabelsHidden] = useState(false);
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [dragLocked, setDragLocked] = useState(false);
  const enabledRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredId] = useState<RoomId | null>(null);
  const [selectedId, setSelectedId] = useState<RoomId | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const mapState: MapState = {
    canvas: {
      rooms: {
        ref: roomCanvasRef,
        size: { value: roomsCanvasSize, set: setRoomsCanvasSize },
      },
    },
    currentCellSize: { value: cellSize, set: setCellSize },
    roomPaths: { value: roomPaths, set: setRoomPaths },
    rTree: { value: rTree, set: setRTree },
    visibleRoomPaths: { value: visibleRoomPaths, set: setVisibleRoomPaths },
    labelsHidden: { value: labelsHidden, set: setLabelsHidden },
    mapPos: { value: mapPos, set: setMapPos },
    drag: { lock: { value: dragLocked, set: setDragLocked }, enabledRef },
    isHovering: { value: isHovering, set: setIsHovering },
    hoveredId: { value: hoveredId, set: setHoveredId },
    selectedId: { value: selectedId, set: setSelectedId },
    detailsOpen: { value: detailsOpen, set: setDetailsOpen },
  };

  return mapState;
}
