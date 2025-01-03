"use client";

import { useState, useEffect } from "react";
import { fetchPopularMovies, searchMovies } from "../lib/tmdb";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [query, setQuery] = useState<string>(""); // Search query state
  const [page, setPage] = useState<number>(1); // Current page state
  const [totalResults, setTotalResults] = useState<number>(0); // Total results

  // Load popular movies on component mount
  useEffect(() => {
    const loadPopularMovies = async () => {
      const data = await fetchPopularMovies(page);
      setMovies(data.results);
      setTotalResults(data.total_results);
    };
    loadPopularMovies();
  }, [page]);

  // Handle search
  const handleSearch = async (searchQuery: string, pageNumber: number = 1) => {
    try {
      if (searchQuery.trim() === "") {
        const data = await fetchPopularMovies(pageNumber);
        setMovies(data.results);
        setTotalResults(data.total_results);
      } else {
        const data = await searchMovies(searchQuery, pageNumber);
        setMovies(data.results);
        setTotalResults(data.total_results);
      }
      setPage(pageNumber);
    } catch (error) {
      console.error("Error in search:", error);
      alert(
        "Could not fetch search results. Please try again later."
      );
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handleSearch(query, newPage);
  };

  // Handle search submit
  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    handleSearch(searchQuery, 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="w-full bg-gray-900 text-white py-6 sm:py-8">
      <SearchBar onSearch={handleSearchSubmit} />
        
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Popular Movies
          </h1>
        </div>
          <div className="mt-8">
            <MovieList movies={movies} />
          </div>
          {totalResults > 0 && (
            <Pagination
              currentPage={page}
              totalResults={totalResults}
              resultsPerPage={20}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}
