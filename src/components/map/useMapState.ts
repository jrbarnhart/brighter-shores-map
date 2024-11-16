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
};

export default function useMapState() {
  const [labelsHidden, setLabelsHidden] = useState(false);
  const [scale, setScale] = useState(100);

  const mapState: MapState = {
    labelsHidden: { value: labelsHidden, set: setLabelsHidden },
    scale: { value: scale, set: setScale },
  };

  return mapState;
}
