import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";

interface MovieProps {
  id: number;
  title: string;
  year: string;
  poster: string;
  rating: number;
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const Movie: React.FC<MovieProps> = ({ id, title, year, poster, rating }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavorite = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite({
        id,
        title,
        release_date: year,
        poster_path: poster,
        vote_average: rating / 10,
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-1 bg-white border border-gray-300 rounded shadow-md w-60 h-96">
      <img
        src={poster ? `${BASE_IMAGE_URL}${poster}` : "/placeholder.png"}
        alt={title}
        className="w-full h-72 object-cover rounded-md"
      />
      <p className="mt-1 text-lg font-semibold text-center truncate text-gray-900">
        {title}
      </p>
      <p className="text-gray-600 text-center">{year}</p>
      <div className="flex items-center justify-between w-full mt-2">
        <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
          {rating.toFixed(1)}%
        </span>
        <div
          className="cursor-pointer text-2xl text-red-500"
          onClick={handleFavorite}
        >
          {isFavorite(id) ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>
    </div>
  );
};

export default Movie;