import { useEffect, useState, } from "react";
import { Container, Heading, Grid, Flex, Box, Skeleton} from "@chakra-ui/react";
import { fetchTrending } from "../services/api";
import  CardComponent  from "../components/CardComponent"


 // State management pt trending data and loading status
const Home =() => {
  const [data, setData] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [timeWindow, setTimeWindow] = useState('day');
  
  useEffect(() => {
    setLoading(true);
    // Fetch trending movies/series pt cand se schimba timeWindow
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
     .catch((err) =>{
      console.log(err,'err');
     }).finally(() =>{
      setLoading(false);
     })

},[timeWindow]);// Dependency array include timeWindow

   console.log(data, 'data');


  return (
    <Container maxW={'container.xl'}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        
        Trending
      
      </Heading>
      <Flex alignItems={"center"} gap={"2"} border={"1px solid orange"} borderRadius={"25px"}>
        
        <Box as="button" px="3" py="1" borderRadius={"25px"} 
        bg={`${timeWindow === 'day' ? "#4FD1C5" : ""}`}
         onClick={() => setTimeWindow("day")}>
          Today
          </Box>
        
        <Box as="button" px="3" py="1" borderRadius={"25px"}
        bg={`${timeWindow === 'week' ? "#4FD1C5" : ""}`}
        onClick={() => setTimeWindow("week")} >
          This Week</Box>
      </Flex>
      </Flex>

    {/*loading && <div>Loading...</div>*/}

    
    
    <Grid 
    templateColumns={{
      base: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(4, 1fr)",
      lg: "repeat(5, 1fr)",
    }}
    gap={"4"}
    >
      {data && data?.map((item , i) =>
        loading ? (
          <Skeleton height={0} key={i} />
        ) : (
          <CardComponent key={item?.id} item ={item} type={item?.media_type} />
        )
      )};
    

    </Grid>
    </Container>
  );
};

export default Home;
