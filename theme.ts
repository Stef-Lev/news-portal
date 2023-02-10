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
    text: { weak: "#f3f3f3", medium: "#777777", strong: "#141414" },
    panel: { bg: "#dcdcdc" },
    theme: { primary: "#40738C" },
    score: {
      bgOdd: "#95b5c4",
      bgEven: "#80a8ba",
      liveText: "",
      completeText: "",
      goalText: "#edb780",
    },
  },
  dark: {
    global: { color: "#f5f5f5", bg: "#191c1c" },
    text: { weak: "#f3f3f3", medium: "#777777", strong: "green" },
    panel: { bg: "#404040" },
    theme: { primary: "#40738C" },
    score: {
      bgOdd: "#95b5c4",
      bgEven: "#80a8ba",
      liveText: "",
      completeText: "",
      goalText: "#edb780",
    },
  },
};

export const theme = extendTheme({
  styles,
  colors,
});
