import Link from "next/link";
import Image from "next/image";

interface Recommendation {
  id: number;
  title?: string;        
  name?: string;         
  poster_path: string;
}

interface RecommendationsCarouselProps {
  movies: Recommendation[];
  type?: "movie" | "series";  
}

const RecommendationsCarousel = ({
  movies,
  type = "movie",
}: RecommendationsCarouselProps) => {
  return (
    <div className="flex overflow-x-auto space-x-4 py-4">
      {movies.map((item) => {
        const itemTitle = type === "series" ? item.name : item.title;
        return (
          <Link
            key={item.id}
            href={`/${type}/${item.id}`}
            className="flex-shrink-0 w-40 cursor-pointer"
          >
            <div className="relative w-40 h-60 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={itemTitle || "No title"}
                fill
                style={{ objectFit: "cover" }}
                priority={false}
                sizes="160px"
              />
            </div>
            <p className="mt-2 text-center text-sm font-medium truncate">
              {itemTitle}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default RecommendationsCarousel;




