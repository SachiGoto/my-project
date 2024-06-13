"use client";
import { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormErrorMessage,
  useToast,
  Box
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CustomLink } from "../../Component";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {LoginSchema, LoginSchemaType} from "./schema/loginSchema";
import {CustomLoadingButton} from "../../Component";

export default function Page() {
  const [password, setPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoggedin(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        setIsLoggedin(false);
        toast({
          status: "error",
          position: "top",
          title: "ログイン失敗",
          description: "メールアドレスかユーザー名が間違っています。"
        });
        return
      }

      const result = await response.json();
      const expiresAt = new Date(new Date().getTime() + result.expiresIn);
      Cookies.set("token", result.token, {
        expires: expiresAt,
        secure: true,
        sameSite: "Strict",
      });

      const token = Cookies.get("token");
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("failed fetch user data");
      }

      const userResult = await userResponse.json();
      Cookies.set("currentUserId", userResult.id, {
        expires: expiresAt,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("currentUser", userResult.fullName, {
        expires: expiresAt,
        secure: true,
        sameSite: "Strict",
      });
      
      // router.push("/");
    } catch (error) {
      toast({
        status: "error",
        position: "top",
        title: "ログイン失敗",
        description: "サーバーで問題が発生したためログインできませんでした。再試行してください。",
      });
    }finally{
      setIsLoading(false)
    }
  });

  const passwordClick = () => setPassword(!password);
  // console.log("loading state", isLoading)

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <VStack spacing="5">
        <Heading>ログイン</Heading>
        {isLoggedin? <div data-testid="loginState">Loggedin</div>:<div data-testid="loginState">Not Loggedin</div>}
        <form onSubmit={onSubmit}>
          <VStack alignItems="left">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email" textAlign="start">
                メールアドレス
              </FormLabel>
              <Input id="email" {...register("email")} />
              <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <InputGroup size="md">
                <Input
                aria-label="パスワード"
                  pr="4.5rem"
                  type={password ? "text" : "password"}
                  id="password"
                  {...register("password")}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={passwordClick}>
                    {password ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message as string}</FormErrorMessage>
            </FormControl>
            <CustomLoadingButton 
                    isLoading={isLoading}
                    loadingText="ログイン中"
                    colorScheme="brand.secondary"
                    text=" ログイン"
                    variant='solid'
                    type="submit"
                    mt="10%"
                    mx="0"
                    data-testid={"test"}
                    aria-label="ログイン"
            >
            </CustomLoadingButton>
          
          </VStack>
        </form>
        <CustomLink colorScheme="brand.black" variant="link" w="100%" href="/signup">新規登録はこちら</CustomLink>
      </VStack>
    </Flex>
  );
}
