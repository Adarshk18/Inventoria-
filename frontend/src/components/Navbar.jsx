import {
  Box,
  Button,
  Container,
  IconButton,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      w="100%"
      bg={useColorModeValue("gray.50", "gray.900")}
      px={4}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="1140px">
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          flexDir={{ base: "column", sm: "row" }}
          py={{ base: 2, sm: 0 }}
        >
          {/* Title */}
          <Text
            fontSize={{ base: "20px", md: "26px" }}
            fontWeight="bold"
            textTransform="uppercase"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
            textAlign="center"
          >
            <Link to="/">Product Store 🛒</Link>
          </Text>

          

          {/* Actions */}
          <HStack spacing={3} mt={{ base: 2, sm: 0 }}>
            <Tooltip label="Add Product" hasArrow>
              <Link to="/create">
                <IconButton
                  icon={<PlusSquareIcon />}
                  aria-label="Add Product"
                  variant="outline"
                  size="sm"
                  colorScheme="blue"
                />
              </Link>
            </Tooltip>

            <Tooltip
              label={colorMode === "light" ? "Dark Mode" : "Light Mode"}
              hasArrow
            >
              <IconButton
                icon={colorMode === "light" ? <IoMoon /> : <LuSun />}
                aria-label="Toggle Color Mode"
                onClick={toggleColorMode}
                size="sm"
                variant="outline"
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
