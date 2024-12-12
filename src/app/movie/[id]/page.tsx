import axios from "axios";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = async ({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  const id = params?.id; // Asegúrate de que params sea válido

  if (!id) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-red-400 mb-4">
          Película no encontrada
        </h1>
      </div>
    );
  }

  try {
    // Obtener los detalles de la película
    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: { language: "en-US" },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const movieDetails = movieResponse.data;

    // Obtener videos relacionados (tráiler)
    const videoResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        params: { language: "en-US" },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const trailers = videoResponse.data.results.filter(
      (video: any) => video.type === "Trailer"
    );

    const trailerUrl = trailers.length
      ? `https://www.youtube.com/embed/${trailers[0].key}`
      : null;

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          {movieDetails.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`${BASE_IMAGE_URL}${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="w-full md:w-1/3 rounded-lg shadow-md"
          />
          <div className="flex flex-col flex-grow">
            <p className="text-lg mb-2">
              <strong>Fecha de lanzamiento:</strong> {movieDetails.release_date}
            </p>
            <p className="text-lg mb-2">
              <strong>Puntuación:</strong>{" "}
              {movieDetails.vote_average.toFixed(1)}
            </p>
            <p className="text-lg mb-2">
              <strong>Géneros:</strong>{" "}
              {movieDetails.genres
                .map((genre: any) => genre.name)
                .join(", ")}
            </p>
            <p className="text-lg mb-4">
              <strong>Descripción:</strong> {movieDetails.overview}
            </p>
          </div>
        </div>
        {trailerUrl && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-green-400">Tráiler:</h3>
            <iframe
              className="w-full aspect-video"
              src={trailerUrl}
              title="Tráiler"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error al cargar los detalles de la película:", error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-red-400 mb-4">
          Error al cargar los detalles
        </h1>
        <p className="text-gray-400">Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }
};

export default MovieDetails;
