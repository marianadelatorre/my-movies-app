import api from "../api";

export const getTrendingMovies = async () => {
  const endpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

  try {
    const res = await api.get(endpoint);
    return res.data.results; 
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
};














