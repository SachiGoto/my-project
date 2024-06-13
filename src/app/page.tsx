"use client";
import {useEffect, useState} from "react";
import { QuoteModal, CustomLink, CustomButton } from "./Component";
import { Flex, Heading, VStack, Text, AbsoluteCenter, Box, Spacer, Stack } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";





export default function Home() {
 const router = useRouter();
 const [currentUser, setCurrentUser] = useState<string | undefined>("");

  useEffect(()=>{
    const user = Cookies.get("currentUser");
    setCurrentUser(user);
  },[currentUser])


  function handleLogout(){
    Cookies.remove('currentUserId');
    Cookies.remove("currentUser");
    Cookies.remove("token");
    Cookies.remove("token_expires");
    router.push("/login");

  }


  return (
    <Box minH="100vh">
    <Flex px="5%" pt="5%"><Text>ようこそ {currentUser} さん</Text>  <Spacer /><CustomButton colorScheme="brand.black" _hover={{bg:"brand.white.100", color:"brand.black"}} onClick={handleLogout} text="ログアウト" /></Flex>
    <AbsoluteCenter w="80%">
      <VStack>
        <Heading textAlign="center" size="3xl">Daily Positive Quotes Generator</Heading>
        <Text textAlign="center" mt="6">
        ポジティブな名言集で、毎日を素晴らしい気分で始めましょう！<br /> 心が明るくなる言葉の力を感じながら、<br />今日という一日を最高に過ごしましょう！
        </Text>
        <Stack align="center" direction='row' spacing={4} mt="5%">
          <QuoteModal />
          <CustomLink width="192px" href="/favourites" colorScheme="brand.primary">お気に入りリスト</CustomLink>
        </Stack>
      </VStack>
    </AbsoluteCenter>
    </Box>
 
  );
}
