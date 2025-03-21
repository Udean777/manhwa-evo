// hooks/useManhwaSearch.ts
import { useState } from "react";
import api from "@/utils/interceptor";

interface ManhwaSearchItem {
  title: string;
  url: string;
  image: string;
  latestChapter: string;
  rating: string;
}

interface PaginationItem {
  pageUrl: string;
  pageNumber: string;
}

interface SearchResponse {
  seriesList: ManhwaSearchItem[];
  pagination: PaginationItem[];
  nextPage: string | null;
}

interface SearchState {
  results: ManhwaSearchItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

interface SearchActions {
  search: (query: string) => void;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export default function useManhwaSearch(): [SearchState, SearchActions] {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ManhwaSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  // Function to fetch search results
  const fetchSearchResults = async (searchQuery: string, page: number) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const endpoint =
        page === 1
          ? `/api/search/${encodeURIComponent(searchQuery)}`
          : `/api/search/${encodeURIComponent(searchQuery)}/page/${page}`;

      const response = await api.get<SearchResponse>(endpoint);

      setResults(response.data.seriesList);
      setHasNextPage(!!response.data.nextPage);

      // Calculate total pages from pagination data
      if (response.data.pagination && response.data.pagination.length > 0) {
        const numericPages = response.data.pagination
          .filter((item) => !isNaN(Number(item.pageNumber)))
          .map((item) => Number(item.pageNumber));

        if (numericPages.length > 0) {
          setTotalPages(Math.max(...numericPages));
        }
      }

      setCurrentPage(page);
    } catch (err: any) {
      console.error("Search error:", err);
      setError("Failed to search manhwa. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Expose simple actions for the component to use
  const search = (newQuery: string) => {
    setQuery(newQuery);
    fetchSearchResults(newQuery, 1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && (page <= totalPages || hasNextPage)) {
      fetchSearchResults(query, page);
    }
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      goToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Group state and actions for easier consumption
  const state: SearchState = {
    results,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
  };

  const actions: SearchActions = {
    search,
    goToPage,
    goToNextPage,
    goToPrevPage,
  };

  return [state, actions];
}
