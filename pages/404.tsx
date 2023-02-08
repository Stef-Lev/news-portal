import { useRouter } from "next/router";
import { Button, Center, Heading, Image, VStack } from "@chakra-ui/react";

export default function FourOhFour() {
  const router = useRouter();
  return (
    <Center mt="90px" mb="20px" pb="8px">
      <VStack>
        <Heading mt="20px">Η σελίδα δεν βρέθηκε</Heading>
        <Image alt="error page" p="20px" src="404_image.jpg" />

        <Button bg="blue.400" onClick={() => router.push("/")}>
          Αρχική σελίδα
        </Button>
      </VStack>
    </Center>
  );
}
