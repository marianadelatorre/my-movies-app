import api from "../api";

export const searchTvSeries = async (query: string) => {
  const endpoint = `search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
};


