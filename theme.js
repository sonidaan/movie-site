import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const styles = {
  global: (props) => ({
    body: {
      bgGradient: mode(
        'linear(to-r,green.600, purple.700, )',
        'linear(to-r, yellow.400, red.700,)'
      )(props),

    },
  }),
}

const theme = extendTheme({
  config,
  styles,
});

export default theme;