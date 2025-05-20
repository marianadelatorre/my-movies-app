"use client";

import React, { useEffect, useState } from "react";
import MovieList from "@/Components/MovieList/MovieList";
import { getFavoriteMovies } from "@/Services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavoriteMovies(guestSessionId, currentPage);
        setItems(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">My Favorite Movies</h3>

      {loading && (
        <h5 className="text-lg text-gray-500">Loading favorites...</h5>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">You don't have any favorite movies yet.</p>
          <p className="text-sm mt-2">
            Go to a movie detail page and click <strong>Add to Favorites</strong> to see it here.
          </p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <>
          <MovieList movies={items} />
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
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
        </>
      )}
    </div>
  );
};

export default MyFavoritesPage;



