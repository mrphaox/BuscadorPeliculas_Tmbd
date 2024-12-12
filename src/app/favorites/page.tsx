"use client";

import { useFavorites } from "../../context/FavoritesContext";
import Movie from "../../components/Movie";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-green-400">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-400">No tienes películas favoritas aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((movie) => (
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
      )}
    </div>
  );
};

export default Favorites;
