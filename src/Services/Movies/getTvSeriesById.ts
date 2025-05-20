import api from "../api";

export const getSeriesById = async (id: string) => {
  try {
    const { data } = await api.get(`/tv/${id}`, {
      params: {
        language: "en-US",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
