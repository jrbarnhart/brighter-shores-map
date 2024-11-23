import mapConfig from "@/lib/map/mapConfig";
import { RoomId } from "@/lib/map/mapData";
import React, { SetStateAction, useRef, useState } from "react";
import { RoomDataWithPath } from "./canvas/useCanvasElementsManager";
import { RoomTreeNode } from "./canvas/useCreateRTree";
import RBush from "rbush";
import useCanvasElementsManager from "./canvas/useCanvasElementsManager";

export type MapState = {
  canvas: {
    size: {
      value: { height: number; width: number };
      set: React.Dispatch<SetStateAction<{ height: number; width: number }>>;
    };
    rooms: {
      ref: React.MutableRefObject<HTMLCanvasElement | null>;
    };
    labels: {
      ref: React.MutableRefObject<HTMLCanvasElement | null>;
    };
  };
  currentCellSize: {
    value: number;
    set: React.Dispatch<SetStateAction<number>>;
  };
  roomPaths: {
    value: RoomDataWithPath[];
  };
  visibleRoomPaths: {
    value: RoomDataWithPath[];
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
  // Map config
  const { defaultCellSize } = mapConfig;

  const roomsCanvasRef = useRef<HTMLCanvasElement>(null);
  const labelsCanvasRef = useRef<HTMLCanvasElement>(null);
  const [roomsCanvasSize, setRoomsCanvasSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [currentCellSize, setCurrentCellSize] = useState(defaultCellSize);
  const [rTree, setRTree] = useState<RBush<RoomTreeNode> | undefined>();
  const [labelsHidden, setLabelsHidden] = useState(false);
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [dragLocked, setDragLocked] = useState(false);
  const enabledRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredId] = useState<RoomId | null>(null);
  const [selectedId, setSelectedId] = useState<RoomId | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { roomPaths, visibleRoomPaths } = useCanvasElementsManager({
    roomsCanvas: roomsCanvasRef.current,
    currentCellSize,
    mapPos,
    rTree,
    defaultCellSize,
  });

  const mapState: MapState = {
    canvas: {
      size: { value: roomsCanvasSize, set: setRoomsCanvasSize },
      rooms: {
        ref: roomsCanvasRef,
      },
      labels: {
        ref: labelsCanvasRef,
      },
    },
    currentCellSize: { value: currentCellSize, set: setCurrentCellSize },
    roomPaths: { value: roomPaths },
    rTree: { value: rTree, set: setRTree },
    visibleRoomPaths: { value: visibleRoomPaths },
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
