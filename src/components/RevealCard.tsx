import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import Link from "next/link";

interface HoverRevealCardProps {
  id: number;
  title: string;
  year: string;
  poster: string;
  rating: number;
  overview: string;
}

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const HoverRevealCard: React.FC<HoverRevealCardProps> = ({
  id,
  title,
  year,
  poster,
  rating,
  overview,
}) => {
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
    <Link  href={`/movie/${id}`} passHref>
    <div className="group relative overflow-hidden rounded-lg shadow-md bg-white border border-gray-300 hover:shadow-lg transition-shadow duration-300">
      {/* Imagen */}
      <img
        src={poster ? `${BASE_IMAGE_URL}${poster}` : "/placeholder.png"}
        alt={title}
        className="w-full h-72 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
      />

      {/* Información básica */}
      <div className="p-4">
        <h2 className="font-semibold text-gray-900 truncate">{title}</h2>
        <p className="text-sm text-gray-600">{year}</p>
        <div className="flex justify-between items-center mt-2">
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

      {/* Información adicional */}
      <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-bold text-gray-900 text-lg mb-2">Sinopsis</h3>
        <p className="text-gray-700 text-sm text-center line-clamp-4">
          {overview || "No hay sinopsis disponible para esta película."}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default HoverRevealCard;
