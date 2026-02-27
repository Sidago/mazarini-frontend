"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { searchContent, type SearchResults } from "@/lib/api/search";

interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResults | null;
  isLoading: boolean;
  reset: () => void;
}

export function useSearch(debounceMs: number = 300): UseSearchReturn {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!query.trim()) {
      setResults(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      searchContent(query)
        .then((data) => setResults(data))
        .catch(() => setResults(null))
        .finally(() => setIsLoading(false));
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, debounceMs]);

  const reset = useCallback(() => {
    setQuery("");
    setResults(null);
    setIsLoading(false);
  }, []);

  return { query, setQuery, results, isLoading, reset };
}
