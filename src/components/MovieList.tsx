  "use client";
  
  import React, { useState } from "react";
  import Movie from "./Movie";

  interface MovieListProps {
    movies: {
      id: number;
      title: string;
      release_date: string;
      poster_path: string;
      vote_average: number;
    }[];
  }

  const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    const handleFavorite = (id: number) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
      );
      // Guardar en localStorage
      localStorage.setItem(
        "favorites",
        JSON.stringify(
          favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id]
        )
      );
    };

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.release_date}
            poster={movie.poster_path}
            rating={movie.vote_average * 10}
          />
        ))}
      </div>
    );
  };

  export default MovieList;
