import { Container, Heading, Grid, Skeleton } from "@chakra-ui/react";
import { fetchMovies } from "../../services/api"
import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Movies =() => {
// State management pt movies data, loading status, sorting option, and pagination
  const [movies, setMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    // Fetch movies bazat pe current sorting option si page
    fetchMovies (activePage)
    .then((res) => {
      console.log(res, "res");
      setMovies(res?.results);
      setActivePage(res?.page);
      setTotalPages(res?.total_pages);

    })
    .catch((err) => console.log(err,"err"))
    .finally(() => setIsLoading(false));
 }, [activePage]);         // Dependency array include sortBy si page
  

  
  return (
    <Container maxW={'container.xl'}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        New Movies
      </Heading>
      <Grid 
    templateColumns={{
      base: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(4, 1fr)",
      lg: "repeat(5, 1fr)",
    }}
    gap={"4"}
    >
      {movies && movies?.map((item , i) =>
        isLoading ? (
          <Skeleton height={300} key={i} />
        ) : (
          <CardComponent key={item?.id} item ={item} type={"movie"} />
        )
      )};
    

    </Grid>
     {/*Pagination */}
    <PaginationComponent activePage={activePage} 
    totalPages={totalPages} 
    setActivePage={setActivePage} />
    </Container>
  )
};

export default Movies;