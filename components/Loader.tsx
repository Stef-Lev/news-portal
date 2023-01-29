import { Box, Spinner, Center } from "@chakra-ui/react";

function Loader() {
  return (
    <Center h="360px">
      <Spinner size="xl" color="blue.400"></Spinner>
    </Center>
  );
}

export default Loader;
