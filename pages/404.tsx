import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Button,
  Center,
  Heading,
  Image,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const FourOhFour: NextPage = () => {
  const router = useRouter();
  const background = useColorModeValue(
    "light.theme.primary",
    "dark.theme.primary"
  );

  return (
    <Center mt="90px" mb="20px" pb="8px">
      <VStack>
        <Heading mt="20px">Η σελίδα δεν βρέθηκε</Heading>
        <Image
          width={{ base: "100%", md: "500px", lg: "700px" }}
          alt="error page"
          p="20px"
          src="404_image.jpg"
        />

        <Button
          bg={background}
          color="dark.global.color"
          _hover={{ bg: background, color: "dark.global.color" }}
          _active={{ bg: background, color: "dark.global.color" }}
          onClick={() => router.push("/")}
        >
          Αρχική σελίδα
        </Button>
      </VStack>
    </Center>
  );
};

export default FourOhFour;
