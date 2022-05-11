import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import carouselData from "../../utils/carouselData";
import { CarouselItem } from "./CarouselItem";

export const Carousel: React.FC<{}> = ({}) => {
  const [currentItem, setCurrentItem] = useState(0);

  const prevSlide = () => {
    setCurrentItem((prevState) => {
      return prevState === 0 ? carouselData.length - 1 : prevState - 1;
    });
  };

  const nextSlide = () => {
    setCurrentItem((prevState) => {
      return prevState === carouselData.length - 1 ? 0 : prevState + 1;
    });
  };
  return (
    <Flex maxW={800} m="auto" justifyContent="space-between" h={500}>
      <Flex align="center">
        <IconButton
          borderRadius="full"
          aria-label="left"
          icon={<ChevronLeftIcon />}
          onClick={prevSlide}
          size="sm"
        ></IconButton>
      </Flex>
      {carouselData.map((item, index) => (
        <Flex
          align="center"
          key={index}
          opacity={index === currentItem ? "1" : "0"}
        >
          {index === currentItem && <CarouselItem item={item}></CarouselItem>}
        </Flex>
      ))}
      <Flex align="center">
        <IconButton
          borderRadius="full"
          aria-label="right"
          icon={<ChevronRightIcon />}
          size="sm"
          onClick={nextSlide}
        ></IconButton>
      </Flex>
    </Flex>
  );
};
