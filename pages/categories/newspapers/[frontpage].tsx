import { useRouter } from "next/router";
import {
  Heading,
  Image,
  Box,
  IconButton,
  Link,
  Flex,
  Container,
  Center,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const Frontpage = () => {
  const router = useRouter();
  const { img, title } = router.query;
  console.log(router.query);
  return (
    <Box mt="100px">
      <Box
        mt="100px"
        mb="20px"
        borderBottom="1px solid #f3f3f3"
        pb="8px"
        display={{ base: "block", md: "none" }}
      >
        <IconButton
          aria-label="Go back"
          variant="unstyled"
          icon={<ChevronLeftIcon boxSize="40px" />}
          onClick={() => router.back()}
        />
      </Box>
      <Flex flexDirection="column" justify="center" alignItems="center">
        <Heading as="h5" fontSize="32px" mb="10px">
          {title}
        </Heading>
        <Image
          alt={title as string}
          src={img as string}
          w={{ base: "300px", md: "440px", lg: "600px" }}
        />
      </Flex>
    </Box>
  );
};

export default Frontpage;
