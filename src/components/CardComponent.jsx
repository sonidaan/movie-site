import { Box, Image, Text, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { imagePath } from '../services/api';

const CardComponent = ({item, type}) => {
const title = item?.title || item?.name;

  return (
    <Link to={`/${type}/${item?.id}`}>
      <Box position={"relative"}
        transform={"scale(1)"} _hover={{
          transform: { base: "scale(1)", md: "scale(1.10)" },
          transition: "transform 0.4s ease-in-out",
          zIndex: "10",
          "& .overlay": {
            opacity: 1,
          }
        }}>
        <Image src={`${imagePath}/${item?.poster_path}`}
          alt={item?.title || item?.name} height={"100%"} />

        <Box className="overlay"
          position={"absolute"} p="2" bottom={"0"}
          left={"0"} w={"100%"} h={"20%"}
          bgGradient='linear(to-r, green.200, pink.500)'
          transparent={"50%"}
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}>

          <Text textAlign={"center"}
            color="rgba(255,255,255)"
          > {item?.title || item?.name}
          </Text>
          <Text textAlign={"center"}>
            {new Date(item?.release_date || item?.first_air_date).getFullYear() || "N/A"}
          </Text>
          <Flex
            position="absolute" top="30px" right="10px"
            fontSize="small"
          >
            <StarIcon fontSize={"small"} />
            <Text>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>

      </Box>
    </Link>
  );
};

export default CardComponent;