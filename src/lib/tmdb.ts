import axios from "axios";

// Configuración del cliente Axios
const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3", // URL base de la API
    headers: {
      accept: "application/json", // Tipo de contenido
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, // Token de acceso
    },
  });

// Función para obtener películas populares
export const fetchPopularMovies = async (page: number = 1) => {
    try {
      const response = await tmdbApi.get("/movie/popular", {
        params: {
          language: "en-US",
          page: page,
        },
      });
      return response.data;
    } catch (error: any) {
        if (error.response) {
          // Error relacionado con la respuesta de la API
          console.error("Código de estado:", error.response.status);
          console.error("Cabeceras de la respuesta:", error.response.headers);
          console.error("Datos de la respuesta:", error.response.data);
        } else if (error.request) {
          // Error relacionado con la solicitud
          console.error("Solicitud sin respuesta:", error.request);
        } else {
          // Error desconocido
          console.error("Mensaje de error:", error.message);
        }
        throw new Error("No se pudieron cargar las películas populares.");
      }
  };
  

// Función para buscar películas
export const searchMovies = async (query: string, page: number = 1) => {
  try {
    const response = await tmdbApi.get("/search/movie", {
      params: { query, language: "en-US", page },
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar películas:", error);
    throw new Error("No se pudieron realizar los resultados de búsqueda.");
  }
};

// Función para obtener detalles de una película
export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await tmdbApi.get("/movie/${movieId}", {
      params: { language: "en-US" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de la película:", error);
    throw new Error("No se pudieron cargar los detalles de la película.");
  }
};
