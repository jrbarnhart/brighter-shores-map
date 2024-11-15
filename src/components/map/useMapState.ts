import { SetStateAction, useState } from "react";

export type MapState = {
  labelsHidden: {
    value: boolean;
    set: React.Dispatch<SetStateAction<boolean>>;
  };
};

export default function useMapState() {
  const [labelsHidden, setLabelsHidden] = useState(false);

  const mapState: MapState = {
    labelsHidden: { value: labelsHidden, set: setLabelsHidden },
  };

  return mapState;
}
