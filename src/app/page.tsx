'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/searchBar";
import { getTrendingMovies } from "@/Services/Movies/getTrendingMovies";
import { getTrendingSeries } from "@/Services/Movies/getTrendingSeries";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        console.error("Failed to fetch trending movies", error);
      }
    };

    const fetchTrendingSeries = async () => {
      try {
        const data = await getTrendingSeries();
        setTrendingSeries(data);
      } catch (error) {
        console.error("Failed to fetch trending series", error);
      }
    };

    fetchTrendingMovies();
    fetchTrendingSeries();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8 px-6 py-8">
      
      <div
        className="w-full max-w-5xl relative flex flex-col items-center justify-center bg-cover bg-center rounded-lg shadow-lg"
        style={{
          height: "400px",
          backgroundImage:
            "url('https://s3.amazonaws.com/criterion-production/spotlight_images/8530-e2def711ac6482132b4d7711728804df/qYDwYetXEmrm0zwg2ROaVYHKQVaSSA_original.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20 pointer-events-none rounded-lg"></div>
        <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">
          <h1 className="text-white text-4xl font-serif mb-6 text-center">
            Welcome to the Criterion page
          </h1>
          <SearchBar />
        </div>
      </div>


      <div
        className="w-full max-w-5xl overflow-y-auto p-6 bg-white rounded-lg shadow-md"
        style={{ height: "400px" }}
      >
        <h2 className="text-black text-2xl font-serif mb-6 text-left">
          Trending Series
        </h2>
        {trendingSeries.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto">
            {trendingSeries.map((series) => (
              <Link href={`/series/${series.id}`} key={series.id}>
                <div className="flex-shrink-0 w-40 text-center cursor-pointer hover:scale-105 transition-transform duration-200">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${series.poster_path}`}
                    alt={series.name}
                    className="w-full h-auto rounded-lg shadow"
                  />
                  <p className="mt-2 text-base font-medium text-black">
                    {series.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-black text-center">Loading trending series...</p>
        )}
      </div>


      <div
        className="w-full max-w-5xl overflow-y-auto p-6 bg-white rounded-lg shadow-md"
        style={{ height: "400px" }}
      >
        <h2 className="text-black text-2xl font-serif mb-6 text-left">
          Trending Movies
        </h2>
        {trendingMovies.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto">
            {trendingMovies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="flex-shrink-0 w-40 text-center cursor-pointer hover:scale-105 transition-transform duration-200">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg shadow"
                  />
                  <p className="mt-2 text-base font-medium text-black">
                    {movie.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-black text-center">Loading trending movies...</p>
        )}
      </div>
    </div>
  );
}
