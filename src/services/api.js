// Importam axios pt a face HTTP requests
import axios from "axios" ;
// Image base carari pt TMDB API
export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal= "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// Fetch trending movies or series

export const fetchTrending = async (timeWindow = "day") => {
    const { data } = await axios.get(`${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
    );

        return data?.results;
};


// Fetch detalii specifice pt movie or series

export const fetchDetails = async (type, id) =>{
    const res= await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
    return res?.data;
}
// Fetch movies cu paginare si sortare
export const fetchMovies = async (page, sortBy) => {
    const res = await axios.get(
      `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
    );
    return res?.data;
  };
// Fetch series cu paginare si sortare
  export const fetchTvSeries = async (page, sortBy) => {
    const res = await axios.get(
      `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
    );
    return res?.data;
  };

// Search for movies, series
  export const searchData = async (query, page) => {
    const res = await axios.get(
      `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
    );
    return res?.data
  };



