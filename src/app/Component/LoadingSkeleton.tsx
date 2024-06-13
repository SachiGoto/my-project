import { Box,Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'



export function LoadingSkeleton (){
    return(
        <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
    )

}