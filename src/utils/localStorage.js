// Utility functions pentru a menaja favorites in localStorage
export const getFavorites = () => {
    // Recuperam favorites din localStorage si analizam la JSON
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  };
  
  export const addFavorite = (movie) => {
    const favorites = getFavorites();
    if (!favorites.some((fav) => fav.id === movie.id)) {
      favorites.push(movie);
      // Updatam localStorage cu noi array uri
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };
  
  export const removeFavorite = (movieId) => {
    // Inlocuim un movie din favorite prin filtrearea filmului cu id
    let favorites = getFavorites();
    favorites = favorites.filter((fav) => fav.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
   // Verificam daca movie este in favorite prin ID
  export const isFavorite = (movieId) => {
    const favorites = getFavorites();
    return favorites.some((fav) => fav.id === movieId);
  };