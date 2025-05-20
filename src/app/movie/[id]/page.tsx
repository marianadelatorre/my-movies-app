"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getMovieById } from "@/services/movies/getMovieById";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import { useGuestSession } from "@/providers/GuestSessionContext";
import { useParams } from "next/navigation";
import RecommendationsCarousel from "@/Components/Carrousel/RecommendationsCarousel";
import { getMovieRecommendations } from "@/Services/Movies/getMovieRecommendations";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { guestSessionId } = useGuestSession();

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    
    const fetchMovieAndRecommendations = async () => {
      setLoading(true);
      try {
        const [movieData, recommendationsData] = await Promise.all([
          getMovieById(id),
          getMovieRecommendations(id),
        ]);
        
        setMovie(movieData);
        setRecommendations(recommendationsData.results || []); 
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Could not load movie or recommendations.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieAndRecommendations();
  }, [id]);

  //verificar local storage
  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const storedFavorites = localStorage.getItem("favoriteMovieIds");
    const favoriteIds: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
    setIsFavorite(favoriteIds.includes(Number(id)));
  }, [id]);

  // marcar como favoritos
  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;
    const newFavoriteState = !isFavorite;
    try {
      await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
      setIsFavorite(newFavoriteState);
      const storedFavorites = localStorage.getItem("favoriteMovieIds");
      const favoriteIds: number[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      const updatedFavorites = newFavoriteState
        ? [...new Set([...favoriteIds, movie.id])]
        : favoriteIds.filter((id) => id !== movie.id);
      localStorage.setItem(
        "favoriteMovieIds",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  if (loading) return <div>Loading movie...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl w-full sm:w-64"
          width={300}
          height={450}
        />
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="italic text-slate-500">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <div>
            <strong>Release:</strong> {movie.release_date}
          </div>
          <div>
            <strong>Genres:</strong>{" "}
            {movie.genres?.map((g: any) => g.name).join(", ")}
          </div>
          <div>
            <strong>Rating:</strong> {movie.vote_average?.toFixed(1)}
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`px-4 py-2 rounded ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-white font-bold w-max`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      
      <h2 className="text-xl font-semibold mt-6">Recommended Movies</h2>
      {recommendations.length > 0 ? (
        <RecommendationsCarousel movies={recommendations} type="movie" />

      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default MovieDetailPage;



