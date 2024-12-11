import React, { SetStateAction, useEffect, useMemo, useRef } from "react";
import { MapState } from "../map/useMapState";
import useDebounce from "@/hooks/useDebounce";
import Fuse from "fuse.js";
import { searchableData } from "@/lib/map/mapData";
import { SearchResult } from "@/lib/types";
import { Search } from "lucide-react";
import MonsterCard from "../thingCards/MonsterCard";

export default function SearchBar({ mapState }: { mapState: MapState }) {
  const { search } = mapState;
  // Get just the setter to avoid value dep in use effect
  const setSearchResultsOpen = search.resultsOpen.set;

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

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
      if (results.length > 0) {
        setSearchResultsOpen(true);
      } else if (results.length === 0) {
        setSearchResultsOpen(false);
      }
    },
    300
  );

  // Update the search results when the query value changes
  useEffect(() => {
    handleSearchQueryChange(search.query.value, search.results.set);
    return () => {
      handleSearchQueryChange.cancel();
    };
  }, [handleSearchQueryChange, search.query.value, search.results.set]);

  // Hide the search results when clicking outside of results and input
  useEffect(() => {
    const closeOnClickHandler = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target as Node)
      ) {
        setSearchResultsOpen(false);
      }
    };
    window.addEventListener("click", closeOnClickHandler);

    return () => {
      window.removeEventListener("click", closeOnClickHandler);
    };
  }, [setSearchResultsOpen]);

  return (
    <div className="absolute top-0 right-0 z-10 mt-3 w-full flex flex-col items-center justify-center gap-3">
      <div className="relative mt-1">
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
      </div>
      <div
        ref={searchResultsRef}
        className={`${
          search.resultsOpen.value ? "" : "hidden"
        } max-h-52 w-64 md:w-80 lg:w-96 p-2 space-y-2 bg-sidebar border border-sidebar-border rounded-md overflow-y-auto`}
      >
        {search.results.value.map((value) => {
          if (value.dataType === "monster") {
            return (
              <MonsterCard
                monster={value}
                mapState={mapState}
                key={value.name}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
