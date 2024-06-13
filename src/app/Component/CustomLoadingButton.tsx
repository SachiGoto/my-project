import { Button as ChakuraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'

type ButtonProps = ChakraButtonProps & {
    onClick?: () => void;
    text:string;
    colorScheme?:string;
    isLoading:boolean;
    loadingText:string;
    variant?:"solid" | "outline";
    type?:"button"|"submit";
  }

export function CustomLoadingButton({onClick, text, colorScheme="brand.primary", variant="solid", type="button", isLoading, ...props}:ButtonProps){
    return(
        <ChakuraButton variant={variant} colorScheme={colorScheme} size='md' onClick={onClick} type={type} isLoading={isLoading} {...props}>{text} 
      </ChakuraButton>
    );
       
    
}