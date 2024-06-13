import { extendTheme } from "@chakra-ui/react";
import { tooltipTheme } from "./Component/ToolTip";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const colors = {
  primary: {
    50: '#E6F0FA',
    100: '#BFDBF7',
    200: '#99C6F4',
    300: '#72B0F1',
    400: '#4C9BEE',
    500: '#2C6FB4',  // Original primary color
    600: '#236BA1',
    700: '#1B508D',
    800: '#13357A',
    900: '#0A1A66',
  },
  secondary: {
    50: '#FDE5F2',
    100: '#FBC6E4',
    200: '#F8A6D6',
    300: '#F587C8',
    400: '#F267BA',
    500: '#D53F8C',  // Original secondary color
    600: '#C0367D',
    700: '#AB2D6E',
    800: '#96245F',
    900: '#811B50',
  },white: {
    50: '#FFFFFF', // Pure white
    100: '#F7FAFC', // Chakra UI's default lightest gray
    200: '#EDF2F7',
    300: '#E2E8F0',
    400: '#CBD5E0',
    500: '#A0AEC0', // Mid gray
    600: '#718096',
    700: '#4A5568',
    800: '#2D3748',
    900: '#1A202C' // Very dark gray (almost black)
  },black: {
    50: '#747474', // Light gray
    100: '#666666',
    200: '#585858',
    300: '#4A4A4A',
    400: '#3C3C3C',
    500: '#2E2E2E', // Mid-dark gray
    600: '#454545', // Your original black color
    700: '#1F1F1F',
    800: '#141414',
    900: '#000000' // True black
  }

};

export const theme = extendTheme({
  colors: {
    brand: {
      primary: colors.primary,
      secondary: colors.secondary,
      white: colors.white,
      black: colors.black,
    }
  },
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "#454545",
        background: `radial-gradient(circle at center, deepskyblue, rgb(206, 130, 239), rgb(59, 59, 199))`,
        backgroundSize: "180% 180%",
        animation: "gradientAnimation 35s ease infinite",
        minHeight: "100vh",
        width: "100%",
        "@keyframes gradientAnimation": {
          "0%, 100%": { backgroundPosition: "82% 0%" },
          "50%": { backgroundPosition: "0% 100%" },
        },
      },
    },
  },
  components: {
    Tooltip: tooltipTheme,  // Make sure this is correctly integrated
  },

});
