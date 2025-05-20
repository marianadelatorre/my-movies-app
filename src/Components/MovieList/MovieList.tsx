'use client';

import React from "react";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
};

type MovieListProps = {
  movies: Movie[];
  origin?: string;
};

const MovieList = ({ movies, origin = "Unknown" }: MovieListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={{
            pathname: `/movie/${movie.id}`,
            query: { from: origin },
          }}
        >
          <MovieCard
            title={movie.title}
            posterPath={movie.poster_path}
            releaseYear={new Date(movie.release_date).getFullYear()}
            voteAverage={movie.vote_average}
            description={movie.overview}
          />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;