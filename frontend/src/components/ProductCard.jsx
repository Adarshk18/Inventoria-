import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Tooltip,
  Input,
} from "@chakra-ui/react";

import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct , updateProduct} = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  
  const handleUpdateProduct = async (pid, updatedProduct) => {
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image || !updatedProduct.description) {
      toast({
        title: "Invalid Input",
        description: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        objectFit="contain"
  w="100%"
  h="200px"
  borderTopRadius="md"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ₹{product.price}
        </Text>

        <Text fontSize="sm" color="gray.500" mb={2}>
  {product.description}
</Text>


        <HStack spacing={2}>
        <Tooltip label="Edit Product" hasArrow>
          <IconButton icon={<EditIcon />} onClick={onOpen}
          colorScheme="blue"
          aria-label="Edit Product" />
          </Tooltip>
          <Tooltip label="Delete Product" hasArrow>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => {
              handleDeleteProduct(product._id);
            }}
            colorScheme="red"
            aria-label="Delete Product"
          />
          </Tooltip>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                }
              />
              <Input
  placeholder="Description"
  name="description"
  value={updatedProduct.description}
  onChange={(e) =>
    setUpdatedProduct({ ...updatedProduct, description: e.target.value })
  }
/>

            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() =>handleUpdateProduct(product._id,updatedProduct)}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
