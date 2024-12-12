import { fetchMovieDetails } from "@/lib/tmdb";
import { useFavorites } from "@/context/FavoritesContext";

const MovieDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const movie = await fetchMovieDetails(id);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.includes(movie.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <button
        className={`mt-4 px-4 py-2 ${
          isFavorite ? "bg-red-500" : "bg-blue-500"
        } text-white rounded`}
        onClick={() => (isFavorite ? removeFavorite(movie.id) : addFavorite(movie.id))}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieDetail;
