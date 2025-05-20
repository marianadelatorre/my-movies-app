import api from "../api";

export const getSeriesRecommendations = async (seriesId: string) => {
  let res: any;
  const endpoint = `https://api.themoviedb.org/3/tv/${seriesId}/recommendations?language=en-US&page=1`;

  try {
    const response = await api.get(endpoint); 
    res = response.data;
  } catch (err: any) {
    res = err.response ? err.response.data : err.message;
  }

  return res;
};






