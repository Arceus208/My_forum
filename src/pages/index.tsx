import { Box, Flex, Text, Image, Heading, Button } from "@chakra-ui/react";
import { NavBar } from "../components/navbar/NavBar";
import React from "react";
import { Carousel } from "../components/carousel/Carousel";
import NextLink from "next/link";

const Index = () => {
  return (
    <Box>
      <NavBar></NavBar>
      <Box
        w="100vw"
        h={["30vh", "30vh", "40vh", "50vh"]}
        bgColor={"black"}
        bgImage={"url('/p7.jpg')"}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        position="relative"
        zIndex={1}
      >
        <Flex
          position="absolute"
          top={0}
          left={0}
          bgColor={"black"}
          opacity={0.7}
          zIndex={2}
          w="100%"
          h="100%"
          align="center"
          justify="center"
        >
          <Flex
            mx={[5, 5, 10, 10]}
            flexDirection="column"
            justify="center"
            align="center"
          >
            <Text color="white" fontSize={[20, 30, 40, 50]} my={10}>
              "The place where you have fun and feel like home"
            </Text>
            <NextLink href="/posts">
              <Button borderRadius={0} colorScheme="blue" size="lg">
                See our forum
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
      <Box
        mx={[0, 0, 0, 40]}
        bgColor="white"
        /* maxW={["100vw", "100vw", "100vw", "1000px"]} */
      >
        <Flex flexDirection={["column", "column", "column", "row"]} mx="auto">
          <Box
            w={["100vw", "100vw", "100vw", "50vw"]}
            p={["10px", "20px", "20px", "30px"]}
            /* bgColor="lightcyan" */
            my={5}
          >
            <Text>
              <Heading fontSize={30} mb={5} fontStyle="italic">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </Heading>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not
            </Text>
            <Text mt={50}>
              <Heading fontSize={30} mb={5} fontStyle="italic">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </Heading>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not
            </Text>
          </Box>
          <Flex
            w={["100vw", "100vw", "100vw", "50vw"]}
            mt={10}
            top={0}
            h={[400, 400, 400, 500]}
            justify="center"
            /* bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="center" */
          >
            <Box position="relative" h="400px" w="400px">
              <Image
                objectFit="cover"
                top="10%"
                left={["15%", "5%"]}
                position="absolute"
                h={["100px", "150px"]}
                src="/p1.jpg"
              ></Image>
              <Image
                objectFit="cover"
                top={["50%", "60%"]}
                left={["20%", "5%"]}
                position="absolute"
                h={["90px", "130px"]}
                src="/p2.jpg"
                zIndex={10}
              ></Image>
              <Image
                objectFit="cover"
                top="20%"
                left="50%"
                position="absolute"
                h={["170px", "250px"]}
                src="/p3.jpg"
              ></Image>
            </Box>
          </Flex>
        </Flex>
        <Box
          bgImage={"url('/p5.jpg')"}
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
        >
          <Carousel></Carousel>
        </Box>
        <Box bgColor={"black"} h={300} textAlign="center">
          <Text
            fontSize={[30, 50]}
            textColor={"white"}
            fontWeight={500}
            pt={20}
          >
            Join us today for more fun !
          </Text>
          <Button colorScheme={"blue"} mt={10} size="lg" borderRadius={30}>
            <NextLink href="/register">Create free account</NextLink>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
