import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: { "html,body": { background: "blue.900", color: "text.light" } },
  },
  colors: {
    text: {
      light: "#f3f3f3",
      medium: "#adadad",
      dark: "#141414",
    },
    blue: {
      100: "#dae0e0",
      200: "#1a202c",
      400: "#40738C",
      800: "#1f272a",
      900: "#091114",
    },
  },
});
