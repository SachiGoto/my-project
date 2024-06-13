"use client"

import { useState } from "react";
import {  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import {CustomLink} from '../../Component';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter  } from 'next/navigation';
import {SignupSchema, SignupSchemaType} from "./schema/signupSchema";
import {CustomLoadingButton} from "../../Component"

export default function Page(){
  const router = useRouter()
  const [password, setPassword] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const passwordClick = () => setPassword(!password)
  const confirmClick = () => setConfirm(!confirm)
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(SignupSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    try{
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email:data.email,
            password:data.password,
            fullName:data.fullName
          }),
        }
      );
  
      if(response.ok){
        router.push('/login')
      }else{
        toast({
          status: "error",
          position: "top",
          title: "サインアップ失敗",
          description: "すでに同じメースアドレスが存在します。違うメールアドレスで登録してください。",
        });
      }

    }catch(error){
      console.log('what type of errror was returned? ', error)
      toast({
        status: "error",
        position: "top",
        title: "サインアップ失敗",
        description: "サーバーで問題が発生したためログインできませんでした。再試行してください。",
      });
    }finally{
      setIsLoading(false);
    }
  })

    return (
   <Flex height='100vh' justifyContent='center' alignItems='center'>
      <VStack spacing='5'>
        <Heading>新規登録</Heading>
        <form onSubmit={onSubmit}>
          <VStack alignItems='left'>
          <FormControl isInvalid={!!errors.fullName} >
              <FormLabel htmlFor='fullName' textAlign='start'>
                ユーザーネーム
              </FormLabel>
              <Input id='fullName' {...register('fullName')} />
               <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor='email' textAlign='start'>
                メールアドレス
              </FormLabel>
              <Input id='email' {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor='password'>パスワード</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={password ? 'text' : 'password'}
                  {...register('password')}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={passwordClick}>
                    {password ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirm} >
              <FormLabel htmlFor='confirm'>パスワード確認</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={confirm ? 'text' : 'password'}
                  {...register('confirm')}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={confirmClick}>
                    {confirm ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.confirm?.message}</FormErrorMessage>
            </FormControl>
            <CustomLoadingButton 
                isLoading={isLoading}
                loadingText="登録中"
                colorScheme="brand.primary"
                text="新規登録"
                variant='solid'
                paddingX='auto'
                type='submit'
                mt="5%"
            ></CustomLoadingButton>
          </VStack>
        </form>
        <CustomLink variant="link" colorScheme="brand.black" w="100%" href="/login">ログインはこちらから</CustomLink>
      </VStack>
   </Flex>
    )
       
}