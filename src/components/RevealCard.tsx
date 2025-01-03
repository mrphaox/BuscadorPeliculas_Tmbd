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

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Detiene la propagación del evento de clic
    e.preventDefault(); // Evita que el Link navegue al hacer clic en el corazón

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
    <Link href={`/movie/${id}`} passHref>
      <div className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-900 border border-gray-700 hover:shadow-xl transition-shadow duration-300">
        {/* Imagen del Poster */}
        <div className="relative">
          <img
            src={poster ? `${BASE_IMAGE_URL}${poster}` : "/placeholder.png"}
            alt={title}
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Ícono de Favorito */}
          <div
            className="absolute top-2 right-2 text-2xl text-red-500 bg-gray-800 bg-opacity-75 rounded-full p-1 cursor-pointer z-10"
            onClick={handleFavorite} // Maneja el clic aquí
          >
            {isFavorite(id) ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>

        {/* Información Básica */}
        <div className="p-4 bg-gray-800">
          <h2 className="font-bold text-lg text-white truncate">{title}</h2>
          <p className="text-sm text-gray-400">{year}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm font-bold text-green-500 bg-green-900 px-3 py-1 rounded-full">
              {rating.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Información Adicional al Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-75 p-4 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-bold text-xl mb-2 text-center">{title}</h3>
          <p className="text-sm text-center line-clamp-5">{overview || "No hay sinopsis disponible para esta película."}</p>
        </div>
      </div>
    </Link>
  );
};

export default HoverRevealCard;
