'use client';

import React, { useEffect, useState } from "react";
import { getTopRated } from "@/services/movies/getTopRated";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";

const TopRatedPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        const data = await getTopRated(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        console.log("Current page:", currentPage);
        console.log("Movies fetched:", data.results.map((m: any) => m.title));
      } catch (err) {
        console.error("Error loading movies:", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Top Rated Movies</h3>

      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={{
              pathname: `/movie/${movie.id}`,
              query: { from: "TopRated" },
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

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TopRatedPage;


