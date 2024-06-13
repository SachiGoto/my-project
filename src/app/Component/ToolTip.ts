import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const colorfulVariant = defineStyle((props) => {
  const { colorScheme: c } = props; // add color scheme as a prop
  return {
      bg: `${c}.300`,  // background color for light mode
      borderColor: `${c}.600`,  // border color for light mode
      color: "black",  // text color for light mode
    
  }
});

const variants = {
  colorful: colorfulVariant,
};

const defaultProps = {
  size: 'md',
  variant: 'colorful' as 'colorful',  // Default to 'colorful'
};

export const tooltipTheme = defineStyleConfig({ defaultProps, variants });
