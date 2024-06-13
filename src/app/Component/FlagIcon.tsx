import { CircleFlag } from 'react-circle-flags';
import {Box, Tooltip } from "@chakra-ui/react";

type FlagProps = {
    countryCode: string;
    height?: number;
    width?: number;
    onClick?: () => void;
    isSelected?:boolean;

  }

export function FlagIcon({ countryCode, onClick, isSelected}: FlagProps){
    return(
        <Box
        as="div"
        display="block"
        onClick={onClick}
        borderRadius = { isSelected ? '50%': '0%' }
        border = {isSelected ? '2px solid rgba(20, 19, 21 , 0.8)' : ''}
      >
        <Tooltip label={countryCode} colorScheme="white" variant="colorful">
          <span>
          <CircleFlag countryCode={countryCode} height="15" width="15" />
          </span>
        </Tooltip>
      </Box>
    );
       
    
}