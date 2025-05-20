"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getSeriesById } from "@/services/movies/getTvSeriesById";
import { getSeriesRecommendations } from "@/services/movies/getSeriesRecommendations";
import { useParams } from "next/navigation";
import RecommendationsCarousel from "@/Components/Carrousel/RecommendationsCarousel";

const SeriesDetailPage = () => {
  const { id } = useParams();
  const [series, setSeries] = useState<any>();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchSeriesAndRecommendations = async () => {
      setLoading(true);
      try {
        const [seriesData, recommendationsData] = await Promise.all([
          getSeriesById(id),
          getSeriesRecommendations(id),
        ]);
        setSeries(seriesData);
        setRecommendations(recommendationsData.results || []);
      } catch (err) {
        console.error("Error fetching series data", err);
        setError("Could not load series or recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesAndRecommendations();
  }, [id]);

  if (loading) return <div>Loading series...</div>;
  if (error) return <div>{error}</div>;
  if (!series) return <div>No series found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
          className="rounded-xl w-full sm:w-64"
          width={300}
          height={450}
        />
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{series.name}</h1>
          <p className="italic text-slate-500">{series.tagline}</p>
          <p>{series.overview}</p>
          <div>
            <strong>First Air Date:</strong> {series.first_air_date}
          </div>
          <div>
            <strong>Genres:</strong>{" "}
            {series.genres?.map((g: any) => g.name).join(", ")}
          </div>
          <div>
            <strong>Rating:</strong> {series.vote_average?.toFixed(1)}
          </div>
        </div>
      </div>


      <h2 className="text-xl font-semibold mt-6">Recommended Series</h2>
      {recommendations.length > 0 ? (
        <RecommendationsCarousel movies={recommendations} type="series" />
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default SeriesDetailPage;


