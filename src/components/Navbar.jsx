
import { Box, Flex, Container,Drawer,DrawerBody,DrawerCloseButton,DrawerContent,
  DrawerHeader,DrawerOverlay,
  IconButton,
  useDisclosure,} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

   return (
    <Box py="4" mb="2">
        <Container maxW={'container.xl'}>
            <Flex justifyContent={"space-between"}>
              <Link to="/">
                 <Box 
                 fontSize={"3xl"} 
                 fontWeight={"bold"} 
                 color={"red"} 
                 letterSpacing={"widest"} 
                 fontFamily={"Roboto"}
                 >
                   MOVIETIME
                 </Box>
              </Link>
                  
                <Flex gap="4" alignItems={"center"}
                      display={{ base: "none", md: "flex" }}
                >
                    <Link to="/"> Home</Link>
                    <Link to="/movies"> Movies</Link>
                    <Link to="/shows"> Series</Link>
                    <Link to="/search"> Search</Link>
                    <Link to="/favorites"> Favorites</Link>
                </Flex>
            </Flex>
        </Container>
    
        <Flex
              display={{ base: "flex", md: "none" }}
               alignItems={"center"}
                gap="4"
        >
           <Link to="/search">
            <SearchIcon fontSize={"xl"} />
             </Link>
                <IconButton fontSize={"xl"} onClick={onOpen} icon={<HamburgerIcon />} />
                 <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                 <DrawerOverlay />
                <DrawerContent bgGradient='linear(to-r, yellow.400, pink.200)'>
                   <DrawerCloseButton />
                  <DrawerHeader />
                     <DrawerBody>
                     <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                       <Link to="/">Home</Link>
                        <Link to="/movies">Movies</Link>
                      <Link to="/shows">TV Shows</Link>
                         <Link to="/favorites">Favorites</Link>
                           </Flex>
                        </DrawerBody>
                    </DrawerContent>
                     </Drawer>
                             </Flex>

    
      </Box>
      );

};



export default Navbar;