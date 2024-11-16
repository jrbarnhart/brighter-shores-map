import { SetStateAction, useState } from "react";

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
};

export default function useMapState() {
  const [labelsHidden, setLabelsHidden] = useState(false);
  const [scale, setScale] = useState(100);
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });

  const mapState: MapState = {
    labelsHidden: { value: labelsHidden, set: setLabelsHidden },
    scale: { value: scale, set: setScale },
    mapPos: { value: mapPos, set: setMapPos },
  };

  return mapState;
}
