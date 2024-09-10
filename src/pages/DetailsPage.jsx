import React from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Container, Spinner, Image, Heading, Text, CircularProgressLabel, CircularProgress, Badge, Button } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { fetchDetails , imagePath, imagePathOriginal } from "../services/api";
import { ratingTtopPercentage } from "../utils/helpers";
import { resolveRatingColor } from "../utils/helpers";
import { addFavorite, removeFavorite, isFavorite } from "../utils/localStorage";

 // Extract parameters din URL
const DetailsPage = () => {
    const router = useParams();
    const { type, id } = router;
    // State management pt details, loading status, si favorite status
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [isFav, setIsFav] = useState(false);
    
    useEffect(() => {
        // Fetch details cand type or id se schimba
        fetchDetails(type,id)
        .then((res) => {
            setDetails(res);
            setIsFav(isFavorite(res.id));
        })
        .catch((err) => {
            console.log(err,"err");
        })
        .finally(() => {
            setLoading(false);
        });
    },[type, id]);  // Dependency array include type and id

    const handleFavorite = () => {
        if (isFav) {
            removeFavorite(details.id);
        } else {
            addFavorite({ ...details, media_type: type });
        }
        setIsFav(!isFav);
    };

    if (loading) {
        return (
            <Flex justify={"center"}>
                <Spinner size={"xl"} color="grey" />
            </Flex>
        );
    }

    const title = details?.title || details?.name;
    const releaseDate = type === "tv" ? details?.first_air_date : details?.release_date;

    return (
        <Box>
            <Box 
                background={`linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${imagePathOriginal}/${details?.backdrop_path})`}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                w={"100%"}
                h={{ base: "auto", md: "500px" }}
                py={"2"}
                zIndex={"-1"}
                display={"flex"}
                alignItems={"center"}
            >
                <Container maxW={"container.xl"}>
                    <Flex alignItems={"center"} gap="10" flexDirection={{base: "column", md: "row"}}>
                        <Image height={"450px"} borderRadius={"sm"} src={`${imagePath}/${details?.poster_path}`} />
                        <Box>
                            <Heading fontSize={"3xl"}>
                                <Text color ={"white"}>
                                    {title}{" "}
                                </Text>
                                <Text as="span" fontWeight={"normal"} color={"white"}>
                                    {new Date(releaseDate).getFullYear()}
                                </Text>
                            </Heading>
                            
                            <Flex alignItems={"center"} gap={"4"}>
                                <CircularProgress value={ratingTtopPercentage(details?.vote_average)} bg={"white"} borderRadius={"full"} 
                                    p={"0.7"} size={"60px"} color={resolveRatingColor(details?.vote_average)} thickness={"5px"} >
                                    <CircularProgressLabel fontSize={"lg"} color={"black"}>
                                        {ratingTtopPercentage(details?.vote_average)}
                                        <Box as={"span"} fontSize={"12px"}>%</Box>
                                    </CircularProgressLabel>
                                </CircularProgress>

                            </Flex>
                            <Text color={"beige"} fontSize={"lg"} fontStyle={"italic"}> 
                                {details?.tagline}
                            </Text>
                            <Heading fontSize={"xl"} mb={"3"}></Heading>
                            <Text fontSize={"md"} mb={"3"} color={"white"}>
                                {details?.overview}
                            </Text>
                            <Flex mt="6" gap="2">
                                {details?.genres?.map((genre) => (
                                    <Badge key={genre?.id} p="1">
                                        {genre?.name}
                                    </Badge>
                                ))}
                            </Flex>
                            <Button mt={4} colorScheme={isFav ? "red" : "teal"} onClick={handleFavorite}>
                                {isFav ? "Remove from Favorites" : "Add to Favorites"}
                            </Button>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
};

export default DetailsPage;
