'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchMovies } from "@/services/movies/getFindMovie";
import { searchTvSeries } from "@/services/movies/getFindSeries";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchType, setSearchType] = useState<"movie" | "tv">("movie");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      let data;
      if (searchType === "movie") {
        data = await searchMovies(query);
      } else if (searchType === "tv") {
        data = await searchTvSeries(query);
      } else {
        console.warn("searchType desconocido:", searchType);
        return;
      }
      setResults(data.results || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search failed:", error);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectItem = (id: number) => {
    setShowDropdown(false);
    console.log("Navegando a detalle:", searchType, id);
    if (searchType === "movie") {
      router.push(`/movie/${id}`);
    } else if (searchType === "tv") {
      router.push(`/series/${id}`);
    } else {
      console.warn("Tipo de búsqueda no reconocido:", searchType);
    }
  };

  return (
    <div className="relative p-4" ref={dropdownRef}>
      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-6 py-2 rounded-full transition-colors duration-300 ${
            searchType === "movie"
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
          onClick={() => setSearchType("movie")}
        >
          Movies
        </button>
        <button
          className={`px-6 py-2 rounded-full transition-colors duration-300 ${
            searchType === "tv"
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
          onClick={() => setSearchType("tv")}
        >
          TV Series
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder={`Search for a ${
            searchType === "movie" ? "movie" : "TV series"
          }...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-white text-black border border-gray-400 px-5 py-2 rounded-full hover:bg-gray-100 transition"
        >
          Search
        </button>
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 left-4 right-4 bg-white border border-gray-300 rounded shadow-lg max-h-[400px] overflow-y-auto">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                console.log("Item seleccionado:", item);
                handleSelectItem(item.id);
              }}
              className="flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
            >
              {item.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={searchType === "movie" ? item.title : item.name}
                  width={50}
                  height={75}
                  className="rounded"
                  priority={false}
                />
              ) : (
                <div className="w-[50px] h-[75px] bg-gray-200 flex items-center justify-center text-gray-500 text-xs rounded">
                  No Image
                </div>
              )}
              <span className="text-sm font-medium text-black">
                {searchType === "movie" ? item.title : item.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;








