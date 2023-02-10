import { Switch, Box, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      w="100px"
      pr="20px"
      display="inline-flex"
      alignItems="center"
      justifyContent="flex-end"
      gap="5px"
    >
      <Box
        as={FaSun}
        size="16px"
        color={colorMode === "light" ? "yellow.500" : "gray.300"}
      />
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        aria-label="Toggle dark mode"
        colorScheme="teal"
      />
      <Box
        as={FaMoon}
        size="16px"
        color={colorMode === "dark" ? "yellow.500" : "gray.300"}
      />
    </Box>
  );
};

export default DarkModeSwitch;
