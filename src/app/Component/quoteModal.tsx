import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  useToast,
  Text,
  Icon,
  Flex,
  HStack,
  VStack,
  Box,
  Stack,
  Tooltip 
} from "@chakra-ui/react";
import { MdArrowForward   } from "react-icons/md"
import { useState} from "react";
import Cookies from 'js-cookie';
import { ImQuotesLeft } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import {FlagIcon} from "../Component";
import {CustomLoadingButton} from ".";
// import { Suspense } from "react";



type Quote = [
  {
    quote: string;
    author: string;
    quoteId:string;
    type?:string;
  }
];

export function QuoteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const token=Cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [selectedLanguage, setSelectLanguage] = useState<number>(0);

  const generateQuote = async () => {
  
    try{
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/translatedQuotes/getRandomQuotes`,{
          method:"GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    })

    const allQuotes = await result.json();
    setQuote(allQuotes)
    onOpen();
    } catch (error:any){
      toast({
        status: "error",
        position: "top",
        title: "名言取得失敗",
        description: "サーバーで問題が発生したため名言を取得できませんでした。再試行してください",
      });
      onClose();
    }finally {
          setIsLoading(false);
        };
  };

  function handleFlagClick(langCode:number){
      console.log(langCode);
      setSelectLanguage(langCode)
  }

  const saveQuote = async () => {
    if (quote) {
      try {
        const currentUserId = Cookies.get("currentUserId");
        const response = await fetch(
          `http://localhost:8080/api/favourites/addQuote/${currentUserId}/${quote[0].quoteId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          console.log("favourite response is " , response)
          toast({
            status: "success",
            position: "top",
            title: "お気に入りに名言が追加されました。"
          });
          onClose();
        } else {
          console.log("response", response)
             // 409 conflict error 同じ名言がすでに登録されている場合のエラー
          if(response.status == 409){
            toast({
              status: "error",
              position: "top",
              title: "失敗",
              description: "この名言はすでにお気に入りリストに登録済みです。",
            });
          }else{
            toast({
              status: "error",
              position: "top",
              title: "失敗",
              description: "ユーザーIDか名言IDが正しくないため、お気に入りに追加できませんでした。",
            });
          }
       
       
        }
      } catch (error) {
        toast({
          status: "error",
          position: "top",
          title: "失敗",
          description: "サーバーで問題が発生したため名言をお気に入りに追加できませんでした。再試行してください",
        });
      }
    }
  };

  function openModal() {
    generateQuote();
  }

  return (
    <Box>

      <CustomLoadingButton 
        isLoading={isLoading}
        loadingText="取得中"
        onClick={openModal}
        colorScheme="brand.secondary"
        text=" 名言をゲットしよう！"
        variant='solid'
        ></CustomLoadingButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}  >
        <ModalOverlay />
        <ModalContent maxW="70%" bg="white" >
          <ModalHeader my="2%">名言</ModalHeader>

          {quote && (
            <ModalBody my="2%">
              <Icon as={ImQuotesLeft} color="gray" my="3" />
              <Text as="h2" ml="5%" w="90%" fontSize="2xl">{quote[selectedLanguage].quote}</Text>
              <Icon as={ImQuotesLeft} color="gray" my="3" ml="95%" />
              <Text ml="5%" fontSize="sm" as="i">
                Author: {quote[selectedLanguage].author}
              </Text>
            </ModalBody>
          )}

          <ModalFooter my="2%">
            <VStack w="full">
            <Flex justify="center">
              <Stack direction='row' spacing={20}>
               
              <Flex ml={"5%"} justify="center" align="center">
              <Tooltip label='Add To Favourites' colorScheme="white" variant="colorful">
                <span>
                <Icon
                as={FaHeart}
                color="red"
                _hover={{ color: "#FF5733" }}
                onClick={saveQuote}
                width="1.5rem"
                height="1.5rem"
              />
                </span>
            
              </Tooltip>
              </Flex>
              <Button rightIcon={<MdArrowForward />} onClick={generateQuote} colorScheme={"brand.primary"} variant='solid'   isLoading={isLoading}
              loadingText="Generating"> Next </Button>
              </Stack>
            </Flex>
            <HStack justify="end" w="full" pr="2%" pb="2%">
              <FlagIcon countryCode="jp" onClick={()=>handleFlagClick(0)} isSelected={selectedLanguage == 0}></FlagIcon>
              <FlagIcon countryCode="kr" onClick={()=>handleFlagClick(2)} isSelected={selectedLanguage == 2}></FlagIcon>
              <FlagIcon countryCode="us" onClick={()=>handleFlagClick(1)} isSelected={selectedLanguage == 1}></FlagIcon>
            </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>

  );
}
