import api from "../api";

export const getTopRated = async (page: number = 1) => {
  let res: any;
  const endpoint = `movie/top_rated?language=en-US&page=${page}`;
  try {
    const response = await api.get(endpoint);
    res = response.data;
  } catch (err) {
    res = err.response;
  }
  return res;
};
