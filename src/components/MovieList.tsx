import React from "react";
import RevealCard from "./RevealCard";

interface MovieListProps {
  movies: {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    overview: string;
  }[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <RevealCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.release_date}
          poster={movie.poster_path}
          rating={movie.vote_average * 10}
          overview={movie.overview}
        />
      ))}
    </div>
  );
};

export default MovieList;
