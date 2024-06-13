import React from "react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Button as ChakuraButton, ButtonProps as ChakraButtonProps  } from "@chakra-ui/react";

type linkProps = ChakraButtonProps & {
  children: React.ReactNode;
  href: string;
  colorScheme?:string;
  isSelected?:boolean;
  variant?:"solid"|"outline"|"link"
};

export function CustomLink({ children, href, colorScheme="brand.primary", isSelected, variant="solid", ...props }: linkProps) {
  return (
    <ChakuraButton variant={variant} colorScheme={colorScheme} {...props}>
      <ChakraLink as={Link} href={href} _hover={{ textDecoration: "none" }} >
        {children}
      </ChakraLink>
    </ChakuraButton>
  );
}
