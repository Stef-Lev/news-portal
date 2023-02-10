import { Spinner, Center } from "@chakra-ui/react";

function Loader() {
  return (
    <Center h="360px">
      <Spinner size="xl" color="light.theme.primary"></Spinner>
    </Center>
  );
}

export default Loader;
