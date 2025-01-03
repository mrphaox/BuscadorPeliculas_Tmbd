"use client";

import { useState, useEffect } from "react";
import { fetchPopularMovies, searchMovies } from "../lib/tmdb";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { useFavorites } from "../context/FavoritesContext";
import Movie from "@/components/Movie";

export default function Home() {
  // Estado para almacenar la lista de películas
  const [movies, setMovies] = useState<any[]>([]);
  const [query, setQuery] = useState<string>(""); // Estado para la búsqueda
  const [page, setPage] = useState<number>(1); // Estado para la página actual
  const [totalResults, setTotalResults] = useState<number>(0); // Total de resultados
  const { favorites } = useFavorites(); //hooks

  // Cargar películas populares al cargar la página
  useEffect(() => {
    const loadPopularMovies = async () => {
      const data = await fetchPopularMovies(page);
      setMovies(data.results);
      setTotalResults(data.total_results);
    };
    loadPopularMovies();
  }, [page]);

  // Manejar búsqueda
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
      console.error("Error en la búsqueda:", error);
      alert(
        "No se pudieron obtener los resultados de búsqueda. Intenta de nuevo."
      );
    }
  };

  // Cambio de página
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handleSearch(query, newPage);
  };

  // Envio consulta de búsqueda
  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    handleSearch(searchQuery, 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <header className="w-full bg-gray-900 text-white py-4 mb-6">
      <link rel="icon" href="/icono.png" type="image/png" />
        <h1 className="text-center text-3xl font-bold">
          Movie Scorer Explorer
        </h1>
      </header>
      <SearchBar onSearch={handleSearchSubmit} />
      <br />
      <div className="container mx-auto px-4">
        <MovieList movies={movies} />
        {totalResults > 0 && (
          <Pagination
            currentPage={page}
            totalResults={totalResults}
            resultsPerPage={20}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
