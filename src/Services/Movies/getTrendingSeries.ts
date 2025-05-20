import api from "../api";

export const getTrendingSeries = async () => {
  const endpoint = `https://api.themoviedb.org/3/trending/tv/day?language=en-US`;

  try {
    const res = await api.get(endpoint);
    return res.data.results; 
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
};

