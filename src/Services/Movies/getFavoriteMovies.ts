import api from "../api";

export const getFavoriteMovies = async (guestSessionId: string, page: number = 1) => {
  const endpoint = `guest_session/${guestSessionId}/favorite/movies?language=en-US&page=${page}`;
  try {
    const res = await api.get(endpoint);
    return res.data;
  } catch (err) {
    console.error("API error: ", err);
    throw err;
  }
};
