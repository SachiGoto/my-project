import { Button as ChakuraButton,ButtonProps as ChakraButtonProps  } from '@chakra-ui/react'

type ButtonProps = ChakraButtonProps & {
    onClick?: () => void;
    text:string;
    colorScheme?:string;
    isMarked?:boolean;
    variant?:"solid"|"outline";
    size?:string;
  }

export function CustomButton({onClick, text, colorScheme="brand.primary", variant="outline",isMarked, size="md", ...props }:ButtonProps){
    return(
        <ChakuraButton  variant={isMarked?"solid":"outline"} colorScheme={colorScheme} size={size} onClick={onClick}  {...props}
         >{text} 
      </ChakuraButton>
    );
       
    
}