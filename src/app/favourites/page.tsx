"use client";
import { Container, Text, Box, useToast, Flex, HStack,Stack,Divider,Icon, AbsoluteCenter,VStack } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useState, useEffect, useRef } from "react";
import { CustomButton, CustomLink, FlagIcon, LoadingSkeleton } from "../Component";
import { ImQuotesLeft } from "react-icons/im";
import { FaRegTrashCan } from "react-icons/fa6";
import React from "react";
import Slider from "react-slick";


type Quote = {
  id: number;
  quote: string;
  author: string;
  language: number;
  quoteId: number;
};

export default function Favourites() {
  const toast = useToast();
  const token = Cookies.get("token");
  const userId = Cookies.get("currentUserId");
  const [favQuotes, setFavQuotes] = useState<Quote[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<{ [key: number]: number } | null>(null);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedQuotes, setExpandedQuotes] = useState<Set<number>>(new Set());
  const [overflowQuotes, setOverflowQuotes] = useState<Set<number>>(new Set());

  function handleFlagClick(langCode: number, id: number) {
    setSelectedLanguage((prev) => ({
      ...prev,
      [id]: langCode,
    }));

    const updatedQuotes = filteredQuotes?.map((quote) => {
      if (quote.quoteId === id) {
        const updatedQuote = favQuotes.find(
          (favQuote) => favQuote.quoteId === id && favQuote.language === langCode
        );
        return updatedQuote ? { ...quote, ...updatedQuote } : quote;
      }
      return quote;
    });

    setFilteredQuotes(updatedQuotes ? updatedQuotes : null);
  }

  async function getFavouriteQuotes() {
    const token = Cookies.get("token");
    const userId = Cookies.get("currentUserId");
    try {
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favourites/getQuotes/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      setFavQuotes(data);
      const filteredQuotes = data?.filter((quote: Quote) => quote.language == 1);
      setFilteredQuotes(filteredQuotes);

      const initialLanguages: { [key: number]: number } = {};
      filteredQuotes.forEach((quote: Quote) => {
        initialLanguages[quote.quoteId] = 1;
      });
      setSelectedLanguage(initialLanguages);
      return data;

    } catch (error) {
      toast({
        status: "error",
        position: "top",
        title: "お気に入りリストの失敗",
        description: "サーバーで問題が発生したため名言を取得できませんでした。再試行してください。"
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFavouriteQuotes();
  }, []);

  async function deleteQuote(quotesId: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favourites/deleteFavourite/${userId}/${quotesId}`,
      {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (res.ok) {
      toast({
        position: "top",
        title: "名言が削除されました。",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
      getFavouriteQuotes();

    } else {
      toast({
        position: "top",
        title: "削除失敗",
        description: "サーバーで問題が発生したため名言を削除できませんでした。再試行してください。",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleQuoteExpansion(quoteId: number) {
    setExpandedQuotes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(quoteId)) {
        newSet.delete(quoteId);
      } else {
        newSet.add(quoteId);
      }
      return newSet;
    });
  }

  useEffect(() => {
    if (filteredQuotes && filteredQuotes.length > 1) {
      setSettings({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
    } else {
      setSettings({
        dots: false, // No need for dots if there's only one slide
        infinite: false, // Prevent looping when there's only one slide
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
    }

    const checkOverflow = () => {
      const newSet = new Set<number>();
      filteredQuotes?.forEach((quote, index) => {
        const element = document.getElementById(`quote-${quote.quoteId}`);
        if (element && element.scrollHeight > element.clientHeight) {
          newSet.add(quote.quoteId);
        }
      });
      setOverflowQuotes(newSet);
    };
    checkOverflow();
  }, [filteredQuotes]);

// Define settings within the component function to make it reactive
const [settings, setSettings] = useState({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
});



  const [displayList, setDisplayList] = useState(false);
  function toggleDisplay(text:string){
       if(text == "slide"){
        setDisplayList(false)
      }else{
        setDisplayList(true)
      } 
  }

  return (
  <>

    <Flex justify="end" mr="5%" mt="5%">
    <CustomLink size="md" variant="outline" href="/" colorScheme="brand.black" _hover={{bg:"brand.white.200", color:"brand.black"}}>ホーム</CustomLink>
    </Flex>
    <Container>
      <Flex justifyContent="space-around" align="center" mb="5">
        <Text mt="5%" mb="5%"  fontSize="lg" as="b">
          お気に入り名言リスト
        </Text>
      </HStack>
      <Flex justifyContent="space-around" align="center" mb="5">
    
      </Flex>
      <Flex justifyContent="space-around" mt="5%"  >
      <Stack direction="row" align="center"  spacing='20px'>
              <CustomButton colorScheme="brand.secondary" isMarked={!displayList} onClick={()=>toggleDisplay("slide")} size="sm" text="スライド"></CustomButton>
              <CustomButton colorScheme="brand.secondary" isMarked={displayList} onClick={()=>toggleDisplay("list")} size="sm" text="リスト"></CustomButton>
              </Stack>
     
      </Flex>
      {filteredQuotes?.length == 0 && <AbsoluteCenter>お気に入りリストに名言はありません。</AbsoluteCenter> }
      {filteredQuotes?.length !== 0 && 
        displayList? <Box mt="5%">
        {isLoading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          <>
            {filteredQuotes?.map((quote, index) => {
              return (
                <Box
                  key={index}
                  p={10}
                  shadow="md"
                  borderWidth="1px"
                  mb={4}
                  borderRadius='md'
                  bg="white"
                >
                  <Box minH="100px">
                  <Icon as={ImQuotesLeft} color="gray" my="3" />
                  <Text
                    id={`quote-${quote.quoteId}`}
                    fontSize="xl"
                    overflow="hidden"
                  >
                    {quote.quote}
                  </Text>
                  <Icon as={ImQuotesLeft} color="gray" my="3" ml="90%" />
                   </Box>
                  <Text fontWeight="bold">- {quote.author}</Text>
                  <Box ml="90%">
                    <FaRegTrashCan onClick={() => deleteQuote(quote.quoteId)} />
                  </Box>
                  <HStack>
                    <FlagIcon countryCode="jp" onClick={() => handleFlagClick(1, quote.quoteId)} isSelected={selectedLanguage == null || selectedLanguage[quote.quoteId] === 1}></FlagIcon>
                    <FlagIcon countryCode="kr" onClick={() => handleFlagClick(3, quote.quoteId)} isSelected={selectedLanguage != null && selectedLanguage[quote.quoteId] === 3}></FlagIcon>
                    <FlagIcon countryCode="us" onClick={() => handleFlagClick(2, quote.quoteId)} isSelected={selectedLanguage != null && selectedLanguage[quote.quoteId] === 2}></FlagIcon>
                  </HStack>
                </Box>
              );
            })}
          </>
        )}
      </Box>:
       <Box mt="5%">
       {isLoading ? (
         <>
           <LoadingSkeleton />
         </>
       ) : (
        filteredQuotes && filteredQuotes.length > 0 &&(
         <Slider {...settings}>
           {filteredQuotes?.map((quote, index) => {
             const isExpanded = expandedQuotes.has(quote.quoteId);
             return (
               <Box
                 key={index}
                 p={10}
                 pt={isExpanded?"15%":"5%"}
                 shadow="md"
                 borderWidth="1px"
                 borderRadius='md'
                 bg="white"
               >
                 <Flex h="150px" justify="center" align="start" direction="column">
                 <Icon mb="2%" as={ImQuotesLeft} color="gray" my="3" />
                 <Text
                   ml="2%"
                   w="90%"
                   id={`quote-${quote.quoteId}`}
                   fontSize="xl"
                   noOfLines={isExpanded ? undefined : 1}
                   overflow={isExpanded? "visible":"hidden"}
                 >
                   {quote.quote}
                 </Text>
                 <Icon as={ImQuotesLeft} color="gray" my="3"  ml="90%"  />
                 {overflowQuotes.has(quote.quoteId) && (
                   <CustomButton size="sm"  py="2%"  onClick={() => toggleQuoteExpansion(quote.quoteId)} text={isExpanded ? "Read Less" : "Read More"}>
                   </CustomButton>
                 )}
                  </Flex>
                 <Text fontWeight="bold" pt={isExpanded? "15%": "5%"}>- {quote.author}</Text>
                 <Box ml="90%">
                   <FaRegTrashCan onClick={() => deleteQuote(quote.quoteId)} />
                 </Box>
                 <HStack>
                   <FlagIcon countryCode="jp" onClick={() => handleFlagClick(1, quote.quoteId)} isSelected={selectedLanguage == null || selectedLanguage[quote.quoteId] === 1}></FlagIcon>
                   <FlagIcon countryCode="kr" onClick={() => handleFlagClick(3, quote.quoteId)} isSelected={selectedLanguage != null && selectedLanguage[quote.quoteId] === 3}></FlagIcon>
                   <FlagIcon countryCode="us" onClick={() => handleFlagClick(2, quote.quoteId)} isSelected={selectedLanguage != null && selectedLanguage[quote.quoteId] === 2}></FlagIcon>
                 </HStack>
               </Box>
             );
           })}
         </Slider>
        )
       )}
     </Box>
    }
    </Container>
    </>
  );
}
