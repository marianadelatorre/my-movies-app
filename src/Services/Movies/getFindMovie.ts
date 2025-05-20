import api from "../api";

export const searchMovies = async (query: string) => {
  const endpoint = `search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
};

