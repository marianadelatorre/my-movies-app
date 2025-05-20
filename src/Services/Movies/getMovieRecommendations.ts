import api from "../api";

export const getMovieRecommendations = async (movieId: string) => {
    let res: any;
    const endpoint = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;

    try {
        const response = await api.get(endpoint);  
        res = response.data;
    } catch (err) {
        res = err.response ? err.response.data : err.message; 
    }

    return res;
}
