import { SetStateAction, useEffect, useMemo, useRef } from "react";
import { MapState } from "../map/useMapState";
import useDebounce from "@/hooks/useDebounce";
import Fuse from "fuse.js";
import { searchableData } from "@/lib/map/mapData";
import { SearchResult } from "@/lib/types";

export default function SearchBar({ mapState }: { mapState: MapState }) {
  const { search } = mapState;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(searchableData, { keys: ["name", "variants"], threshold: 0.3 }),
    []
  );

  // Define debounced search query handler
  const handleSearchQueryChange = useDebounce(
    (
      query: string,
      setResults: React.Dispatch<SetStateAction<SearchResult[]>>
    ) => {
      const results = fuse.search(query);
      setResults(results.map((result) => result.item));
      console.log("Debounced");
    },
    300
  );

  useEffect(() => {
    handleSearchQueryChange(search.query.value, search.results.set);
    return () => {
      handleSearchQueryChange.cancel();
    };
  }, [handleSearchQueryChange, search.query.value, search.results.set]);

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
