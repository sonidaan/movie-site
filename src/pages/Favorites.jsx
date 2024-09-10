import { Box, Container, Flex, Button, Grid, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent';
import { getFavorites, removeFavorite } from '../utils/localStorage';

 // State management for favorites
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites din localStorage on component mount
    setFavorites(getFavorites());
  }, []);

  const handleRemoveFavorite = (movieId) => {
    // Remove a favorite and update the state
    removeFavorite(movieId);
    setFavorites(getFavorites());
  };

  return (
    <Container maxW={'container.xl'}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} my="10">
        Favorites
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
        {favorites.map((item, i) => (
          <Box key={item.id} position="relative">
            <Flex direction="column">
              <CardComponent item={item} type={item.media_type} />
              <Button
                mt={2}
                colorScheme="red"
                position="absolute"
                top="0"
                right="0"
                onClick={() => handleRemoveFavorite(item.id)}
              >
                Remove
              </Button>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
