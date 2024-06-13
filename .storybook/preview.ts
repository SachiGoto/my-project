import type { Preview } from "@storybook/react";
import { ChakraProvider } from '@chakra-ui/react';
import {theme} from "../src/app/Theme"; 

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    chakra:{
      theme,
    }
  },
};

export default preview;
