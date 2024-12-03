import mapConfig from "@/lib/map/mapConfig";
import React, { SetStateAction, useRef, useState } from "react";
import RBush from "rbush";
import useCanvasElementsManager from "./canvas/useCanvasElementsManager";
import {
  LabelDataWithPath,
  NormalizedValue,
  PixelValue,
  RoomDataWithPath,
  RoomId,
  RoomTreeNode,
  SearchResult,
} from "@/lib/types";

export type MapState = {
  canvas: {
    size: {
      value: { height: PixelValue; width: PixelValue };
      set: React.Dispatch<
        SetStateAction<{ height: PixelValue; width: PixelValue }>
      >;
    };
    rooms: {
      ref: React.MutableRefObject<HTMLCanvasElement | null>;
    };
    labels: {
      ref: React.MutableRefObject<HTMLCanvasElement | null>;
    };
  };
  currentCellSize: {
    value: PixelValue;
    set: React.Dispatch<SetStateAction<PixelValue>>;
  };
  roomPaths: {
    value: RoomDataWithPath[];
  };
  roomLabels: {
    value: LabelDataWithPath[];
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
  labelsWereVisible: {
    value: boolean;
    set: React.Dispatch<SetStateAction<boolean>>;
  };
  mapPos: {
    value: { x: NormalizedValue; y: NormalizedValue };
    set: React.Dispatch<
      SetStateAction<{ x: NormalizedValue; y: NormalizedValue }>
    >;
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
  search: {
    query: {
      value: string;
      set: React.Dispatch<SetStateAction<string>>;
    };
    results: {
      value: SearchResult[];
      set: React.Dispatch<SetStateAction<SearchResult[]>>;
    };
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
  const [currentCellSize, setCurrentCellSize] =
    useState<number>(defaultCellSize);
  const [rTree, setRTree] = useState<RBush<RoomTreeNode> | undefined>();
  const [labelsHidden, setLabelsHidden] = useState(false);
  const [labelsWereVisible, setLabelsWereVisible] = useState(true);
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [dragLocked, setDragLocked] = useState(false);
  const enabledRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredId] = useState<RoomId | null>(null);
  const [selectedId, setSelectedId] = useState<RoomId | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const { roomPaths, visibleRoomPaths, roomLabels } = useCanvasElementsManager({
    roomsCanvas: roomsCanvasRef.current,
    currentCellSize,
    mapPos,
    rTree,
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
    roomLabels: { value: roomLabels },
    rTree: { value: rTree, set: setRTree },
    visibleRoomPaths: { value: visibleRoomPaths },
    labelsHidden: { value: labelsHidden, set: setLabelsHidden },
    labelsWereVisible: { value: labelsWereVisible, set: setLabelsWereVisible },
    mapPos: { value: mapPos, set: setMapPos },
    drag: { lock: { value: dragLocked, set: setDragLocked }, enabledRef },
    isHovering: { value: isHovering, set: setIsHovering },
    hoveredId: { value: hoveredId, set: setHoveredId },
    selectedId: { value: selectedId, set: setSelectedId },
    detailsOpen: { value: detailsOpen, set: setDetailsOpen },
    search: {
      query: {
        value: searchQuery,
        set: setSearchQuery,
      },
      results: {
        value: searchResults,
        set: setSearchResults,
      },
    },
  };

  return mapState;
}
