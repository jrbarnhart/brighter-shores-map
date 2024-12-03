import { useEffect, useRef } from "react";
import { MapState } from "../map/useMapState";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar({ mapState }: { mapState: MapState }) {
  const { search } = mapState;

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Define debounced search query handler
  const handleSearchQueryChange = useDebounce(() => {
    // Take the value in search query and
    // Do the search lmao
    console.log("Debounced");
  }, 300);

  useEffect(() => {
    handleSearchQueryChange();
    return () => {
      handleSearchQueryChange.cancel();
    };
  }, [handleSearchQueryChange, search.query.value]);

  return (
    <div className="absolute top-0 z-10 right-0 mt-3 bg-green-500/50 w-full flex justify-center h-12">
      <input
        className="h-full w-24"
        ref={searchInputRef}
        value={search.query.value}
        onChange={(e) => {
          search.query.set(e.target.value);
        }}
        type="search"
        id="map-search"
        name="query"
      />
    </div>
  );
}
