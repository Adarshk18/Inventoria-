import React, { useEffect, useState } from "react";
import {
  Container,
  VStack,
  SimpleGrid,
  Input,
  Select,
  Spinner,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    loadData();
  }, [fetchProducts]);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  const inputBg = useColorModeValue("white", "whiteAlpha.200");


  return (
    <Container maxW="container.xl" py={10} transition="all 0.3s ease">
      <VStack spacing={6}>
        {/* Removed the duplicate heading */}
        
        {/* Search and Sort UI */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          w="full"
          justify="center"
          align="center"
          my={6}
        >
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxW="300px"
            bg={inputBg}
            color={useColorModeValue("black", "white")}
            transition="all 0.2s ease"
          />

          <Select
            placeholder="Sort by price"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            maxW="200px"
            bg={inputBg}
            color={useColorModeValue("black", "white")}
            transition="all 0.2s ease"
          >
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </Select>
        </Flex>

        {/* Products */}
        {loading ? (
          <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
        ) : (
          <>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              w="full"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>

            {filteredProducts.length === 0 && (
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.500"
                textAlign="center"
              >
                No matching products 😢{" "}
                <Link to="/create">
                  <Text
                    as="span"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Create one
                  </Text>
                </Link>
              </Text>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
