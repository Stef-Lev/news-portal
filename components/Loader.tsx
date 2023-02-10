import { Spinner, Center, useColorModeValue } from "@chakra-ui/react";

function Loader() {
  const background = useColorModeValue(
    "light.theme.primary",
    "dark.theme.primary"
  );
  return (
    <Center h="360px">
      <Spinner size="xl" color={background}></Spinner>
    </Center>
  );
}

export default Loader;
