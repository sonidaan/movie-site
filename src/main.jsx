import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider,  ColorModeScript } from '@chakra-ui/react';
import App from './App.jsx';
import './index.css';
import theme from '../theme.js';
import Movies from "./pages/movies/Movies.jsx";
import Shows from "./pages/shows/Shows.jsx";
import Home from "./pages/Home.jsx";
import Search from './pages/search/Search.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import Favorites from './pages/Favorites.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/movies",
        element: <Movies/>,
      },
      {
        path: "/shows",
        element: <Shows/>,

      }, 
      
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },


    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      
        <RouterProvider router={router} />
      
    </ChakraProvider>
  </React.StrictMode>
);