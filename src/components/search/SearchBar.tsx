import { SetStateAction, useEffect, useMemo, useRef } from "react";
import { MapState } from "../map/useMapState";
import useDebounce from "@/hooks/useDebounce";
import Fuse from "fuse.js";
import { searchableData } from "@/lib/map/mapData";
import { SearchResult } from "@/lib/types";
import { Search } from "lucide-react";

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
    <div className="absolute top-0 z-10 right-0 mt-3 w-full flex items-center justify-center h-12">
      <div className="relative">
        <Search className="absolute left-0 h-full ml-1 stroke-sidebar-accent pointer-events-none" />
        <input
          className="h-10 w-36 md:w-48 lg:w-64 text-sidebar-foreground bg-sidebar rounded-md border border-sidebar-border pl-8 pr-1"
          ref={searchInputRef}
          value={search.query.value}
          onChange={(e) => {
            search.query.set(e.target.value);
          }}
          type="search"
          id="map-search"
          name="query"
        />
        <div
          className={`${
            search.results.value.length > 0 ? "" : "hidden"
          } absolute bottom-100 left-0 mt-2 h-content w-36 md:w-48 lg:w-64 bg-sidebar border border-sidebar-border rounded-md`}
        ></div>
      </div>
    </div>
  );
}
