
import { Box, Spinner, Text, VStack } from "@chakra-ui/react"
export default function LoadingScreen() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backdropFilter="blur(15px)"
      backdropContrast="30%"
      backgroundColor="rgba(0, 0, 0, 0.4)"
      zIndex="1000"
    >
    <VStack>
    <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text>Loading...</Text>
    </VStack>
      
    </Box>
  );
}
        