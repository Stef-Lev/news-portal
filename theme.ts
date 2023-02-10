import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode("#1c2021", "#f5f5f5")(props),
      bg: mode("#f5f5f5", "#191c1c")(props),
    },
  }),
};

const colors = {
  light: {
    global: { color: "#1c2021", bg: "#f5f5f5" },
    font: { base: "", sm: "", md: "", lg: "" },
    text: { weak: "#f3f3f3", medium: "#777777", strong: "#141414" },
    panel: { bg: "#d1d1d1" },
    theme: { primary: "#40738C" },
    score: {
      bgOdd: "#d1d1d1",
      bgEven: "#b1b1b1",
      liveText: "#45857f",
      completeText: "#1c2021",
      goalText: "#68674e",
    },
  },
  dark: {
    global: { color: "#f5f5f5", bg: "#191c1c" },
    font: { base: "", sm: "", md: "", lg: "" },
    text: { weak: "#f3f3f3", medium: "#b2b2b2", strong: "green" },
    panel: { bg: "#404040" },
    theme: { primary: "#5497b8" },
    score: {
      bgOdd: "#2c383d",
      bgEven: "#1f2a2e",
      liveText: "#8dfcf5",
      completeText: "#f5f5f5",
      goalText: "#fae8b6",
    },
  },
};

export const theme = extendTheme({
  styles,
  colors,
});
